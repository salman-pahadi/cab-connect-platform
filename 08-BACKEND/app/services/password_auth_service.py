"""Authentication service for email/phone + password based auth."""

import secrets
from datetime import datetime, timedelta

from fastapi import HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.models.user import User, UserRole, UserStatus
from app.schemas.auth_password import (
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
)
from app.utils.jwt import create_token_for_user
from app.utils.password import hash_password, verify_password


class PasswordAuthService:
    """Authentication service for email/phone + password based authentication."""

    @staticmethod
    def signup(db: Session, request: SignupRequest) -> SignupResponse:
        """
        Create new user account with email/phone + password.

        Args:
            db: Database session
            request: Signup request with user details

        Returns:
            SignupResponse with access token and user info

        Raises:
            HTTPException: If email/phone already exists
        """
        # Check for existing user with same email or phone
        existing_user = None

        if request.email:
            result = db.execute(select(User).where(User.email == request.email.lower()))
            existing_user = result.scalar_one_or_none()

        if not existing_user and request.phone_number:
            result = db.execute(select(User).where(User.phone_number == request.phone_number))
            existing_user = result.scalar_one_or_none()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email or phone number already exists",
            )

        # Hash password
        hashed_pwd = hash_password(request.password)

        # Generate verification tokens
        email_token = secrets.token_urlsafe(32) if request.email else None
        phone_code = str(secrets.randbelow(900000) + 100000) if request.phone_number else None  # 6-digit code
        verification_expiry = datetime.utcnow() + timedelta(hours=24) if phone_code else None

        # Create user
        user = User(
            email=request.email.lower() if request.email else None,
            phone_number=request.phone_number,
            hashed_password=hashed_pwd,
            full_name=request.full_name,
            role=UserRole.DRIVER if request.user_type == "driver" else UserRole.PASSENGER,
            status=UserStatus.ACTIVE,
            profile_picture_url=request.profile_picture_url,
            email_verification_token=email_token,
            phone_verification_code=phone_code,
            verification_code_expires=verification_expiry,
            is_email_verified=False,
            is_phone_verified=False,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        # Generate JWT token
        access_token = create_token_for_user(
            user_id=str(user.id),
            phone_number=str(user.phone_number or user.email or ""),
            role=user.role.value
        )

        # Prepare response
        user_dict = {
            "id": str(user.id),
            "email": user.email,
            "phone_number": user.phone_number,
            "full_name": user.full_name,
            "role": user.role.value,
            "is_email_verified": user.is_email_verified,
            "is_phone_verified": user.is_phone_verified,
        }

        verification_required = {
            "email": bool(request.email),
            "phone": bool(request.phone_number),
        }

        # TODO: Send verification email/SMS in background task
        # - Email: Send link with email_token
        # - Phone: Send SMS with phone_code

        return SignupResponse(
            success=True,
            message="Account created successfully. Please verify your email/phone.",
            access_token=access_token,
            token_type="bearer",
            user=user_dict,
            verification_required=verification_required,
        )

    @staticmethod
    def login(db: Session, request: LoginRequest) -> LoginResponse:
        """
        Authenticate user with email/phone + password.

        Args:
            db: Database session
            request: Login request with identifier and password

        Returns:
            LoginResponse with access token and user info

        Raises:
            HTTPException: If credentials are invalid
        """
        identifier = request.identifier

        # Determine if identifier is email or phone
        is_email = "@" in identifier

        # Find user by email or phone
        if is_email:
            result = db.execute(select(User).where(User.email == identifier.lower()))
        else:
            result = db.execute(select(User).where(User.phone_number == identifier))

        user = result.scalar_one_or_none()

        # Check if user exists
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )

        # Verify password
        if not user.hashed_password or not verify_password(request.password, str(user.hashed_password)):
            # Increment failed login attempts
            if user.failed_login_attempts:
                attempts = int(user.failed_login_attempts) + 1
            else:
                attempts = 1

            user.failed_login_attempts = str(attempts)  # type: ignore[assignment]

            # Lock account after 10 failed attempts
            if attempts >= 10:
                user.account_locked_until = datetime.utcnow() + timedelta(hours=1)  # type: ignore[assignment]
                db.commit()
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Account locked due to too many failed login attempts. Please try again in 1 hour.",
                )

            db.commit()

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )

        # Check if account is locked
        if user.account_locked_until and user.account_locked_until > datetime.utcnow():
            time_remaining = (user.account_locked_until - datetime.utcnow()).seconds // 60
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Account is locked. Please try again in {time_remaining} minutes.",
            )

        # Check if account is suspended
        if user.status != UserStatus.ACTIVE:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account has been suspended. Please contact support.",
            )

        # Optional: Check if user_type matches
        if request.user_type:
            expected_role = UserRole.DRIVER if request.user_type == "driver" else UserRole.PASSENGER
            if user.role != expected_role:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"This account is registered as a {user.role.value}, not {request.user_type}",
                )

        # Reset failed login attempts on successful login
        user.failed_login_attempts = "0"  # type: ignore[assignment]
        user.last_login = datetime.utcnow()  # type: ignore[assignment]
        user.account_locked_until = None  # type: ignore[assignment]
        db.commit()
        db.refresh(user)

        # Generate JWT token
        access_token = create_token_for_user(
            user_id=str(user.id),
            phone_number=str(user.phone_number or user.email or ""),
            role=user.role.value
        )

        # Prepare response
        user_dict = {
            "id": str(user.id),
            "email": user.email,
            "phone_number": user.phone_number,
            "full_name": user.full_name,
            "role": user.role.value,
            "is_email_verified": user.is_email_verified,
            "is_phone_verified": user.is_phone_verified,
            "status": user.status.value,
        }

        return LoginResponse(
            success=True,
            message="Login successful",
            access_token=access_token,
            token_type="bearer",
            user=user_dict,
        )

    @staticmethod
    def verify_email(db: Session, user_id: str, token: str) -> bool:
        """
        Verify user's email with verification token.

        Args:
            db: Database session
            user_id: User ID from JWT token
            token: Email verification token

        Returns:
            True if verification successful

        Raises:
            HTTPException: If token is invalid or expired
        """
        result = db.execute(select(User).where(User.id == int(user_id)))
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if user.is_email_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already verified",
            )

        if user.email_verification_token != token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid verification token",
            )

        # Mark email as verified
        user.is_email_verified = True  # type: ignore[assignment]
        user.email_verification_token = None  # type: ignore[assignment]
        db.commit()

        return True

    @staticmethod
    def verify_phone(db: Session, user_id: str, code: str) -> bool:
        """
        Verify user's phone with OTP code.

        Args:
            db: Database session
            user_id: User ID from JWT token
            code: 6-digit verification code

        Returns:
            True if verification successful

        Raises:
            HTTPException: If code is invalid or expired
        """
        result = db.execute(select(User).where(User.id == int(user_id)))
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if user.is_phone_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone already verified",
            )

        if not user.phone_verification_code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No verification code found. Please request a new one.",
            )

        if user.phone_verification_code != code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid verification code",
            )

        if user.verification_code_expires and user.verification_code_expires < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Verification code has expired. Please request a new one.",
            )

        # Mark phone as verified
        user.is_phone_verified = True  # type: ignore[assignment]
        user.phone_verification_code = None  # type: ignore[assignment]
        user.verification_code_expires = None  # type: ignore[assignment]
        db.commit()

        return True

    @staticmethod
    def resend_verification(db: Session, user_id: str, method: str) -> tuple[bool, str, int | None]:
        """
        Resend verification email or SMS.

        Args:
            db: Database session
            user_id: User ID from JWT token
            method: "email" or "phone"

        Returns:
            Tuple of (success, message, expires_in_seconds)

        Raises:
            HTTPException: If user not found or already verified
        """
        result = db.execute(select(User).where(User.id == int(user_id)))
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if method == "email":
            if not user.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No email associated with this account",
                )

            if user.is_email_verified:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already verified",
                )

            # Generate new token
            user.email_verification_token = secrets.token_urlsafe(32)  # type: ignore[assignment]
            db.commit()

            # TODO: Send email in background task
            return True, "Verification email sent", None

        elif method == "phone":
            if not user.phone_number:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No phone number associated with this account",
                )

            if user.is_phone_verified:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Phone already verified",
                )

            # Generate new code
            user.phone_verification_code = str(secrets.randbelow(900000) + 100000)  # type: ignore[assignment]
            user.verification_code_expires = datetime.utcnow() + timedelta(minutes=10)  # type: ignore[assignment]
            db.commit()

            # TODO: Send SMS in background task
            return True, "Verification code sent", 600  # 10 minutes

        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid verification method. Must be 'email' or 'phone'",
            )

    @staticmethod
    def forgot_password(db: Session, identifier: str) -> tuple[bool, str, str]:
        """
        Initiate password reset process.

        Args:
            db: Database session
            identifier: Email or phone number

        Returns:
            Tuple of (success, message, method)

        Raises:
            HTTPException: If user not found
        """
        identifier = identifier.strip()
        is_email = "@" in identifier

        # Find user
        if is_email:
            query = select(User).where(User.email == identifier.lower())
        else:
            query = select(User).where(User.phone_number == identifier)

        result = db.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            # Don't reveal if user exists (security best practice)
            if is_email:
                return True, "If an account with this email exists, you will receive a password reset link.", "email"
            else:
                return True, "If an account with this phone exists, you will receive a password reset code.", "sms"

        # Generate reset token/code
        if is_email:
            reset_token = secrets.token_urlsafe(32)
            user.email_verification_token = reset_token  # type: ignore[assignment] # Reuse field for reset token
            user.verification_code_expires = datetime.utcnow() + timedelta(hours=1)  # type: ignore[assignment] # 1 hour expiry
            db.commit()

            # TODO: Send password reset email
            return True, "Password reset link sent to your email.", "email"
        else:
            reset_code = str(secrets.randbelow(900000) + 100000)
            user.phone_verification_code = reset_code  # type: ignore[assignment] # Reuse field for reset code
            user.verification_code_expires = datetime.utcnow() + timedelta(minutes=10)  # type: ignore[assignment] # 10 min expiry
            db.commit()

            # TODO: Send password reset SMS
            return True, "Password reset code sent to your phone.", "sms"

    @staticmethod
    def reset_password(db: Session, token_or_code: str, new_password: str) -> tuple[bool, str]:
        """
        Reset password with token or code.

        Args:
            db: Database session
            token_or_code: Reset token (email) or OTP code (phone)
            new_password: New password

        Returns:
            Tuple of (success, message)

        Raises:
            HTTPException: If token/code invalid or expired
        """
        # Determine if it's a token (long string) or code (6 digits)
        is_code = len(token_or_code) == 6 and token_or_code.isdigit()

        if is_code:
            # Phone reset with code
            query = select(User).where(User.phone_verification_code == token_or_code)
        else:
            # Email reset with token
            query = select(User).where(User.email_verification_token == token_or_code)

        result = db.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token/code",
            )

        # Check expiry
        if not user.verification_code_expires or user.verification_code_expires < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Reset token/code has expired. Please request a new one.",
            )

        # Hash new password
        hashed_password = hash_password(new_password)

        # Update user
        user.hashed_password = hashed_password  # type: ignore[assignment]
        user.email_verification_token = None  # type: ignore[assignment]
        user.phone_verification_code = None  # type: ignore[assignment]
        user.verification_code_expires = None  # type: ignore[assignment]
        user.failed_login_attempts = "0"  # type: ignore[assignment] # Reset failed attempts
        user.account_locked_until = None  # type: ignore[assignment]

        db.commit()

        return True, "Password reset successful. You can now login with your new password."
