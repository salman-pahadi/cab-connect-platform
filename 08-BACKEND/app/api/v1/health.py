"""Health check endpoints."""

from datetime import datetime
from typing import Any

from fastapi import APIRouter, status

from app.config import settings

router = APIRouter()


@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check() -> dict[str, Any]:
    """
    Comprehensive health check endpoint.

    Returns:
        Health status including database connectivity
    """
    return {
        "status": "healthy",
        "version": settings.API_VERSION,
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.utcnow().isoformat(),
        "database": "not_configured",  # Will be updated in Milestone 3
    }


@router.get("/health/ping", status_code=status.HTTP_200_OK)
async def ping() -> dict[str, str]:
    """
    Simple ping endpoint for quick health checks.

    Returns:
        Pong response
    """
    return {"message": "pong"}
