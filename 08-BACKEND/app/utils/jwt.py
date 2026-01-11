"""JWT (JSON Web Token) utility functions."""

from datetime import datetime, timedelta
from typing import Optional

import jwt
from fastapi import HTTPException, status

from app.core.config import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a new JWT access token.

    Args:
        data: Data to encode in the token
        expires_delta: Token expiration time delta

    Returns:
        Encoded JWT token string
    """
    to_encode = data.copy()

    # Set expiration time
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    # Encode JWT
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

    return encoded_jwt


def create_refresh_token(data: dict) -> str:
    """
    Create a new JWT refresh token.

    Args:
        data: Data to encode in the token

    Returns:
        Encoded JWT refresh token string
    """
    to_encode = data.copy()

    # Refresh tokens have longer expiration (7 days)
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire, "type": "refresh"})

    # Encode JWT
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

    return encoded_jwt


def decode_token(token: str) -> dict:
    """
    Decode and verify a JWT token.

    Args:
        token: JWT token string to decode

    Returns:
        Decoded token payload

    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def verify_token(token: str, token_type: str = "access") -> dict:
    """
    Verify a JWT token and return its payload.

    Args:
        token: JWT token string
        token_type: Expected token type ("access" or "refresh")

    Returns:
        Token payload

    Raises:
        HTTPException: If token is invalid, expired, or wrong type
    """
    payload = decode_token(token)

    # Verify token type if specified
    if token_type == "refresh":
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
            )

    return payload


def get_user_from_token(token: str) -> dict:
    """
    Extract user information from a JWT token.

    Args:
        token: JWT token string

    Returns:
        Dictionary containing user information (user_id, phone_number, role)

    Raises:
        HTTPException: If token is invalid or expired
    """
    payload = decode_token(token)

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    return {
        "user_id": user_id,
        "phone_number": payload.get("phone_number"),
        "role": payload.get("role"),
    }


def create_token_for_user(user_id: str, phone_number: str, role: str) -> str:
    """
    Create an access token for a user.

    Args:
        user_id: User ID
        phone_number: User phone number
        role: User role (passenger, driver, admin)

    Returns:
        JWT access token string
    """
    token_data = {
        "user_id": user_id,
        "phone_number": phone_number,
        "role": role,
    }

    return create_access_token(token_data)


def create_tokens_for_user(user_id: str, phone_number: str, role: str) -> dict:
    """
    Create both access and refresh tokens for a user.

    Args:
        user_id: User ID
        phone_number: User phone number
        role: User role (passenger, driver, admin)

    Returns:
        Dictionary with access_token and refresh_token
    """
    token_data = {
        "user_id": user_id,
        "phone_number": phone_number,
        "role": role,
    }

    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }
