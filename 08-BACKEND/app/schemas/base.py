"""Base Pydantic schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class BaseSchema(BaseModel):
    """Base schema with common configuration."""

    model_config = ConfigDict(from_attributes=True)


class TimestampSchema(BaseSchema):
    """Schema with timestamp fields."""

    created_at: datetime
    updated_at: datetime


class IDSchema(BaseSchema):
    """Schema with ID field."""

    id: UUID


class ResponseSchema(BaseSchema):
    """Standard API response schema."""

    success: bool = True
    message: str | None = None
    data: dict | None = None


class ErrorSchema(BaseSchema):
    """Standard API error schema."""

    success: bool = False
    error: str
    detail: str | None = None
