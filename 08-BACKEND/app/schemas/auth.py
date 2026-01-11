"""Authentication Pydantic schemas."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, validator


# ============================================================================
# OTP Schemas
# ============================================================================


class SendOTPRequest(BaseModel):
    """Request schema for sending OTP."""

    phone_number: str = Field(..., min_length=10, max_length=20, description="Phone number with country code")
    user_type: str = Field(..., description="Type of user: 'passenger' or 'driver'")

    @validator("phone_number")
    def validate_phone_number(cls, v: str) -> str:
        """Validate phone number format."""
        # Remove any spaces or dashes
        cleaned = v.replace(" ", "").replace("-", "")
        if not cleaned.startswith("+"):
            raise ValueError("Phone number must start with country code (+679 for Fiji)")
        if not cleaned[1:].isdigit():
            raise ValueError("Phone number must contain only digits after +")
        return cleaned

    @validator("user_type")
    def validate_user_type(cls, v: str) -> str:
        """Validate user type."""
        if v not in ["passenger", "driver"]:
            raise ValueError("user_type must be 'passenger' or 'driver'")
        return v


class SendOTPResponse(BaseModel):
    """Response schema for OTP sent."""

    success: bool
    message: str
    expires_in: int = Field(..., description="OTP expiry time in seconds")


class VerifyOTPRequest(BaseModel):
    """Request schema for verifying OTP."""

    phone_number: str = Field(..., min_length=10, max_length=20)
    otp: str = Field(..., min_length=6, max_length=6, description="6-digit OTP code")
    user_type: str = Field(..., description="Type of user: 'passenger' or 'driver'")

    @validator("otp")
    def validate_otp(cls, v: str) -> str:
        """Validate OTP format."""
        if not v.isdigit():
            raise ValueError("OTP must contain only digits")
        if len(v) != 6:
            raise ValueError("OTP must be exactly 6 digits")
        return v


class VerifyOTPResponse(BaseModel):
    """Response schema for OTP verification."""

    success: bool
    message: str
    access_token: Optional[str] = None
    token_type: str = "bearer"
    user_id: Optional[str] = None
    is_new_user: bool = False


# ============================================================================
# Registration Schemas
# ============================================================================


class PassengerRegistrationRequest(BaseModel):
    """Request schema for passenger registration."""

    phone_number: str = Field(..., min_length=10, max_length=20)
    full_name: str = Field(..., min_length=2, max_length=255)
    email: Optional[EmailStr] = None
    profile_picture_url: Optional[str] = None

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "phone_number": "+6799876543",
                "full_name": "John Doe",
                "email": "john@example.com",
            }
        }


class DriverRegistrationRequest(BaseModel):
    """Request schema for driver registration."""

    # Personal information
    phone_number: str = Field(..., min_length=10, max_length=20)
    full_name: str = Field(..., min_length=2, max_length=255)
    email: Optional[EmailStr] = None
    date_of_birth: Optional[datetime] = None
    profile_picture_url: Optional[str] = None

    # Driver license
    license_number: str = Field(..., min_length=5, max_length=100)
    license_expiry: datetime = Field(...)

    # Vehicle information
    vehicle_make: str = Field(..., min_length=2, max_length=100)
    vehicle_model: str = Field(..., min_length=2, max_length=100)
    vehicle_year: str = Field(..., min_length=4, max_length=4)
    vehicle_color: str = Field(..., min_length=2, max_length=50)
    vehicle_plate_number: str = Field(..., min_length=2, max_length=50)
    vehicle_type: str = Field(..., description="sedan, suv, mini_van, or luxury")

    # Bank details
    bank_account_name: Optional[str] = Field(None, max_length=255)
    bank_account_number: Optional[str] = Field(None, max_length=100)
    bank_name: Optional[str] = Field(None, max_length=255)
    bank_branch: Optional[str] = Field(None, max_length=255)

    @validator("vehicle_type")
    def validate_vehicle_type(cls, v: str) -> str:
        """Validate vehicle type."""
        valid_types = ["sedan", "suv", "mini_van", "luxury"]
        if v not in valid_types:
            raise ValueError(f"vehicle_type must be one of: {', '.join(valid_types)}")
        return v

    @validator("vehicle_year")
    def validate_vehicle_year(cls, v: str) -> str:
        """Validate vehicle year."""
        if not v.isdigit():
            raise ValueError("Vehicle year must be numeric")
        year = int(v)
        current_year = datetime.now().year
        if year < 1990 or year > current_year + 1:
            raise ValueError(f"Vehicle year must be between 1990 and {current_year + 1}")
        return v

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "phone_number": "+6799876543",
                "full_name": "John Smith",
                "email": "john.driver@example.com",
                "license_number": "FJ123456",
                "license_expiry": "2026-12-31T00:00:00",
                "vehicle_make": "Toyota",
                "vehicle_model": "Camry",
                "vehicle_year": "2020",
                "vehicle_color": "White",
                "vehicle_plate_number": "AB1234",
                "vehicle_type": "sedan",
            }
        }


class UserRegistrationResponse(BaseModel):
    """Response schema for user registration."""

    success: bool
    message: str
    user_id: str
    access_token: str
    token_type: str = "bearer"


# ============================================================================
# Login Schemas
# ============================================================================


class AdminLoginRequest(BaseModel):
    """Request schema for admin login."""

    email: EmailStr
    password: str = Field(..., min_length=8)


class LoginResponse(BaseModel):
    """Response schema for login."""

    success: bool
    message: str
    access_token: str
    token_type: str = "bearer"
    user: dict


# ============================================================================
# Token Schemas
# ============================================================================


class TokenData(BaseModel):
    """Token data schema."""

    user_id: str
    phone_number: str
    role: str
    exp: int


class RefreshTokenRequest(BaseModel):
    """Request schema for refreshing access token."""

    refresh_token: str


# ============================================================================
# User Response Schemas
# ============================================================================


class UserResponse(BaseModel):
    """Response schema for user data."""

    id: str
    phone_number: str
    email: Optional[str]
    full_name: str
    profile_picture_url: Optional[str]
    role: str
    status: str
    is_phone_verified: bool
    is_email_verified: bool
    last_login: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        """Pydantic config."""

        from_attributes = True


class DriverResponse(BaseModel):
    """Response schema for driver data."""

    id: str
    phone_number: str
    email: Optional[str]
    full_name: str
    profile_picture_url: Optional[str]
    status: str
    availability: str
    is_phone_verified: bool
    vehicle_make: Optional[str]
    vehicle_model: Optional[str]
    vehicle_plate_number: Optional[str]
    vehicle_type: Optional[str]
    rating: float
    total_rides: str
    completed_rides: str
    created_at: datetime
    verified_at: Optional[datetime]

    class Config:
        """Pydantic config."""

        from_attributes = True
