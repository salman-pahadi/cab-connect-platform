"""Authentication API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.auth import (
    AdminLoginRequest,
    DriverRegistrationRequest,
    LoginResponse,
    PassengerRegistrationRequest,
    SendOTPRequest,
    SendOTPResponse,
    UserRegistrationResponse,
    VerifyOTPRequest,
    VerifyOTPResponse,
)
from app.services.auth_service import AuthService
from app.utils.jwt import get_user_from_token

router = APIRouter()
security = HTTPBearer()


# ============================================================================
# OTP Endpoints
# ============================================================================


@router.post("/send-otp", response_model=SendOTPResponse, status_code=status.HTTP_200_OK)
async def send_otp(request: SendOTPRequest, db: AsyncSession = Depends(get_db)):
    """
    Send OTP to user's phone number.

    - **phone_number**: Phone number with country code (e.g., +6799876543)
    - **user_type**: Either "passenger" or "driver"
    """
    success, message, expires_in = await AuthService.send_otp(
        db, request.phone_number, request.user_type
    )

    return SendOTPResponse(success=success, message=message, expires_in=expires_in)


@router.post("/verify-otp", response_model=VerifyOTPResponse, status_code=status.HTTP_200_OK)
async def verify_otp(request: VerifyOTPRequest, db: AsyncSession = Depends(get_db)):
    """
    Verify OTP and log in user.

    - **phone_number**: Phone number with country code
    - **otp**: 6-digit OTP code received via SMS
    - **user_type**: Either "passenger" or "driver"

    Returns access token if verification successful.
    If is_new_user=true, user should complete registration.
    """
    success, message, access_token, user_id, is_new_user = await AuthService.verify_otp_and_login(
        db, request.phone_number, request.otp, request.user_type
    )

    return VerifyOTPResponse(
        success=success,
        message=message,
        access_token=access_token,
        user_id=user_id,
        is_new_user=is_new_user,
    )


# ============================================================================
# Registration Endpoints
# ============================================================================


@router.post(
    "/register/passenger",
    response_model=UserRegistrationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register_passenger(
    request: PassengerRegistrationRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
):
    """
    Complete passenger registration after OTP verification.

    **Requires authentication** (Bearer token from verify-otp endpoint).

    - **phone_number**: Phone number (must match token)
    - **full_name**: Passenger's full name
    - **email**: Email address (optional)
    - **profile_picture_url**: Profile picture URL (optional)
    """
    # Get user from token
    user_data = get_user_from_token(credentials.credentials)
    user_id = user_data["user_id"]

    # Register passenger
    success, message, access_token = await AuthService.register_passenger(db, user_id, request)

    return UserRegistrationResponse(
        success=success, message=message, user_id=user_id, access_token=access_token
    )


@router.post(
    "/register/driver",
    response_model=UserRegistrationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register_driver(
    request: DriverRegistrationRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
):
    """
    Complete driver registration after OTP verification.

    **Requires authentication** (Bearer token from verify-otp endpoint).

    Includes all driver information, vehicle details, and documents.
    Driver status will be PENDING until admin verification.

    - **phone_number**: Phone number (must match token)
    - **full_name**: Driver's full name
    - **email**: Email address (optional)
    - **license_number**: Driver's license number
    - **license_expiry**: License expiry date
    - **vehicle_make**: Vehicle manufacturer (e.g., Toyota)
    - **vehicle_model**: Vehicle model (e.g., Camry)
    - **vehicle_year**: Vehicle year (4 digits)
    - **vehicle_color**: Vehicle color
    - **vehicle_plate_number**: License plate number
    - **vehicle_type**: sedan, suv, mini_van, or luxury
    - **bank_account_name**: Account holder name (optional)
    - **bank_account_number**: Bank account number (optional)
    - **bank_name**: Bank name (optional)
    - **bank_branch**: Bank branch (optional)
    """
    # Get user from token
    user_data = get_user_from_token(credentials.credentials)
    driver_id = user_data["user_id"]

    # Register driver
    success, message, access_token = await AuthService.register_driver(db, driver_id, request)

    return UserRegistrationResponse(
        success=success, message=message, user_id=driver_id, access_token=access_token
    )


# ============================================================================
# Admin Login
# ============================================================================


@router.post("/admin/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
async def admin_login(request: AdminLoginRequest, db: AsyncSession = Depends(get_db)):
    """
    Admin login with email and password.

    - **email**: Admin email address
    - **password**: Admin password

    Returns access token for admin dashboard access.
    """
    success, message, access_token, user_dict = await AuthService.admin_login(
        db, request.email, request.password
    )

    return LoginResponse(
        success=success, message=message, access_token=access_token, user=user_dict
    )


# ============================================================================
# Token Verification (for testing)
# ============================================================================


@router.get("/me", status_code=status.HTTP_200_OK)
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Get current user from JWT token (for testing authentication).

    **Requires authentication** (Bearer token).

    Returns user information extracted from the token.
    """
    user_data = get_user_from_token(credentials.credentials)

    return {
        "success": True,
        "message": "Token is valid",
        "user": user_data,
    }


# ============================================================================
# Health Check
# ============================================================================


@router.get("/health", status_code=status.HTTP_200_OK)
async def auth_health_check():
    """
    Auth service health check.

    Returns service status.
    """
    return {
        "service": "authentication",
        "status": "healthy",
        "version": "1.0.0",
    }
