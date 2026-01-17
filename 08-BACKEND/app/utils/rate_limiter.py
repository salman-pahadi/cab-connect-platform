"""Rate limiting utilities for API endpoints."""

import time
from collections import defaultdict

from fastapi import HTTPException, Request, status


class RateLimiter:
    """Simple in-memory rate limiter."""

    def __init__(self):
        """Initialize rate limiter with storage."""
        # Format: {key: [(timestamp1, timestamp2, ...), max_requests, window_seconds]}
        self._storage: dict[str, tuple[list, int, int]] = defaultdict(lambda: ([], 0, 0))

    def check_rate_limit(
        self,
        key: str,
        max_requests: int,
        window_seconds: int,
    ) -> None:
        """
        Check if request exceeds rate limit.

        Args:
            key: Unique identifier for rate limit (e.g., IP address, user ID)
            max_requests: Maximum number of requests allowed
            window_seconds: Time window in seconds

        Raises:
            HTTPException: If rate limit exceeded
        """
        current_time = time.time()
        timestamps, _, _ = self._storage[key]

        # Remove old timestamps outside the window
        cutoff_time = current_time - window_seconds
        timestamps[:] = [ts for ts in timestamps if ts > cutoff_time]

        # Check if limit exceeded
        if len(timestamps) >= max_requests:
            retry_after = int(timestamps[0] + window_seconds - current_time) + 1
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded. Try again in {retry_after} seconds.",
                headers={"Retry-After": str(retry_after)},
            )

        # Add current request
        timestamps.append(current_time)
        self._storage[key] = (timestamps, max_requests, window_seconds)

    def reset(self, key: str) -> None:
        """Reset rate limit for a specific key."""
        if key in self._storage:
            del self._storage[key]


# Global rate limiter instance
rate_limiter = RateLimiter()


def get_client_ip(request: Request) -> str:
    """
    Extract client IP address from request.

    Args:
        request: FastAPI request object

    Returns:
        Client IP address
    """
    # Check for X-Forwarded-For header (proxy/load balancer)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # Take the first IP in the chain
        return forwarded_for.split(",")[0].strip()

    # Check for X-Real-IP header
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip.strip()

    # Fall back to direct client IP
    if request.client:
        return request.client.host

    return "unknown"


def rate_limit_by_ip(
    request: Request,
    max_requests: int,
    window_seconds: int,
) -> None:
    """
    Rate limit by IP address.

    Args:
        request: FastAPI request object
        max_requests: Maximum requests allowed
        window_seconds: Time window in seconds

    Raises:
        HTTPException: If rate limit exceeded
    """
    # Skip rate limiting for OPTIONS requests (CORS preflight)
    if request.method == "OPTIONS":
        return
    
    client_ip = get_client_ip(request)
    key = f"ip:{client_ip}"
    rate_limiter.check_rate_limit(key, max_requests, window_seconds)


def rate_limit_by_user(
    user_id: str,
    action: str,
    max_requests: int,
    window_seconds: int,
) -> None:
    """
    Rate limit by user ID and action.

    Args:
        user_id: User identifier
        action: Action being rate limited (e.g., "signup", "verify_email")
        max_requests: Maximum requests allowed
        window_seconds: Time window in seconds

    Raises:
        HTTPException: If rate limit exceeded
    """
    key = f"user:{user_id}:{action}"
    rate_limiter.check_rate_limit(key, max_requests, window_seconds)


def rate_limit_by_identifier(
    identifier: str,
    action: str,
    max_requests: int,
    window_seconds: int,
) -> None:
    """
    Rate limit by email/phone identifier.

    Args:
        identifier: Email or phone number
        action: Action being rate limited
        max_requests: Maximum requests allowed
        window_seconds: Time window in seconds

    Raises:
        HTTPException: If rate limit exceeded
    """
    key = f"identifier:{identifier}:{action}"
    rate_limiter.check_rate_limit(key, max_requests, window_seconds)
