"""Pydantic schemas module."""

from app.schemas.auth import (
    AdminLoginRequest,
    DriverRegistrationRequest,
    DriverResponse,
    LoginResponse,
    PassengerRegistrationRequest,
    RefreshTokenRequest,
    SendOTPRequest,
    SendOTPResponse,
    TokenData,
    UserRegistrationResponse,
    UserResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
)

__all__ = [
    "SendOTPRequest",
    "SendOTPResponse",
    "VerifyOTPRequest",
    "VerifyOTPResponse",
    "PassengerRegistrationRequest",
    "DriverRegistrationRequest",
    "UserRegistrationResponse",
    "AdminLoginRequest",
    "LoginResponse",
    "TokenData",
    "RefreshTokenRequest",
    "UserResponse",
    "DriverResponse",
]
