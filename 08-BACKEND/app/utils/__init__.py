"""Utilities module."""

from app.utils.jwt import (
    create_access_token,
    create_refresh_token,
    create_token_for_user,
    create_tokens_for_user,
    decode_token,
    get_user_from_token,
    verify_token,
)
from app.utils.otp import (
    format_phone_number,
    generate_otp,
    generate_secure_otp,
    get_otp_expiry,
    increment_otp_attempts,
    is_max_attempts_exceeded,
    is_otp_expired,
    mask_phone_number,
    reset_otp_attempts,
    send_otp_sms,
    verify_otp,
)
from app.utils.password import hash_password, verify_password

__all__ = [
    # JWT utils
    "create_access_token",
    "create_refresh_token",
    "decode_token",
    "verify_token",
    "get_user_from_token",
    "create_token_for_user",
    "create_tokens_for_user",
    # OTP utils
    "generate_otp",
    "generate_secure_otp",
    "get_otp_expiry",
    "is_otp_expired",
    "verify_otp",
    "format_phone_number",
    "mask_phone_number",
    "send_otp_sms",
    "increment_otp_attempts",
    "is_max_attempts_exceeded",
    "reset_otp_attempts",
    # Password utils
    "hash_password",
    "verify_password",
]
