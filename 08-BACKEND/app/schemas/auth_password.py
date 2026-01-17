"""Authentication schemas for email/phone + password based auth."""

import re
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

# ============================================================================
# Signup Schemas
# ============================================================================


class SignupRequest(BaseModel):
    """Request schema for user signup with email OR phone + password."""

    # Flexible identifier (email OR phone, at least one required)
    email: EmailStr | None = Field(None, description="User's email address")
    phone_number: str | None = Field(None, min_length=10, max_length=20, description="Phone with country code (+679)")

    # Required fields
    password: str = Field(..., min_length=8, max_length=128, description="User password (min 8 chars)")
    full_name: str = Field(..., min_length=2, max_length=255, description="User's full name")
    user_type: Literal["passenger", "driver"] = Field(..., description="Account type")

    # Optional fields
    profile_picture_url: str | None = Field(None, max_length=500)

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, v: str | None) -> str | None:
        """Validate phone number format."""
        if v is None:
            return None

        # Remove spaces and dashes
        cleaned = v.replace(" ", "").replace("-", "")

        # Must start with + and country code
        if not cleaned.startswith("+"):
            raise ValueError("Phone number must include country code (e.g., +679 for Fiji)")

        # Must contain only digits after +
        if not cleaned[1:].isdigit():
            raise ValueError("Phone number must contain only digits after country code")

        # Length check (min 10, max 20)
        if len(cleaned) < 10 or len(cleaned) > 20:
            raise ValueError("Phone number must be between 10 and 20 characters")

        return cleaned

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """Validate password meets security requirements."""
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")

        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")

        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")

        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")

        # Optional: Check against common passwords
        common_passwords = ["password", "12345678", "password123", "admin123"]
        if v.lower() in common_passwords:
            raise ValueError("Password is too common. Please choose a stronger password")

        return v

    @field_validator("user_type")
    @classmethod
    def validate_user_type(cls, v: str) -> str:
        """Ensure user_type is valid."""
        if v not in ["passenger", "driver"]:
            raise ValueError("user_type must be 'passenger' or 'driver'")
        return v

    def model_post_init(self, __context) -> None:
        """Validate that at least one contact method is provided."""
        if not self.email and not self.phone_number:
            raise ValueError("At least one of email or phone_number must be provided")


class SignupResponse(BaseModel):
    """Response schema for successful signup."""

    success: bool = True
    message: str
    access_token: str
    token_type: str = "bearer"
    user: dict
    verification_required: dict  # {"email": bool, "phone": bool}

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Account created successfully",
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "id": "123",
                    "email": "user@example.com",
                    "phone_number": None,
                    "full_name": "John Doe",
                    "role": "passenger",
                    "is_email_verified": False,
                    "is_phone_verified": False,
                },
                "verification_required": {
                    "email": True,
                    "phone": False,
                },
            }
        }
    }


# ============================================================================
# Login Schemas
# ============================================================================


class LoginRequest(BaseModel):
    """Request schema for user login with email/phone + password."""

    identifier: str = Field(..., description="Email address OR phone number")
    password: str = Field(..., min_length=1, description="User password")
    user_type: Literal["passenger", "driver"] | None = Field(None, description="Optional: specify account type")

    @field_validator("identifier")
    @classmethod
    def validate_identifier(cls, v: str) -> str:
        """Validate identifier format (email or phone)."""
        v = v.strip()

        # Check if it's an email
        if "@" in v:
            # Basic email validation
            if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", v):
                raise ValueError("Invalid email format")
            return v.lower()

        # Otherwise treat as phone number
        cleaned = v.replace(" ", "").replace("-", "")
        if not cleaned.startswith("+"):
            raise ValueError("Phone number must include country code (e.g., +679)")
        if not cleaned[1:].isdigit():
            raise ValueError("Invalid phone number format")

        return cleaned


class LoginResponse(BaseModel):
    """Response schema for successful login."""

    success: bool = True
    message: str
    access_token: str
    token_type: str = "bearer"
    user: dict

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Login successful",
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "id": "123",
                    "email": "user@example.com",
                    "phone_number": "+6799876543",
                    "full_name": "John Doe",
                    "role": "passenger",
                    "is_email_verified": True,
                    "is_phone_verified": True,
                },
            }
        }
    }


# ============================================================================
# Verification Schemas
# ============================================================================


class ResendVerificationRequest(BaseModel):
    """Request to resend verification code/email."""

    method: Literal["email", "phone"] = Field(..., description="Verification method to resend")


class ResendVerificationResponse(BaseModel):
    """Response for resend verification."""

    success: bool
    message: str
    expires_in: int | None = Field(None, description="Seconds until code expires (for phone OTP)")


class VerifyEmailRequest(BaseModel):
    """Request to verify email with token."""

    token: str = Field(..., min_length=32, max_length=255, description="Email verification token from link")


class VerifyPhoneRequest(BaseModel):
    """Request to verify phone with OTP code."""

    code: str = Field(..., min_length=6, max_length=6, description="6-digit verification code")

    @field_validator("code")
    @classmethod
    def validate_code(cls, v: str) -> str:
        """Validate OTP code format."""
        if not v.isdigit():
            raise ValueError("Verification code must contain only digits")
        if len(v) != 6:
            raise ValueError("Verification code must be exactly 6 digits")
        return v


class VerificationResponse(BaseModel):
    """Response for verification success."""

    success: bool
    message: str


# ============================================================================
# Password Reset Schemas
# ============================================================================


class ForgotPasswordRequest(BaseModel):
    """Request to initiate password reset."""

    identifier: str = Field(..., description="Email or phone number")

    @field_validator("identifier")
    @classmethod
    def validate_identifier(cls, v: str) -> str:
        """Validate identifier format."""
        v = v.strip()

        # Email
        if "@" in v:
            if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", v):
                raise ValueError("Invalid email format")
            return v.lower()

        # Phone
        cleaned = v.replace(" ", "").replace("-", "")
        if not cleaned.startswith("+"):
            raise ValueError("Phone number must include country code")
        if not cleaned[1:].isdigit():
            raise ValueError("Invalid phone number format")

        return cleaned


class ForgotPasswordResponse(BaseModel):
    """Response for forgot password request."""

    success: bool
    message: str
    method: str  # "email" or "sms"


class ResetPasswordRequest(BaseModel):
    """Request to reset password with token/code."""

    token_or_code: str = Field(..., description="Reset token (email) or OTP code (phone)")
    new_password: str = Field(..., min_length=8, max_length=128, description="New password")
    confirm_password: str = Field(..., description="Confirm new password")

    @field_validator("new_password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        """Validate new password meets requirements."""
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        return v

    def model_post_init(self, __context) -> None:
        """Validate passwords match."""
        if self.new_password != self.confirm_password:
            raise ValueError("Passwords do not match")


class ResetPasswordResponse(BaseModel):
    """Response for password reset."""

    success: bool
    message: str
