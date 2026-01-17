"""OTP (One-Time Password) utility functions."""

import random
import secrets
from datetime import datetime, timedelta

from app.config import settings


def generate_otp(length: int = 6) -> str:
    """
    Generate a random OTP code.

    Args:
        length: Length of OTP (default: 6)

    Returns:
        String containing random digits
    """
    return "".join([str(random.randint(0, 9)) for _ in range(length)])


def generate_secure_otp(length: int = 6) -> str:
    """
    Generate a cryptographically secure OTP code.

    Args:
        length: Length of OTP (default: 6)

    Returns:
        String containing random digits
    """
    # Use secrets module for cryptographic strength
    return "".join([str(secrets.randbelow(10)) for _ in range(length)])


def get_otp_expiry(minutes: int = 5) -> datetime:
    """
    Get OTP expiry timestamp.

    Args:
        minutes: Minutes until OTP expires (default: 5)

    Returns:
        DateTime object representing expiry time
    """
    return datetime.utcnow() + timedelta(minutes=minutes)


def is_otp_expired(expiry: datetime | None) -> bool:
    """
    Check if OTP has expired.

    Args:
        expiry: OTP expiry datetime

    Returns:
        True if expired, False otherwise
    """
    if not expiry:
        return True
    return datetime.utcnow() > expiry


def verify_otp(stored_otp: str, provided_otp: str, expiry: datetime | None) -> tuple[bool, str]:
    """
    Verify OTP code.

    Args:
        stored_otp: OTP stored in database
        provided_otp: OTP provided by user
        expiry: OTP expiry datetime

    Returns:
        Tuple of (success: bool, message: str)
    """
    # Check if OTP has expired
    if is_otp_expired(expiry):
        return False, "OTP has expired. Please request a new one."

    # Check if OTP matches
    if stored_otp != provided_otp:
        return False, "Invalid OTP code."

    return True, "OTP verified successfully."


def format_phone_number(phone: str) -> str:
    """
    Format phone number to standard format.

    Args:
        phone: Phone number string

    Returns:
        Formatted phone number
    """
    # Remove spaces, dashes, and parentheses
    cleaned = phone.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")

    # Ensure it starts with +
    if not cleaned.startswith("+"):
        # Assume Fiji number if no country code
        if cleaned.startswith("679"):
            cleaned = "+" + cleaned
        else:
            cleaned = "+679" + cleaned

    return cleaned


def mask_phone_number(phone: str) -> str:
    """
    Mask phone number for display (show last 4 digits only).

    Args:
        phone: Phone number string

    Returns:
        Masked phone number (e.g., +679****1234)
    """
    if len(phone) < 8:
        return phone

    # Show country code and last 4 digits
    country_code = phone[:4] if phone.startswith("+") else phone[:3]
    last_digits = phone[-4:]
    masked_middle = "*" * (len(phone) - len(country_code) - 4)

    return f"{country_code}{masked_middle}{last_digits}"


async def send_otp_sms(phone_number: str, otp: str) -> tuple[bool, str]:
    """
    Send OTP via SMS.

    This is a placeholder function. In production, integrate with:
    - Twilio
    - AWS SNS
    - MessageBird
    - Or local Fiji SMS gateway

    Args:
        phone_number: Recipient phone number
        otp: OTP code to send

    Returns:
        Tuple of (success: bool, message: str)
    """
    # TODO: Implement actual SMS sending logic

    # Development mode: Just log the OTP
    if settings.ENVIRONMENT == "development":
        print(f"\n{'='*50}")
        print(f"📱 SMS to {phone_number}")
        print(f"🔐 Your Cab Connect OTP code is: {otp}")
        print("⏰ Valid for 5 minutes")
        print(f"{'='*50}\n")
        return True, "OTP sent successfully (development mode)"

    # Production mode: Implement actual SMS sending
    try:
        # Example with Twilio (uncomment and configure when ready)
        # from twilio.rest import Client
        # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        # message = client.messages.create(
        #     body=f"Your Cab Connect OTP code is: {otp}. Valid for 5 minutes.",
        #     from_=settings.TWILIO_PHONE_NUMBER,
        #     to=phone_number
        # )
        # return True, "OTP sent successfully"

        # Placeholder for now
        return True, "OTP sent successfully"

    except Exception as e:
        return False, f"Failed to send OTP: {str(e)}"


def increment_otp_attempts(current_attempts: str) -> str:
    """
    Increment OTP attempt counter.

    Args:
        current_attempts: Current attempt count as string

    Returns:
        Incremented attempt count as string
    """
    try:
        attempts = int(current_attempts)
        return str(attempts + 1)
    except (ValueError, TypeError):
        return "1"


def is_max_attempts_exceeded(attempts: str, max_attempts: int = 5) -> bool:
    """
    Check if maximum OTP attempts exceeded.

    Args:
        attempts: Current attempt count as string
        max_attempts: Maximum allowed attempts (default: 5)

    Returns:
        True if max attempts exceeded, False otherwise
    """
    try:
        return int(attempts) >= max_attempts
    except (ValueError, TypeError):
        return False


def reset_otp_attempts() -> str:
    """
    Reset OTP attempts counter.

    Returns:
        "0" as string
    """
    return "0"
