"""
SMS Service with Twilio Integration
Supports development mode for testing without sending actual SMS
"""

import logging
import random
import string
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

from app.core.config import settings

logger = logging.getLogger(__name__)


class SMSService:
    """
    Service for sending SMS messages via Twilio or dev mode
    """

    def __init__(self):
        """Initialize SMS service"""
        self.enabled = settings.SMS_ENABLED
        self.provider = settings.SMS_PROVIDER
        self.dev_mode = settings.ENVIRONMENT_MODE == "development"

        if self.enabled and self.provider == "twilio" and not self.dev_mode:
            try:
                from twilio.rest import Client

                self.client = Client(
                    settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN
                )
                logger.info("✅ Twilio SMS client initialized")
            except Exception as e:
                logger.error(f"❌ Failed to initialize Twilio: {e}")
                self.client = None
        else:
            self.client = None

    def generate_otp(self, length: int = None) -> str:
        """
        Generate random OTP

        Args:
            length: Length of OTP (default from settings)

        Returns:
            OTP string of digits
        """
        length = length or settings.OTP_LENGTH
        return "".join(random.choices(string.digits, k=length))

    def send_otp(
        self, phone_number: str, otp: str, **kwargs
    ) -> Dict[str, Any]:
        """
        Send OTP via SMS

        Args:
            phone_number: Recipient phone number
            otp: OTP code to send
            **kwargs: Additional parameters

        Returns:
            Dict with status and message ID (if applicable)
        """
        if not self.enabled:
            logger.warning("⚠️ SMS is disabled in configuration")
            return {"status": "disabled", "message": "SMS is disabled"}

        # Development mode: Just log the OTP
        if self.dev_mode:
            logger.info(
                f"📱 [DEV MODE] OTP for {phone_number}: {otp} (Valid for {settings.OTP_VALIDITY_MINUTES} minutes)"
            )
            return {
                "status": "success",
                "mode": "development",
                "phone": phone_number,
                "otp": otp,
                "message": f"[DEV] OTP logged to console",
            }

        # Production mode: Send via Twilio
        if not self.client:
            logger.error("❌ Twilio client not initialized")
            return {"status": "error", "message": "SMS service not available"}

        try:
            message_body = f"Your Cab Connect OTP is: {otp}. Valid for {settings.OTP_VALIDITY_MINUTES} minutes. Never share this code."

            message = self.client.messages.create(
                body=message_body,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phone_number,
            )

            logger.info(
                f"✅ OTP sent successfully to {phone_number} (SID: {message.sid})"
            )
            return {
                "status": "success",
                "sid": message.sid,
                "phone": phone_number,
                "message": "OTP sent successfully",
            }
        except Exception as e:
            logger.error(f"❌ Failed to send OTP to {phone_number}: {e}")
            return {"status": "error", "message": str(e)}

    def send_ride_update(
        self, phone_number: str, driver_name: str, eta_minutes: int, **kwargs
    ) -> Dict[str, Any]:
        """
        Send ride status update SMS

        Args:
            phone_number: Recipient phone number
            driver_name: Name of driver
            eta_minutes: Estimated time of arrival in minutes
            **kwargs: Additional parameters

        Returns:
            Dict with status
        """
        if not self.enabled:
            return {"status": "disabled"}

        if self.dev_mode:
            logger.info(
                f"📱 [DEV MODE] Ride update for {phone_number}: Driver {driver_name} arriving in {eta_minutes} min"
            )
            return {
                "status": "success",
                "mode": "development",
                "message": "[DEV] Ride update logged",
            }

        try:
            message_body = f"Your Cab Connect driver {driver_name} is on the way! ETA: {eta_minutes} minutes."

            message = self.client.messages.create(
                body=message_body,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phone_number,
            )

            logger.info(f"✅ Ride update sent to {phone_number}")
            return {"status": "success", "sid": message.sid}
        except Exception as e:
            logger.error(f"❌ Failed to send ride update: {e}")
            return {"status": "error", "message": str(e)}

    def send_welcome_message(self, phone_number: str) -> Dict[str, Any]:
        """
        Send welcome message to new user

        Args:
            phone_number: Recipient phone number

        Returns:
            Dict with status
        """
        if not self.enabled:
            return {"status": "disabled"}

        if self.dev_mode:
            logger.info(
                f"📱 [DEV MODE] Welcome message for {phone_number}: Account created"
            )
            return {
                "status": "success",
                "mode": "development",
                "message": "[DEV] Welcome message logged",
            }

        try:
            message_body = "Welcome to Cab Connect! Your account has been created. Book your first ride now!"

            message = self.client.messages.create(
                body=message_body,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phone_number,
            )

            logger.info(f"✅ Welcome message sent to {phone_number}")
            return {"status": "success", "sid": message.sid}
        except Exception as e:
            logger.error(f"❌ Failed to send welcome message: {e}")
            return {"status": "error", "message": str(e)}


# Global SMS service instance
sms_service = SMSService()
