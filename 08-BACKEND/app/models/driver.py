"""Driver model for cab drivers."""

from datetime import datetime
from enum import Enum
from sqlalchemy import Boolean, Column, DateTime, Enum as SQLEnum, Float, String, Text
from sqlalchemy.orm import relationship

from app.database.base import Base


class DriverStatus(str, Enum):
    """Driver account status."""

    PENDING = "pending"  # Awaiting verification
    ACTIVE = "active"  # Verified and can accept rides
    SUSPENDED = "suspended"  # Temporarily disabled
    REJECTED = "rejected"  # Verification failed
    DELETED = "deleted"  # Account deleted


class DriverAvailability(str, Enum):
    """Driver online/offline status."""

    ONLINE = "online"  # Available for rides
    OFFLINE = "offline"  # Not accepting rides
    ON_RIDE = "on_ride"  # Currently on a ride


class VehicleType(str, Enum):
    """Vehicle type enumeration."""

    SEDAN = "sedan"
    SUV = "suv"
    MINI_VAN = "mini_van"
    LUXURY = "luxury"


class Driver(Base):
    """Driver model for cab drivers."""

    __tablename__ = "drivers"

    # Primary identification
    phone_number = Column(String(20), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=True, index=True)

    # Profile information
    full_name = Column(String(255), nullable=False)
    profile_picture_url = Column(String(500), nullable=True)
    date_of_birth = Column(DateTime, nullable=True)

    # Authentication
    status = Column(SQLEnum(DriverStatus), default=DriverStatus.PENDING, nullable=False)
    availability = Column(SQLEnum(DriverAvailability), default=DriverAvailability.OFFLINE, nullable=False)
    is_phone_verified = Column(Boolean, default=False, nullable=False)
    is_email_verified = Column(Boolean, default=False, nullable=False)

    # OTP tracking
    otp_secret = Column(String(255), nullable=True)  # Encrypted OTP
    otp_expiry = Column(DateTime, nullable=True)
    otp_attempts = Column(String(10), default="0", nullable=False)

    # Driver verification documents
    license_number = Column(String(100), unique=True, nullable=True)
    license_expiry = Column(DateTime, nullable=True)
    license_document_url = Column(String(500), nullable=True)
    vehicle_registration_url = Column(String(500), nullable=True)
    insurance_document_url = Column(String(500), nullable=True)
    background_check_status = Column(String(50), default="pending", nullable=False)

    # Vehicle information
    vehicle_make = Column(String(100), nullable=True)
    vehicle_model = Column(String(100), nullable=True)
    vehicle_year = Column(String(4), nullable=True)
    vehicle_color = Column(String(50), nullable=True)
    vehicle_plate_number = Column(String(50), unique=True, nullable=True)
    vehicle_type = Column(SQLEnum(VehicleType), nullable=True)

    # Performance metrics
    rating = Column(Float, default=5.0, nullable=False)
    total_rides = Column(String(10), default="0", nullable=False)
    completed_rides = Column(String(10), default="0", nullable=False)
    cancelled_rides = Column(String(10), default="0", nullable=False)
    total_earnings = Column(Float, default=0.0, nullable=False)

    # Location tracking
    current_latitude = Column(Float, nullable=True)
    current_longitude = Column(Float, nullable=True)
    last_location_update = Column(DateTime, nullable=True)

    # Bank details for payouts
    bank_account_name = Column(String(255), nullable=True)
    bank_account_number = Column(String(100), nullable=True)
    bank_name = Column(String(255), nullable=True)
    bank_branch = Column(String(255), nullable=True)

    # Admin notes
    admin_notes = Column(Text, nullable=True)
    rejection_reason = Column(Text, nullable=True)

    # Security
    last_login = Column(DateTime, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    verified_at = Column(DateTime, nullable=True)

    # Relationships
    rides = relationship("Ride", back_populates="driver", foreign_keys="Ride.driver_id")

    def __repr__(self) -> str:
        """String representation of Driver."""
        return f"<Driver(id={self.id}, phone={self.phone_number}, status={self.status})>"

    def to_dict(self) -> dict:
        """Convert driver to dictionary."""
        return {
            "id": str(self.id),
            "phone_number": self.phone_number,
            "email": self.email,
            "full_name": self.full_name,
            "profile_picture_url": self.profile_picture_url,
            "status": self.status.value,
            "availability": self.availability.value,
            "is_phone_verified": self.is_phone_verified,
            "is_email_verified": self.is_email_verified,
            "vehicle_make": self.vehicle_make,
            "vehicle_model": self.vehicle_model,
            "vehicle_plate_number": self.vehicle_plate_number,
            "vehicle_type": self.vehicle_type.value if self.vehicle_type else None,
            "rating": self.rating,
            "total_rides": self.total_rides,
            "completed_rides": self.completed_rides,
            "created_at": self.created_at.isoformat(),
            "verified_at": self.verified_at.isoformat() if self.verified_at else None,
        }

    def is_available(self) -> bool:
        """Check if driver is available for rides."""
        return self.status == DriverStatus.ACTIVE and self.availability == DriverAvailability.ONLINE

    def go_online(self) -> None:
        """Set driver status to online."""
        if self.status == DriverStatus.ACTIVE:
            self.availability = DriverAvailability.ONLINE

    def go_offline(self) -> None:
        """Set driver status to offline."""
        self.availability = DriverAvailability.OFFLINE

    def start_ride(self) -> None:
        """Mark driver as on a ride."""
        self.availability = DriverAvailability.ON_RIDE

    def end_ride(self) -> None:
        """Mark driver as online after ride completion."""
        if self.status == DriverStatus.ACTIVE:
            self.availability = DriverAvailability.ONLINE
