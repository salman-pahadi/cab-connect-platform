"""
Pydantic schemas for ride endpoints.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field

from app.models.ride import RideStatus, RideType, PaymentMethod


# Location Schemas
class LocationCreate(BaseModel):
    """Schema for creating a location."""

    latitude: float = Field(..., description="Latitude coordinate")
    longitude: float = Field(..., description="Longitude coordinate")
    address: str = Field(..., description="Address string")
    place_name: Optional[str] = Field(None, description="Place/landmark name")
    floor_number: Optional[str] = Field(None, description="Floor number")
    building_name: Optional[str] = Field(None, description="Building name")
    landmark: Optional[str] = Field(None, description="Nearby landmark")
    special_instructions: Optional[str] = Field(None, description="Special pickup/dropoff instructions")


class LocationResponse(LocationCreate):
    """Schema for location response."""

    id: int
    ride_id: int
    accuracy_meters: Optional[float] = None
    altitude: Optional[float] = None
    speed_kmh: Optional[float] = None
    recorded_at: datetime
    sequence_order: int

    class Config:
        from_attributes = True


# Payment Schemas
class PaymentResponse(BaseModel):
    """Schema for payment response."""

    id: int
    transaction_id: str
    ride_id: int
    passenger_id: int
    driver_id: Optional[int] = None
    amount: float
    currency: str
    payment_method: str
    status: str
    base_fare: float
    distance_charge: float
    time_charge: float
    surge_charge: float
    tax: float
    discount: float
    tips: float
    created_at: datetime
    paid_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Rating Schemas
class RatingCreate(BaseModel):
    """Schema for creating a rating."""

    overall_rating: float = Field(..., ge=1, le=5, description="Overall rating (1-5)")
    cleanliness_rating: Optional[float] = Field(None, ge=1, le=5)
    communication_rating: Optional[float] = Field(None, ge=1, le=5)
    driving_rating: Optional[float] = Field(None, ge=1, le=5)
    behavior_rating: Optional[float] = Field(None, ge=1, le=5)
    review_text: Optional[str] = Field(None, description="Review text")
    tags: Optional[str] = Field(None, description="Comma-separated tags")


class RatingResponse(RatingCreate):
    """Schema for rating response."""

    id: int
    ride_id: int
    rater_id: int
    ratee_type: str
    ratee_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Ride Schemas
class RideRequest(BaseModel):
    """Schema for creating a ride request."""

    ride_type: RideType = Field(default=RideType.ECONOMY)
    payment_method: PaymentMethod = Field(default=PaymentMethod.CASH)
    pickup_latitude: float = Field(..., description="Pickup latitude")
    pickup_longitude: float = Field(..., description="Pickup longitude")
    pickup_address: str = Field(..., description="Pickup address")
    dropoff_latitude: float = Field(..., description="Dropoff latitude")
    dropoff_longitude: float = Field(..., description="Dropoff longitude")
    dropoff_address: str = Field(..., description="Dropoff address")
    notes: Optional[str] = Field(None, description="Additional notes for driver")
    special_requests: Optional[str] = Field(None, description="Special requests")
    is_ride_shared: bool = Field(default=False, description="Allow ride sharing")


class RideUpdate(BaseModel):
    """Schema for updating a ride."""

    status: Optional[RideStatus] = None
    notes: Optional[str] = None
    cancellation_reason: Optional[str] = None


class RideAccept(BaseModel):
    """Schema for driver accepting a ride."""

    driver_id: int = Field(..., description="Driver ID")
    estimated_arrival_minutes: Optional[int] = Field(None, description="Estimated arrival in minutes")


class RideStarted(BaseModel):
    """Schema for marking ride as started."""

    otp_code: str = Field(..., description="OTP code for verification")


class RideCompleted(BaseModel):
    """Schema for marking ride as completed."""

    actual_distance_km: float = Field(..., description="Actual distance traveled")
    actual_duration_minutes: int = Field(..., description="Actual ride duration")
    actual_fare: float = Field(..., description="Actual fare amount")


class RideResponse(BaseModel):
    """Schema for ride response."""

    id: int
    ride_number: str
    passenger_id: int
    driver_id: Optional[int] = None
    ride_type: str
    status: str
    payment_method: str
    pickup_latitude: float
    pickup_longitude: float
    pickup_address: str
    dropoff_latitude: float
    dropoff_longitude: float
    dropoff_address: str
    estimated_fare: float
    actual_fare: Optional[float] = None
    final_fare: Optional[float] = None
    discount_applied: float
    estimated_distance_km: Optional[float] = None
    actual_distance_km: Optional[float] = None
    estimated_duration_minutes: Optional[int] = None
    actual_duration_minutes: Optional[int] = None
    requested_at: datetime
    accepted_at: Optional[datetime] = None
    pickup_time: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    notes: Optional[str] = None
    special_requests: Optional[str] = None
    locations: List[LocationResponse] = []
    payments: List[PaymentResponse] = []
    ratings: List[RatingResponse] = []

    class Config:
        from_attributes = True


class RideListResponse(BaseModel):
    """Schema for ride list response."""

    id: int
    ride_number: str
    status: str
    pickup_address: str
    dropoff_address: str
    estimated_fare: float
    actual_fare: Optional[float] = None
    requested_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class RideEstimate(BaseModel):
    """Schema for ride fare estimation."""

    pickup_latitude: float
    pickup_longitude: float
    dropoff_latitude: float
    dropoff_longitude: float
    ride_type: RideType = RideType.ECONOMY


class RideEstimateResponse(BaseModel):
    """Schema for ride estimate response."""

    estimated_distance_km: float
    estimated_duration_minutes: int
    base_fare: float
    distance_charge: float
    time_charge: float
    surge_multiplier: float = 1.0
    estimated_total: float
