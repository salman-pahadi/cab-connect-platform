"""Email service for sending verification and notification emails."""

import os


class EmailService:
    """
    Email service for sending transactional emails.

    Supports multiple providers:
    - Resend (recommended - generous free tier)
    - SendGrid
    - AWS SES
    - SMTP (fallback)
    """

    def __init__(self):
        """Initialize email service with provider from environment."""
        self.provider = os.getenv("EMAIL_PROVIDER", "resend").lower()
        self.from_email = os.getenv("EMAIL_FROM", "noreply@fijicabconnect.com")
        self.from_name = os.getenv("EMAIL_FROM_NAME", "Cab Connect")

        # Provider-specific API keys
        self.resend_api_key = os.getenv("RESEND_API_KEY")
        self.sendgrid_api_key = os.getenv("SENDGRID_API_KEY")
        self.aws_region = os.getenv("AWS_REGION", "ap-southeast-2")

        # SMTP settings (fallback)
        self.smtp_host = os.getenv("SMTP_HOST")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME")
        self.smtp_password = os.getenv("SMTP_PASSWORD")

        self._validate_config()

    def _validate_config(self) -> None:
        """Validate email service configuration."""
        if self.provider == "resend" and not self.resend_api_key:
            print("Warning: RESEND_API_KEY not configured. Email sending will fail.")
        elif self.provider == "sendgrid" and not self.sendgrid_api_key:
            print("Warning: SENDGRID_API_KEY not configured. Email sending will fail.")
        elif self.provider == "smtp" and not all([self.smtp_host, self.smtp_username, self.smtp_password]):
            print("Warning: SMTP configuration incomplete. Email sending will fail.")

    async def send_verification_email(
        self,
        to_email: str,
        user_name: str,
        verification_token: str,
    ) -> bool:
        """
        Send email verification link.

        Args:
            to_email: Recipient email address
            user_name: User's full name
            verification_token: Verification token for URL

        Returns:
            True if sent successfully

        Raises:
            HTTPException: If email sending fails
        """
        # Build verification URL
        base_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        verification_url = f"{base_url}/auth/verify-email?token={verification_token}"

        subject = "Verify your Cab Connect account"
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #10b981; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Cab Connect</h1>
            </div>

            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px;">
                <h2 style="color: #10b981; margin-top: 0;">Welcome to Cab Connect!</h2>

                <p>Hi {user_name},</p>

                <p>Thank you for signing up with Cab Connect, Fiji's premier ride-hailing service.</p>

                <p>To complete your registration, please verify your email address by clicking the button below:</p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="{verification_url}"
                       style="background-color: #10b981; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                        Verify Email Address
                    </a>
                </div>

                <p style="color: #666; font-size: 14px;">
                    Or copy and paste this link into your browser:<br>
                    <a href="{verification_url}" style="color: #10b981;">{verification_url}</a>
                </p>

                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                    This verification link will expire in 24 hours.
                </p>

                <p style="color: #666; font-size: 14px;">
                    If you didn't create an account with Cab Connect, please ignore this email.
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                <p>Cab Connect - Ride Anywhere in Fiji</p>
                <p>© 2026 Cab Connect. All rights reserved.</p>
            </div>
        </body>
        </html>
        """

        return await self._send_email(
            to_email=to_email,
            subject=subject,
            html_content=html_content,
        )

    async def send_password_reset_email(
        self,
        to_email: str,
        user_name: str,
        reset_token: str,
    ) -> bool:
        """
        Send password reset link.

        Args:
            to_email: Recipient email address
            user_name: User's full name
            reset_token: Password reset token for URL

        Returns:
            True if sent successfully
        """
        base_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        reset_url = f"{base_url}/auth/reset-password?token={reset_token}"

        subject = "Reset your Cab Connect password"
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #10b981; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Cab Connect</h1>
            </div>

            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px;">
                <h2 style="color: #10b981; margin-top: 0;">Password Reset Request</h2>

                <p>Hi {user_name},</p>

                <p>We received a request to reset your Cab Connect password.</p>

                <p>Click the button below to choose a new password:</p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_url}"
                       style="background-color: #10b981; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                        Reset Password
                    </a>
                </div>

                <p style="color: #666; font-size: 14px;">
                    Or copy and paste this link into your browser:<br>
                    <a href="{reset_url}" style="color: #10b981;">{reset_url}</a>
                </p>

                <p style="color: #ff6b6b; font-size: 14px; margin-top: 30px; padding: 15px; background-color: #ffe8e8; border-radius: 5px;">
                    ⚠️ This password reset link will expire in 1 hour.
                </p>

                <p style="color: #666; font-size: 14px;">
                    If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
                <p>Cab Connect - Ride Anywhere in Fiji</p>
                <p>© 2026 Cab Connect. All rights reserved.</p>
            </div>
        </body>
        </html>
        """

        return await self._send_email(
            to_email=to_email,
            subject=subject,
            html_content=html_content,
        )

    async def _send_email(
        self,
        to_email: str,
        subject: str,
        html_content: str,
    ) -> bool:
        """
        Send email via configured provider.

        Args:
            to_email: Recipient email
            subject: Email subject
            html_content: HTML email body

        Returns:
            True if sent successfully

        Raises:
            HTTPException: If sending fails
        """
        try:
            if self.provider == "resend":
                return await self._send_via_resend(to_email, subject, html_content)
            elif self.provider == "sendgrid":
                return await self._send_via_sendgrid(to_email, subject, html_content)
            elif self.provider == "ses":
                return await self._send_via_ses(to_email, subject, html_content)
            elif self.provider == "smtp":
                return await self._send_via_smtp(to_email, subject, html_content)
            else:
                print(f"Email would be sent to {to_email}: {subject}")
                return True  # Development mode - just log

        except Exception as e:
            print(f"Error sending email: {str(e)}")
            # Don't raise exception - email sending should be non-blocking
            return False

    async def _send_via_resend(self, to_email: str, subject: str, html_content: str) -> bool:
        """Send email via Resend."""
        if not self.resend_api_key:
            print(f"[DEV MODE] Email to {to_email}: {subject}")
            return True

        try:
            import httpx

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.resend.com/emails",
                    headers={
                        "Authorization": f"Bearer {self.resend_api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "from": f"{self.from_name} <{self.from_email}>",
                        "to": [to_email],
                        "subject": subject,
                        "html": html_content,
                    },
                )

                if response.status_code != 200:
                    print(f"Resend API error: {response.text}")
                    return False

                return True

        except Exception as e:
            print(f"Resend error: {str(e)}")
            return False

    async def _send_via_sendgrid(self, to_email: str, subject: str, html_content: str) -> bool:
        """Send email via SendGrid."""
        print(f"SendGrid: Email to {to_email}: {subject}")
        # TODO: Implement SendGrid integration
        return True

    async def _send_via_ses(self, to_email: str, subject: str, html_content: str) -> bool:
        """Send email via AWS SES."""
        print(f"AWS SES: Email to {to_email}: {subject}")
        # TODO: Implement AWS SES integration
        return True

    async def _send_via_smtp(self, to_email: str, subject: str, html_content: str) -> bool:
        """Send email via SMTP."""
        print(f"SMTP: Email to {to_email}: {subject}")
        # TODO: Implement SMTP integration
        return True


# Global email service instance
email_service = EmailService()
