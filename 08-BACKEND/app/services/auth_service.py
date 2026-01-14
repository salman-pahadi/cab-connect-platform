"""Authentication service for OTP-based login and JWT tokens."""
# mypy: disable-error-code="assignment,arg-type"

from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.driver import Driver, DriverStatus
from app.models.user import User, UserRole, UserStatus
from app.schemas.auth import (
    DriverRegistrationRequest,
    PassengerRegistrationRequest,
)
from app.utils.jwt import create_token_for_user
from app.utils.otp import (
    format_phone_number,
    generate_secure_otp,
    get_otp_expiry,
    increment_otp_attempts,
    is_max_attempts_exceeded,
    reset_otp_attempts,
    send_otp_sms,
    verify_otp,
)
from app.utils.password import verify_password


class AuthService:
    """Authentication service class."""

    @staticmethod
    async def send_otp(
        db: AsyncSession, phone_number: str, user_type: str
    ) -> tuple[bool, str, int]:
        """
        Send OTP to user's phone number.

        Args:
            db: Database session
            phone_number: User's phone number
            user_type: "passenger" or "driver"

        Returns:
            Tuple of (success: bool, message: str, expires_in: int)
        """
        # Format phone number
        phone = format_phone_number(phone_number)

        # Generate OTP
        otp = generate_secure_otp()
        otp_expiry = get_otp_expiry(minutes=5)

        # Find or create user based on type
        if user_type == "passenger":
            # Check for existing passenger
            result = await db.execute(select(User).where(User.phone_number == phone))
            user = result.scalar_one_or_none()

            if not user:
                # Create new passenger (minimal info, complete during registration)
                user = User(
                    phone_number=phone,
                    full_name="",  # Will be filled during registration
                    role=UserRole.PASSENGER,
                    status=UserStatus.ACTIVE,
                )
                db.add(user)

            # Check OTP attempts
            if is_max_attempts_exceeded(user.otp_attempts):  # type: ignore
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Maximum OTP attempts exceeded. Please try again later.",
                )

            # Update OTP
            user.otp_secret = otp  # type: ignore
            user.otp_expiry = otp_expiry  # type: ignore
            user.otp_attempts = increment_otp_attempts(user.otp_attempts)  # type: ignore

        elif user_type == "driver":
            # Check for existing driver
            result = await db.execute(select(Driver).where(Driver.phone_number == phone))
            driver = result.scalar_one_or_none()

            if not driver:
                # Create new driver (minimal info, complete during registration)
                driver = Driver(
                    phone_number=phone,
                    full_name="",  # Will be filled during registration
                    status=DriverStatus.PENDING,
                )
                db.add(driver)

            # Check OTP attempts
            if is_max_attempts_exceeded(driver.otp_attempts):  # type: ignore
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Maximum OTP attempts exceeded. Please try again later.",
                )

            # Update OTP
            driver.otp_secret = otp  # type: ignore
            driver.otp_expiry = otp_expiry  # type: ignore
            driver.otp_attempts = increment_otp_attempts(driver.otp_attempts)  # type: ignore

        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user_type. Must be 'passenger' or 'driver'.",
            )

        # Commit to database
        await db.commit()

        # Send OTP via SMS
        success, message = await send_otp_sms(phone, otp)

        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=message,
            )

        return True, "OTP sent successfully", 300  # 5 minutes = 300 seconds

    @staticmethod
    async def verify_otp_and_login(
        db: AsyncSession, phone_number: str, otp: str, user_type: str
    ) -> tuple[bool, str, str | None, str | None, bool]:
        """
        Verify OTP and log in user.

        Args:
            db: Database session
            phone_number: User's phone number
            otp: OTP code to verify
            user_type: "passenger" or "driver"

        Returns:
            Tuple of (success: bool, message: str, access_token: str, user_id: str, is_new_user: bool)
        """
        # Format phone number
        phone = format_phone_number(phone_number)

        # Find user based on type
        if user_type == "passenger":
            result = await db.execute(select(User).where(User.phone_number == phone))
            user = result.scalar_one_or_none()

            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found. Please request OTP first.",
                )

            # Verify OTP
            is_valid, message = verify_otp(user.otp_secret, otp, user.otp_expiry)

            if not is_valid:
                # Increment attempts
                user.otp_attempts = increment_otp_attempts(user.otp_attempts)
                await db.commit()
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=message,
                )

            # OTP verified successfully
            user.is_phone_verified = True
            user.otp_attempts = reset_otp_attempts()
            user.otp_secret = None  # Clear OTP
            user.otp_expiry = None
            user.last_login = datetime.utcnow()

            # Check if registration is complete
            is_new_user = not user.full_name  # Full name not yet provided

            await db.commit()
            await db.refresh(user)

            # Create access token
            access_token = create_token_for_user(
                str(user.id), user.phone_number, user.role.value
            )

            return True, "Login successful", access_token, str(user.id), is_new_user

        elif user_type == "driver":
            result = await db.execute(select(Driver).where(Driver.phone_number == phone))
            driver = result.scalar_one_or_none()

            if not driver:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Driver not found. Please request OTP first.",
                )

            # Verify OTP
            is_valid, message = verify_otp(driver.otp_secret, otp, driver.otp_expiry)

            if not is_valid:
                # Increment attempts
                driver.otp_attempts = increment_otp_attempts(driver.otp_attempts)
                await db.commit()
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=message,
                )

            # OTP verified successfully
            driver.is_phone_verified = True
            driver.otp_attempts = reset_otp_attempts()
            driver.otp_secret = None  # Clear OTP
            driver.otp_expiry = None
            driver.last_login = datetime.utcnow()

            # Check if registration is complete
            is_new_user = not driver.full_name  # Full name not yet provided

            await db.commit()
            await db.refresh(driver)

            # Create access token (role is "driver")
            access_token = create_token_for_user(
                str(driver.id), driver.phone_number, "driver"
            )

            return True, "Login successful", access_token, str(driver.id), is_new_user

        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user_type. Must be 'passenger' or 'driver'.",
            )

    @staticmethod
    async def register_passenger(
        db: AsyncSession, user_id: str, data: PassengerRegistrationRequest
    ) -> tuple[bool, str, str]:
        """
        Complete passenger registration.

        Args:
            db: Database session
            user_id: User ID from JWT token
            data: Passenger registration data

        Returns:
            Tuple of (success: bool, message: str, access_token: str)
        """
        # Find user
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )

        # Update user information
        user.full_name = data.full_name
        user.email = data.email
        user.profile_picture_url = data.profile_picture_url

        # Mark email as verified if provided (will implement email verification later)
        if data.email:
            user.is_email_verified = False  # Will verify separately

        await db.commit()
        await db.refresh(user)

        # Create new access token
        access_token = create_token_for_user(
            str(user.id), user.phone_number, user.role.value
        )

        return True, "Registration completed successfully", access_token

    @staticmethod
    async def register_driver(
        db: AsyncSession, driver_id: str, data: DriverRegistrationRequest
    ) -> tuple[bool, str, str]:
        """
        Complete driver registration.

        Args:
            db: Database session
            driver_id: Driver ID from JWT token
            data: Driver registration data

        Returns:
            Tuple of (success: bool, message: str, access_token: str)
        """
        # Find driver
        result = await db.execute(select(Driver).where(Driver.id == driver_id))
        driver = result.scalar_one_or_none()

        if not driver:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Driver not found.",
            )

        # Update driver information
        driver.full_name = data.full_name
        driver.email = data.email
        driver.date_of_birth = data.date_of_birth
        driver.profile_picture_url = data.profile_picture_url
        driver.license_number = data.license_number
        driver.license_expiry = data.license_expiry
        driver.vehicle_make = data.vehicle_make
        driver.vehicle_model = data.vehicle_model
        driver.vehicle_year = data.vehicle_year
        driver.vehicle_color = data.vehicle_color
        driver.vehicle_plate_number = data.vehicle_plate_number
        driver.vehicle_type = data.vehicle_type
        driver.bank_account_name = data.bank_account_name
        driver.bank_account_number = data.bank_account_number
        driver.bank_name = data.bank_name
        driver.bank_branch = data.bank_branch

        # Mark email as verified if provided
        if data.email:
            driver.is_email_verified = False  # Will verify separately

        # Status remains PENDING until admin approval
        driver.status = DriverStatus.PENDING

        await db.commit()
        await db.refresh(driver)

        # Create new access token
        access_token = create_token_for_user(
            str(driver.id), driver.phone_number, "driver"
        )

        return (
            True,
            "Registration submitted successfully. Awaiting admin verification.",
            access_token,
        )

    @staticmethod
    async def admin_login(
        db: AsyncSession, email: str, password: str
    ) -> tuple[bool, str, str, dict]:
        """
        Admin login with email and password.

        Args:
            db: Database session
            email: Admin email
            password: Admin password

        Returns:
            Tuple of (success: bool, message: str, access_token: str, user_dict: dict)
        """
        # Find admin user
        result = await db.execute(
            select(User).where(User.email == email, User.role == UserRole.ADMIN)
        )
        admin = result.scalar_one_or_none()

        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        # Verify password
        if not admin.password_hash or not verify_password(password, admin.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        # Check account status
        if admin.status != UserStatus.ACTIVE:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is not active.",
            )

        # Update last login
        admin.last_login = datetime.utcnow()
        await db.commit()
        await db.refresh(admin)

        # Create access token
        access_token = create_token_for_user(
            str(admin.id), admin.phone_number or email, admin.role.value
        )

        return True, "Admin login successful", access_token, admin.to_dict()
