"""Authentication API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

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
from app.schemas.auth_password import (
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    ResendVerificationRequest,
    ResendVerificationResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    SignupRequest,
    SignupResponse,
    VerificationResponse,
    VerifyEmailRequest,
    VerifyPhoneRequest,
)
from app.schemas.auth_password import (
    LoginResponse as PasswordLoginResponse,
)
from app.services.auth_service import AuthService
from app.services.password_auth_service import PasswordAuthService
from app.utils.jwt import get_user_from_token
from app.utils.rate_limiter import rate_limit_by_identifier, rate_limit_by_ip, rate_limit_by_user

router = APIRouter()
security = HTTPBearer(auto_error=False)


# ============================================================================
# OTP Endpoints
# ============================================================================


@router.post("/send-otp", response_model=SendOTPResponse, status_code=status.HTTP_200_OK)
async def send_otp(request: SendOTPRequest, db: Session = Depends(get_db)):
    """
    Send OTP to user's phone number.

    - **phone_number**: Phone number with country code (e.g., +6799876543)
    - **user_type**: Either "passenger" or "driver"
    """
    success, message, expires_in = AuthService.send_otp(
        db, request.phone_number, request.user_type
    )

    return SendOTPResponse(success=success, message=message, expires_in=expires_in)


@router.post("/verify-otp", response_model=VerifyOTPResponse, status_code=status.HTTP_200_OK)
async def verify_otp(request: VerifyOTPRequest, db: Session = Depends(get_db)):
    """
    Verify OTP and log in user.

    - **phone_number**: Phone number with country code
    - **otp**: 6-digit OTP code received via SMS
    - **user_type**: Either "passenger" or "driver"

    Returns access token if verification successful.
    If is_new_user=true, user should complete registration.
    """
    success, message, access_token, user_id, is_new_user = AuthService.verify_otp_and_login(
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
    db: Session = Depends(get_db),
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
    success, message, access_token = AuthService.register_passenger(db, user_id, request)

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
    db: Session = Depends(get_db),
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
    success, message, access_token = AuthService.register_driver(db, driver_id, request)

    return UserRegistrationResponse(
        success=success, message=message, user_id=driver_id, access_token=access_token
    )


# ============================================================================
# Admin Login
# ============================================================================


@router.post("/admin/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
async def admin_login(request: AdminLoginRequest, db: Session = Depends(get_db)):
    """
    Admin login with email and password.

    - **email**: Admin email address
    - **password**: Admin password

    Returns access token for admin dashboard access.
    """
    success, message, access_token, user_dict = AuthService.admin_login(
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
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated")

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


# ============================================================================
# Email/Phone + Password Authentication Endpoints
# ============================================================================


@router.post("/signup", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
async def signup(request: SignupRequest, req: Request, db: Session = Depends(get_db)):
    """
    Create new user account with email OR phone + password.

    - **email**: User's email address (optional if phone provided)
    - **phone_number**: Phone number with country code (optional if email provided)
    - **password**: Secure password (min 8 chars, 1 uppercase, 1 number)
    - **full_name**: User's full name
    - **user_type**: Either "passenger" or "driver"

    At least one of email or phone_number must be provided.

    Returns access token and user information.
    Verification email/SMS will be sent in background.

    **Rate Limit:** 3 signups per IP per hour
    """
    # Rate limit: 3 signups per IP per hour
    rate_limit_by_ip(req, max_requests=3, window_seconds=3600)

    # Rate limit by identifier (prevent spamming same email/phone)
    identifier = request.email or request.phone_number
    if identifier:
        rate_limit_by_identifier(identifier, "signup", max_requests=3, window_seconds=3600)

    return PasswordAuthService.signup(db, request)


@router.post("/login", response_model=PasswordLoginResponse, status_code=status.HTTP_200_OK)
async def login(request: LoginRequest, req: Request, db: Session = Depends(get_db)):
    """
    Authenticate user with email/phone + password.

    - **identifier**: Email address OR phone number
    - **password**: User's password
    - **user_type**: Optional - specify "passenger" or "driver" to validate account type

    Returns access token and user information.

    **Rate Limit:** 5 login attempts per identifier per 15 minutes
    """
    # Rate limit: 5 login attempts per identifier per 15 minutes
    rate_limit_by_identifier(request.identifier, "login", max_requests=5, window_seconds=900)

    return PasswordAuthService.login(db, request)


@router.post("/verify-email", response_model=VerificationResponse, status_code=status.HTTP_200_OK)
async def verify_email(
    request: VerifyEmailRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    """
    Verify user's email address with verification token.

    Requires authentication (JWT token in Authorization header).

    - **token**: Email verification token from verification link
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
        )

    user = get_user_from_token(credentials.credentials)
    user_id = user.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    PasswordAuthService.verify_email(db, str(user_id), request.token)

    return VerificationResponse(
        success=True,
        message="Email verified successfully",
    )


@router.post("/verify-phone", response_model=VerificationResponse, status_code=status.HTTP_200_OK)
async def verify_phone(
    request: VerifyPhoneRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    """
    Verify user's phone number with OTP code.

    Requires authentication (JWT token in Authorization header).

    - **code**: 6-digit verification code sent via SMS
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
        )

    user = get_user_from_token(credentials.credentials)
    user_id = user.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    PasswordAuthService.verify_phone(db, str(user_id), request.code)

    return VerificationResponse(
        success=True,
        message="Phone verified successfully",
    )


@router.post("/resend-verification", response_model=ResendVerificationResponse, status_code=status.HTTP_200_OK)
async def resend_verification(
    request: ResendVerificationRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    """
    Resend verification email or SMS code.

    Requires authentication (JWT token in Authorization header).

    - **method**: Either "email" or "phone"

    Rate limited to prevent abuse:
    - Email: 5 resends per day
    - Phone: 3 resends per day (SMS cost control)
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
        )

    user = get_user_from_token(credentials.credentials)
    user_id = user.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    # Rate limit resends
    if request.method == "email":
        rate_limit_by_user(str(user_id), "resend_email", max_requests=5, window_seconds=86400)  # 5 per day
    elif request.method == "phone":
        rate_limit_by_user(str(user_id), "resend_phone", max_requests=3, window_seconds=86400)  # 3 per day

    success, message, expires_in = PasswordAuthService.resend_verification(db, str(user_id), request.method)

    return ResendVerificationResponse(
        success=success,
        message=message,
        expires_in=expires_in,
    )


@router.post("/forgot-password", response_model=ForgotPasswordResponse, status_code=status.HTTP_200_OK)
async def forgot_password(request: ForgotPasswordRequest, req: Request, db: Session = Depends(get_db)):
    """
    Initiate password reset process.

    - **identifier**: Email address OR phone number

    Sends password reset link via email or OTP code via SMS.

    **Rate Limit:** 3 requests per identifier per hour
    """
    # Rate limit: 3 password reset requests per identifier per hour
    rate_limit_by_identifier(request.identifier, "forgot_password", max_requests=3, window_seconds=3600)

    success, message, method = PasswordAuthService.forgot_password(db, request.identifier)

    return ForgotPasswordResponse(
        success=success,
        message=message,
        method=method,
    )


@router.post("/reset-password", response_model=ResetPasswordResponse, status_code=status.HTTP_200_OK)
async def reset_password(request: ResetPasswordRequest, req: Request, db: Session = Depends(get_db)):
    """
    Reset password with token or code.

    - **token_or_code**: Reset token from email OR 6-digit code from SMS
    - **new_password**: New secure password (min 8 chars, 1 uppercase, 1 number)
    - **confirm_password**: Must match new_password

    Completes the password reset process.

    **Rate Limit:** 5 attempts per IP per 15 minutes
    """
    # Rate limit: 5 reset attempts per IP per 15 minutes
    rate_limit_by_ip(req, max_requests=5, window_seconds=900)

    success, message = PasswordAuthService.reset_password(db, request.token_or_code, request.new_password)

    return ResetPasswordResponse(
        success=success,
        message=message,
    )
