"""
Ride model for ride booking and tracking functionality.
"""

from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import (
    Column,
    DateTime,
    Enum as SQLEnum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    Boolean,
)
from sqlalchemy.orm import relationship

from app.models.base import Base


class RideStatus(str, Enum):
    """Ride status enumeration."""

    PENDING = "pending"  # Initial booking
    ACCEPTED = "accepted"  # Driver accepted
    DRIVER_ARRIVING = "driver_arriving"  # Driver en route to pickup
    ARRIVED = "arrived"  # Driver at pickup location
    IN_PROGRESS = "in_progress"  # Ride started
    COMPLETED = "completed"  # Ride finished
    CANCELLED = "cancelled"  # Ride cancelled
    NO_SHOW = "no_show"  # Passenger didn't show up


class PaymentMethod(str, Enum):
    """Payment method enumeration."""

    CASH = "cash"
    CARD = "card"
    WALLET = "wallet"
    UPI = "upi"


class RideType(str, Enum):
    """Ride type enumeration."""

    ECONOMY = "economy"
    COMFORT = "comfort"
    PREMIUM = "premium"


class Ride(Base):
    """Ride model for storing ride booking and tracking information."""

    __tablename__ = "rides"

    # Identifiers
    id = Column(Integer, primary_key=True, index=True)
    ride_number = Column(String(50), unique=True, index=True, nullable=False)

    # Passenger & Driver
    passenger_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True, index=True)

    # Ride Details
    ride_type = Column(SQLEnum(RideType), default=RideType.ECONOMY, nullable=False)
    status = Column(SQLEnum(RideStatus), default=RideStatus.PENDING, index=True)
    payment_method = Column(
        SQLEnum(PaymentMethod), default=PaymentMethod.CASH, nullable=False
    )

    # Locations
    pickup_latitude = Column(Float, nullable=False)
    pickup_longitude = Column(Float, nullable=False)
    pickup_address = Column(String(500), nullable=False)

    dropoff_latitude = Column(Float, nullable=False)
    dropoff_longitude = Column(Float, nullable=False)
    dropoff_address = Column(String(500), nullable=False)

    # Pricing
    estimated_fare = Column(Float, nullable=False)
    actual_fare = Column(Float, nullable=True)
    discount_applied = Column(Float, default=0.0)
    final_fare = Column(Float, nullable=True)

    # Distance & Duration
    estimated_distance_km = Column(Float, nullable=True)  # km
    actual_distance_km = Column(Float, nullable=True)
    estimated_duration_minutes = Column(Integer, nullable=True)
    actual_duration_minutes = Column(Integer, nullable=True)

    # Timestamps
    requested_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    accepted_at = Column(DateTime, nullable=True)
    pickup_time = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    cancelled_at = Column(DateTime, nullable=True)

    # Cancellation
    cancellation_reason = Column(String(500), nullable=True)
    cancelled_by = Column(String(50), nullable=True)  # "passenger" or "driver"

    # Notes
    notes = Column(Text, nullable=True)
    special_requests = Column(Text, nullable=True)

    # Safety & Tracking
    otp_code = Column(String(6), nullable=True)  # OTP for ride verification
    is_ride_shared = Column(Boolean, default=False)
    emergency_contact_shared = Column(Boolean, default=False)

    # Relationships
    passenger = relationship("User", foreign_keys=[passenger_id], lazy="joined")
    driver = relationship("Driver", foreign_keys=[driver_id], lazy="joined")
    payments = relationship("Payment", back_populates="ride", cascade="all, delete-orphan")
    ratings = relationship("Rating", back_populates="ride", cascade="all, delete-orphan")
    locations = relationship(
        "Location", back_populates="ride", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Ride {self.ride_number} - {self.status}>"
