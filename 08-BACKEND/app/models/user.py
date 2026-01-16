"""User model for passengers and admins."""

from datetime import datetime
from enum import Enum

from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, String
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class UserRole(str, Enum):
    """User role enumeration."""

    PASSENGER = "passenger"
    DRIVER = "driver"
    ADMIN = "admin"


class UserStatus(str, Enum):
    """User account status."""

    ACTIVE = "active"
    SUSPENDED = "suspended"
    DELETED = "deleted"


class User(BaseModel):
    """User model for passengers and administrators."""

    __tablename__ = "users"

    # Primary identification (email OR phone required, both supported)
    phone_number = Column(String(20), unique=True, nullable=True, index=True)
    email = Column(String(255), unique=True, nullable=True, index=True)

    # Profile information
    full_name = Column(String(255), nullable=False)
    profile_picture_url = Column(String(500), nullable=True)

    # Authentication (password now required for all users)
    hashed_password = Column(String(255), nullable=False)  # bcrypt hash
    role = Column(SQLEnum(UserRole), default=UserRole.PASSENGER, nullable=False)  # type: ignore
    status = Column(SQLEnum(UserStatus), default=UserStatus.ACTIVE, nullable=False)  # type: ignore
    is_phone_verified = Column(Boolean, default=False, nullable=False)
    is_email_verified = Column(Boolean, default=False, nullable=False)

    # Verification tokens
    email_verification_token = Column(String(255), nullable=True)
    phone_verification_code = Column(String(10), nullable=True)
    verification_code_expires = Column(DateTime, nullable=True)

    # OTP tracking (for phone verification)
    otp_secret = Column(String(255), nullable=True)  # Encrypted OTP
    otp_expiry = Column(DateTime, nullable=True)
    otp_attempts = Column(String(10), default="0", nullable=False)

    # Security
    last_login = Column(DateTime, nullable=True)
    password_hash = Column(String(255), nullable=True)  # Deprecated - use hashed_password
    failed_login_attempts = Column(String(10), default="0", nullable=False)
    account_locked_until = Column(DateTime, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    rides = relationship("Ride", back_populates="passenger", foreign_keys="Ride.passenger_id")

    # Table constraints
    __table_args__ = (
        CheckConstraint(
            'email IS NOT NULL OR phone_number IS NOT NULL',
            name='at_least_one_contact_method'
        ),
    )

    def __repr__(self) -> str:
        """String representation of User."""
        return f"<User(id={self.id}, phone={self.phone_number}, role={self.role})>"

    def to_dict(self) -> dict:
        """Convert user to dictionary."""
        return {
            "id": str(self.id),
            "phone_number": self.phone_number,
            "email": self.email,
            "full_name": self.full_name,
            "profile_picture_url": self.profile_picture_url,
            "role": self.role.value,
            "status": self.status.value,
            "is_phone_verified": self.is_phone_verified,
            "is_email_verified": self.is_email_verified,
            "last_login": self.last_login.isoformat() if self.last_login else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
