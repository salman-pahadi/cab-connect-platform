"""
Ride service for handling ride business logic.
"""

import random
import string
from datetime import datetime

from sqlalchemy.orm import Session

from app.models.location import Location, LocationType
from app.models.payment import Payment, TransactionStatus
from app.models.rating import Rating
from app.models.ride import PaymentMethod, Ride, RideStatus, RideType
from app.schemas.ride import (
    RideCompleted,
    RideEstimate,
    RideRequest,
)


class RideService:
    """Service for handling ride operations."""

    # Pricing constants
    BASE_FARE = 50.0  # Base fare in INR
    PER_KM_RATE = 15.0  # Per kilometer rate
    PER_MINUTE_RATE = 2.0  # Per minute rate

    # Ride type multipliers
    RIDE_TYPE_MULTIPLIERS = {
        RideType.ECONOMY: 1.0,
        RideType.COMFORT: 1.3,
        RideType.PREMIUM: 1.8,
    }

    @staticmethod
    def _generate_ride_number() -> str:
        """Generate unique ride number."""
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        random_suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=4))
        return f"RID{timestamp}{random_suffix}"

    @staticmethod
    def _generate_otp() -> str:
        """Generate 6-digit OTP."""
        return "".join(random.choices(string.digits, k=6))

    @staticmethod
    def _haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate distance between two points using Haversine formula (in km)."""
        from math import atan2, cos, radians, sin, sqrt

        R = 6371  # Earth's radius in kilometers

        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c

        return distance

    @staticmethod
    def _calculate_fare(
        distance_km: float, duration_minutes: int, ride_type: RideType, surge_multiplier: float = 1.0
    ) -> dict:
        """Calculate fare breakdown."""
        base_fare = RideService.BASE_FARE
        distance_charge = distance_km * RideService.PER_KM_RATE
        time_charge = duration_minutes * RideService.PER_MINUTE_RATE

        # Apply ride type multiplier
        multiplier = RideService.RIDE_TYPE_MULTIPLIERS.get(ride_type, 1.0)

        # Apply surge multiplier
        total_before_surge = (base_fare + distance_charge + time_charge) * multiplier
        total_with_surge = total_before_surge * surge_multiplier

        # Calculate tax (GST at 5%)
        tax = total_with_surge * 0.05

        return {
            "base_fare": base_fare,
            "distance_charge": distance_charge * multiplier,
            "time_charge": time_charge * multiplier,
            "subtotal": total_before_surge,
            "surge_multiplier": surge_multiplier,
            "total_with_surge": total_with_surge,
            "tax": tax,
            "total": total_with_surge + tax,
        }

    def create_ride(self, db: Session, passenger_id: int, ride_data: RideRequest) -> Ride:
        """Create a new ride request."""
        # Calculate estimated distance and duration
        distance_km = self._haversine_distance(
            ride_data.pickup_latitude,
            ride_data.pickup_longitude,
            ride_data.dropoff_latitude,
            ride_data.dropoff_longitude,
        )

        # Estimate duration (assume average speed of 30 km/h)
        estimated_duration_minutes = int((distance_km / 30) * 60)

        # Calculate fare
        fare_breakdown = self._calculate_fare(distance_km, estimated_duration_minutes, ride_data.ride_type)

        # Create ride
        ride = Ride(
            ride_number=self._generate_ride_number(),
            passenger_id=passenger_id,
            ride_type=ride_data.ride_type,
            status=RideStatus.PENDING,
            payment_method=ride_data.payment_method,
            pickup_latitude=ride_data.pickup_latitude,
            pickup_longitude=ride_data.pickup_longitude,
            pickup_address=ride_data.pickup_address,
            dropoff_latitude=ride_data.dropoff_latitude,
            dropoff_longitude=ride_data.dropoff_longitude,
            dropoff_address=ride_data.dropoff_address,
            estimated_distance_km=distance_km,
            estimated_duration_minutes=estimated_duration_minutes,
            estimated_fare=fare_breakdown["total"],
            notes=ride_data.notes,
            special_requests=ride_data.special_requests,
            is_ride_shared=ride_data.is_ride_shared,
        )

        db.add(ride)
        db.flush()

        # Create location records for pickup and dropoff
        pickup_location = Location(
            ride_id=ride.id,
            location_type=LocationType.PICKUP,
            latitude=ride_data.pickup_latitude,
            longitude=ride_data.pickup_longitude,
            address=ride_data.pickup_address,
            sequence_order=0,
        )

        dropoff_location = Location(
            ride_id=ride.id,
            location_type=LocationType.DROPOFF,
            latitude=ride_data.dropoff_latitude,
            longitude=ride_data.dropoff_longitude,
            address=ride_data.dropoff_address,
            sequence_order=1,
        )

        db.add(pickup_location)
        db.add(dropoff_location)
        db.commit()
        db.refresh(ride)

        return ride

    def accept_ride(self, db: Session, ride_id: int, driver_id: int) -> Ride:
        """Driver accepts a ride."""
        ride = db.query(Ride).filter(Ride.id == ride_id).first()
        if not ride:
            raise ValueError("Ride not found")

        if ride.status != RideStatus.PENDING:
            raise ValueError("Ride is not available for acceptance")

        ride.driver_id = driver_id
        ride.status = RideStatus.ACCEPTED
        ride.accepted_at = datetime.utcnow()
        ride.otp_code = self._generate_otp()

        db.commit()
        db.refresh(ride)

        return ride

    def start_ride(self, db: Session, ride_id: int, otp_code: str) -> Ride:
        """Mark ride as started (driver arrived and passenger confirmed OTP)."""
        ride = db.query(Ride).filter(Ride.id == ride_id).first()
        if not ride:
            raise ValueError("Ride not found")

        if ride.status != RideStatus.ACCEPTED:
            raise ValueError("Ride is not accepted yet")

        if ride.otp_code != otp_code:
            raise ValueError("Invalid OTP code")

        ride.status = RideStatus.IN_PROGRESS
        ride.pickup_time = datetime.utcnow()

        db.commit()
        db.refresh(ride)

        return ride

    def complete_ride(
        self, db: Session, ride_id: int, completion_data: RideCompleted
    ) -> Ride:
        """Mark ride as completed and calculate final fare."""
        ride = db.query(Ride).filter(Ride.id == ride_id).first()
        if not ride:
            raise ValueError("Ride not found")

        if ride.status != RideStatus.IN_PROGRESS:
            raise ValueError("Ride is not in progress")

        # Update ride with actual values
        ride.actual_distance_km = completion_data.actual_distance_km
        ride.actual_duration_minutes = completion_data.actual_duration_minutes
        ride.actual_fare = completion_data.actual_fare
        ride.final_fare = completion_data.actual_fare

        ride.status = RideStatus.COMPLETED
        ride.completed_at = datetime.utcnow()

        # Create payment record
        payment = Payment(
            transaction_id=f"PAY{ride.ride_number}",
            ride_id=ride.id,
            passenger_id=ride.passenger_id,
            driver_id=ride.driver_id,
            amount=completion_data.actual_fare,
            payment_method=ride.payment_method.value,
            base_fare=50.0,
            distance_charge=completion_data.actual_distance_km * self.PER_KM_RATE,
            time_charge=completion_data.actual_duration_minutes * self.PER_MINUTE_RATE,
            status=TransactionStatus.SUCCESS if ride.payment_method == PaymentMethod.CASH else TransactionStatus.PENDING,
        )

        if ride.payment_method == PaymentMethod.CASH:
            payment.paid_at = datetime.utcnow()

        db.add(payment)
        db.commit()
        db.refresh(ride)

        return ride

    def cancel_ride(
        self, db: Session, ride_id: int, cancelled_by: str, reason: str | None = None
    ) -> Ride:
        """Cancel a ride."""
        ride = db.query(Ride).filter(Ride.id == ride_id).first()
        if not ride:
            raise ValueError("Ride not found")

        if ride.status in [RideStatus.COMPLETED, RideStatus.CANCELLED]:
            raise ValueError(f"Cannot cancel ride with status {ride.status}")

        ride.status = RideStatus.CANCELLED
        ride.cancelled_at = datetime.utcnow()
        ride.cancelled_by = cancelled_by
        ride.cancellation_reason = reason

        db.commit()
        db.refresh(ride)

        return ride

    def get_ride(self, db: Session, ride_id: int) -> Ride | None:
        """Get ride by ID."""
        return db.query(Ride).filter(Ride.id == ride_id).first()

    def get_rides_by_passenger(
        self, db: Session, passenger_id: int, skip: int = 0, limit: int = 20
    ) -> list[Ride]:
        """Get all rides for a passenger."""
        return (
            db.query(Ride)
            .filter(Ride.passenger_id == passenger_id)
            .order_by(Ride.requested_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_rides_by_driver(
        self, db: Session, driver_id: int, skip: int = 0, limit: int = 20
    ) -> list[Ride]:
        """Get all rides for a driver."""
        return (
            db.query(Ride)
            .filter(Ride.driver_id == driver_id)
            .order_by(Ride.requested_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def estimate_fare(self, db: Session, estimate_data: RideEstimate) -> dict:
        """Estimate fare for a ride."""
        distance_km = self._haversine_distance(
            estimate_data.pickup_latitude,
            estimate_data.pickup_longitude,
            estimate_data.dropoff_latitude,
            estimate_data.dropoff_longitude,
        )

        estimated_duration_minutes = int((distance_km / 30) * 60)

        fare_breakdown = self._calculate_fare(
            distance_km, estimated_duration_minutes, estimate_data.ride_type
        )

        return {
            "estimated_distance_km": round(distance_km, 2),
            "estimated_duration_minutes": estimated_duration_minutes,
            "base_fare": fare_breakdown["base_fare"],
            "distance_charge": round(fare_breakdown["distance_charge"], 2),
            "time_charge": round(fare_breakdown["time_charge"], 2),
            "surge_multiplier": fare_breakdown["surge_multiplier"],
            "estimated_total": round(fare_breakdown["total"], 2),
        }

    def add_rating(self, db: Session, ride_id: int, rater_id: int, rating_data: dict) -> Rating:
        """Add rating for a completed ride."""
        ride = db.query(Ride).filter(Ride.id == ride_id).first()
        if not ride:
            raise ValueError("Ride not found")

        if ride.status != RideStatus.COMPLETED:
            raise ValueError("Can only rate completed rides")

        # Determine ratee
        if rater_id == ride.passenger_id:
            ratee_type = "driver"
            ratee_id = ride.driver_id
        elif rater_id == ride.driver_id:
            ratee_type = "passenger"
            ratee_id = ride.passenger_id
        else:
            raise ValueError("Rater not associated with this ride")

        rating = Rating(
            ride_id=ride.id,
            rater_id=rater_id,
            ratee_type=ratee_type,
            ratee_id=ratee_id,
            overall_rating=rating_data.get("overall_rating"),
            cleanliness_rating=rating_data.get("cleanliness_rating"),
            communication_rating=rating_data.get("communication_rating"),
            driving_rating=rating_data.get("driving_rating"),
            behavior_rating=rating_data.get("behavior_rating"),
            review_text=rating_data.get("review_text"),
            tags=rating_data.get("tags"),
        )

        db.add(rating)
        db.commit()
        db.refresh(rating)

        return rating

    def get_pending_rides(self, db: Session, limit: int = 50) -> list[Ride]:
        """Get pending rides for driver assignment."""
        return (
            db.query(Ride)
            .filter(Ride.status == RideStatus.PENDING)
            .order_by(Ride.requested_at.desc())
            .limit(limit)
            .all()
        )
