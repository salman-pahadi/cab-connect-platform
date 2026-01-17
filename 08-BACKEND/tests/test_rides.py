"""
Tests for ride endpoints and services.
"""

from datetime import datetime

import pytest
from fastapi import status
from sqlalchemy.orm import Session

from app.models.driver import Driver, DriverAvailability, DriverStatus, VehicleType
from app.models.ride import PaymentMethod, RideStatus, RideType
from app.models.user import User, UserRole, UserStatus
from app.schemas.ride import RideCompleted, RideEstimate, RideRequest
from app.services.ride_service import RideService


@pytest.fixture
def passenger_user(db: Session):
    """Create a test passenger user."""
    user = User(
        phone_number="1234567890",
        full_name="Test Passenger",
        role=UserRole.PASSENGER,
        status=UserStatus.ACTIVE,
        # Passengers use OTP auth, no password needed
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def driver_user(db: Session):
    """Create a test driver user."""
    user = User(
        phone_number="9876543210",
        full_name="Test Driver",
        role=UserRole.DRIVER,
        status=UserStatus.ACTIVE,
        # Drivers use OTP auth, no password needed
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def driver_profile(db: Session, driver_user: User):
    """Create a driver profile."""
    driver = Driver(
        phone_number=driver_user.phone_number,
        full_name=driver_user.full_name,
        license_number="DL123456",
        license_expiry=datetime(2025, 12, 31),
        vehicle_type=VehicleType.SEDAN,
        vehicle_plate_number="KA-01-AB-1234",
        vehicle_make="Maruti",
        vehicle_model="Swift",
        vehicle_year="2022",
        status=DriverStatus.ACTIVE,
        availability=DriverAvailability.ONLINE,
    )
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver


class TestRideService:
    """Test RideService functionality."""

    def test_create_ride(self, db: Session, passenger_user: User):
        """Test creating a ride request."""
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )

        service = RideService()
        ride = service.create_ride(db, passenger_user.id, ride_data)

        assert ride.id is not None
        assert ride.ride_number is not None
        assert ride.status == RideStatus.PENDING
        assert ride.passenger_id == passenger_user.id
        assert ride.estimated_fare > 0
        assert ride.estimated_distance_km > 0

    def test_accept_ride(self, db: Session, passenger_user: User, driver_profile: Driver):
        """Test driver accepting a ride."""
        # Create ride
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )

        service = RideService()
        ride = service.create_ride(db, passenger_user.id, ride_data)

        # Accept ride
        accepted_ride = service.accept_ride(db, ride.id, driver_profile.id)

        assert accepted_ride.driver_id == driver_profile.id
        assert accepted_ride.status == RideStatus.ACCEPTED
        assert accepted_ride.accepted_at is not None
        assert accepted_ride.otp_code is not None

    def test_start_ride(
        self, db: Session, passenger_user: User, driver_profile: Driver
    ):
        """Test starting a ride."""
        # Create and accept ride
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )

        service = RideService()
        ride = service.create_ride(db, passenger_user.id, ride_data)
        accepted_ride = service.accept_ride(db, ride.id, driver_profile.id)

        # Start ride with correct OTP
        started_ride = service.start_ride(db, ride.id, accepted_ride.otp_code)

        assert started_ride.status == RideStatus.IN_PROGRESS
        assert started_ride.pickup_time is not None

    def test_start_ride_with_invalid_otp(
        self, db: Session, passenger_user: User, driver_profile: Driver
    ):
        """Test starting ride with invalid OTP."""
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )

        service = RideService()
        ride = service.create_ride(db, passenger_user.id, ride_data)
        service.accept_ride(db, ride.id, driver_profile.id)

        # Try to start with wrong OTP
        with pytest.raises(ValueError, match="Invalid OTP code"):
            service.start_ride(db, ride.id, "000000")

    def test_complete_ride(
        self, db: Session, passenger_user: User, driver_profile: Driver
    ):
        """Test completing a ride."""
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )

        service = RideService()
        ride = service.create_ride(db, passenger_user.id, ride_data)
        accepted_ride = service.accept_ride(db, ride.id, driver_profile.id)
        service.start_ride(db, ride.id, accepted_ride.otp_code)

        # Complete ride
        completion_data = RideCompleted(
            actual_distance_km=7.5,
            actual_duration_minutes=25,
            actual_fare=175.50,
        )

        completed_ride = service.complete_ride(db, ride.id, completion_data)

        assert completed_ride.status == RideStatus.COMPLETED
        assert completed_ride.completed_at is not None
        assert completed_ride.actual_distance_km == 7.5
        assert completed_ride.final_fare == 175.50

    def test_cancel_ride(
        self, db: Session, passenger_user: User, driver_profile: Driver
    ):
        """Test cancelling a ride."""
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )

        service = RideService()
        ride = service.create_ride(db, passenger_user.id, ride_data)

        # Cancel ride
        cancelled_ride = service.cancel_ride(
            db, ride.id, "passenger", "Driver was too far"
        )

        assert cancelled_ride.status == RideStatus.CANCELLED
        assert cancelled_ride.cancelled_at is not None
        assert cancelled_ride.cancelled_by == "passenger"
        assert cancelled_ride.cancellation_reason == "Driver was too far"

    def test_estimate_fare(self, db: Session):
        """Test fare estimation."""
        estimate_data = RideEstimate(
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            ride_type=RideType.ECONOMY,
        )

        service = RideService()
        estimate = service.estimate_fare(db, estimate_data)

        assert estimate["estimated_distance_km"] > 0
        assert estimate["estimated_duration_minutes"] > 0
        assert estimate["base_fare"] > 0
        assert estimate["estimated_total"] > 0

    def test_estimate_different_ride_types(self, db: Session):
        """Test fare estimation for different ride types."""
        service = RideService()

        for ride_type in [RideType.ECONOMY, RideType.COMFORT, RideType.PREMIUM]:
            estimate_data = RideEstimate(
                pickup_latitude=12.9716,
                pickup_longitude=77.5946,
                dropoff_latitude=12.9352,
                dropoff_longitude=77.6245,
                ride_type=ride_type,
            )

            estimate = service.estimate_fare(db, estimate_data)
            assert estimate["estimated_total"] > 0

        # Premium should be more expensive than economy
        economy_estimate = service.estimate_fare(
            db,
            RideEstimate(
                pickup_latitude=12.9716,
                pickup_longitude=77.5946,
                dropoff_latitude=12.9352,
                dropoff_longitude=77.6245,
                ride_type=RideType.ECONOMY,
            ),
        )

        premium_estimate = service.estimate_fare(
            db,
            RideEstimate(
                pickup_latitude=12.9716,
                pickup_longitude=77.5946,
                dropoff_latitude=12.9352,
                dropoff_longitude=77.6245,
                ride_type=RideType.PREMIUM,
            ),
        )

        assert premium_estimate["estimated_total"] > economy_estimate["estimated_total"]

    def test_get_rides_by_passenger(
        self, db: Session, passenger_user: User, driver_profile: Driver
    ):
        """Test retrieving rides by passenger."""
        service = RideService()

        # Create multiple rides
        for i in range(3):
            ride_data = RideRequest(
                ride_type=RideType.ECONOMY,
                payment_method=PaymentMethod.CASH,
                pickup_latitude=12.9716,
                pickup_longitude=77.5946,
                pickup_address="Bangalore",
                dropoff_latitude=12.9352 + i * 0.01,
                dropoff_longitude=77.6245 + i * 0.01,
                dropoff_address=f"Location {i}",
            )
            service.create_ride(db, passenger_user.id, ride_data)

        rides = service.get_rides_by_passenger(db, passenger_user.id, limit=10)

        assert len(rides) == 3

    def test_get_pending_rides(self, db: Session, passenger_user: User):
        """Test retrieving pending rides."""
        service = RideService()

        # Create some pending rides
        for i in range(2):
            ride_data = RideRequest(
                ride_type=RideType.ECONOMY,
                payment_method=PaymentMethod.CASH,
                pickup_latitude=12.9716,
                pickup_longitude=77.5946,
                pickup_address="Bangalore",
                dropoff_latitude=12.9352 + i * 0.01,
                dropoff_longitude=77.6245 + i * 0.01,
                dropoff_address=f"Location {i}",
            )
            service.create_ride(db, passenger_user.id, ride_data)

        pending_rides = service.get_pending_rides(db)

        assert len(pending_rides) >= 2
        for ride in pending_rides:
            assert ride.status == RideStatus.PENDING

    def test_haversine_distance(self):
        """Test Haversine distance calculation."""
        service = RideService()

        # Test known distance
        # Bangalore to Indiranagar ~5km
        distance = service._haversine_distance(12.9716, 77.5946, 12.9352, 77.6245)

        # Should be approximately 5km with some tolerance
        assert 4 < distance < 7

    def test_generate_ride_number(self):
        """Test ride number generation."""
        service = RideService()

        ride_number1 = service._generate_ride_number()
        ride_number2 = service._generate_ride_number()

        assert ride_number1.startswith("RID")
        assert ride_number2.startswith("RID")
        assert ride_number1 != ride_number2

    def test_generate_otp(self):
        """Test OTP generation."""
        service = RideService()

        otp1 = service._generate_otp()
        otp2 = service._generate_otp()

        assert len(otp1) == 6
        assert len(otp2) == 6
        assert otp1.isdigit()
        assert otp2.isdigit()


class TestRideAPI:
    """Test Ride API endpoints."""

    def test_request_ride(
        self, client, auth_token_passenger, passenger_user, db: Session
    ):
        """Test requesting a ride."""
        ride_data = {
            "ride_type": "economy",
            "payment_method": "cash",
            "pickup_latitude": 12.9716,
            "pickup_longitude": 77.5946,
            "pickup_address": "Bangalore",
            "dropoff_latitude": 12.9352,
            "dropoff_longitude": 77.6245,
            "dropoff_address": "Indiranagar",
        }

        response = client.post(
            "/api/v1/rides/request",
            json=ride_data,
            headers={"Authorization": f"Bearer {auth_token_passenger}"},
        )

        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["status"] == "pending"
        assert data["passenger_id"] == passenger_user.id
        assert data["estimated_fare"] > 0

    def test_estimate_fare(self, client, auth_token_passenger):
        """Test fare estimation endpoint."""
        estimate_data = {
            "pickup_latitude": 12.9716,
            "pickup_longitude": 77.5946,
            "dropoff_latitude": 12.9352,
            "dropoff_longitude": 77.6245,
            "ride_type": "economy",
        }

        response = client.post(
            "/api/v1/rides/estimate",
            json=estimate_data,
            headers={"Authorization": f"Bearer {auth_token_passenger}"},
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["estimated_distance_km"] > 0
        assert data["estimated_total"] > 0

    def test_get_ride(
        self, client, auth_token_passenger, passenger_user, db: Session
    ):
        """Test getting ride details."""
        # Create a ride
        service = RideService()
        ride_data = RideRequest(
            ride_type=RideType.ECONOMY,
            payment_method=PaymentMethod.CASH,
            pickup_latitude=12.9716,
            pickup_longitude=77.5946,
            pickup_address="Bangalore",
            dropoff_latitude=12.9352,
            dropoff_longitude=77.6245,
            dropoff_address="Indiranagar",
        )
        ride = service.create_ride(db, passenger_user.id, ride_data)

        response = client.get(
            f"/api/v1/rides/{ride.id}",
            headers={"Authorization": f"Bearer {auth_token_passenger}"},
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["id"] == ride.id

    def test_get_passenger_rides(
        self, client, auth_token_passenger, passenger_user, db: Session
    ):
        """Test getting passenger ride history."""
        response = client.get(
            "/api/v1/rides/history/passenger",
            headers={"Authorization": f"Bearer {auth_token_passenger}"},
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert isinstance(data, list)
