"""
Pydantic schemas for ride endpoints.
"""

from datetime import datetime

from pydantic import BaseModel, Field, validator

from app.models.ride import PaymentMethod, RideStatus, RideType


# Location Schemas
class LocationCreate(BaseModel):
    """Schema for creating a location."""

    latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
    address: str = Field(..., min_length=1, max_length=500, description="Address string")
    place_name: str | None = Field(None, max_length=255, description="Place/landmark name")
    floor_number: str | None = Field(None, max_length=50, description="Floor number")
    building_name: str | None = Field(None, max_length=255, description="Building name")
    landmark: str | None = Field(None, max_length=255, description="Nearby landmark")
    special_instructions: str | None = Field(None, max_length=1000, description="Special pickup/dropoff instructions")

    @validator("latitude")
    def validate_latitude(cls, v: float) -> float:
        """Validate latitude is within valid range."""
        if not -90 <= v <= 90:
            raise ValueError("Latitude must be between -90 and 90")
        return v

    @validator("longitude")
    def validate_longitude(cls, v: float) -> float:
        """Validate longitude is within valid range."""
        if not -180 <= v <= 180:
            raise ValueError("Longitude must be between -180 and 180")
        return v


class LocationResponse(LocationCreate):
    """Schema for location response."""

    id: int
    ride_id: int
    accuracy_meters: float | None = None
    altitude: float | None = None
    speed_kmh: float | None = None
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
    driver_id: int | None = None
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
    paid_at: datetime | None = None

    class Config:
        from_attributes = True


# Rating Schemas
class RatingCreate(BaseModel):
    """Schema for creating a rating."""

    overall_rating: float = Field(..., ge=1, le=5, description="Overall rating (1-5)")
    cleanliness_rating: float | None = Field(None, ge=1, le=5)
    communication_rating: float | None = Field(None, ge=1, le=5)
    driving_rating: float | None = Field(None, ge=1, le=5)
    behavior_rating: float | None = Field(None, ge=1, le=5)
    review_text: str | None = Field(None, description="Review text")
    tags: str | None = Field(None, description="Comma-separated tags")


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
    pickup_latitude: float = Field(..., ge=-90, le=90, description="Pickup latitude")
    pickup_longitude: float = Field(..., ge=-180, le=180, description="Pickup longitude")
    pickup_address: str = Field(..., min_length=1, max_length=500, description="Pickup address")
    dropoff_latitude: float = Field(..., ge=-90, le=90, description="Dropoff latitude")
    dropoff_longitude: float = Field(..., ge=-180, le=180, description="Dropoff longitude")
    dropoff_address: str = Field(..., min_length=1, max_length=500, description="Dropoff address")
    notes: str | None = Field(None, max_length=1000, description="Additional notes for driver")
    special_requests: str | None = Field(None, max_length=1000, description="Special requests")
    is_ride_shared: bool = Field(default=False, description="Allow ride sharing")

    @validator("pickup_latitude", "dropoff_latitude")
    def validate_latitude(cls, v: float) -> float:
        """Validate latitude is within valid range."""
        if not -90 <= v <= 90:
            raise ValueError("Latitude must be between -90 and 90")
        return v

    @validator("pickup_longitude", "dropoff_longitude")
    def validate_longitude(cls, v: float) -> float:
        """Validate longitude is within valid range."""
        if not -180 <= v <= 180:
            raise ValueError("Longitude must be between -180 and 180")
        return v

    @validator("pickup_address", "dropoff_address")
    def validate_address(cls, v: str) -> str:
        """Validate address is not empty."""
        if not v or not v.strip():
            raise ValueError("Address cannot be empty")
        return v.strip()


class RideUpdate(BaseModel):
    """Schema for updating a ride."""

    status: RideStatus | None = None
    notes: str | None = None
    cancellation_reason: str | None = None


class RideAccept(BaseModel):
    """Schema for driver accepting a ride."""

    driver_id: int = Field(..., description="Driver ID")
    estimated_arrival_minutes: int | None = Field(None, description="Estimated arrival in minutes")


class RideStarted(BaseModel):
    """Schema for marking ride as started."""

    otp_code: str = Field(..., description="OTP code for verification")


class RideCompleted(BaseModel):
    """Schema for marking ride as completed."""

    actual_distance_km: float = Field(..., gt=0, description="Actual distance traveled")
    actual_duration_minutes: int = Field(..., gt=0, description="Actual ride duration")
    actual_fare: float = Field(..., gt=0, description="Actual fare amount")

    @validator("actual_distance_km")
    def validate_distance(cls, v: float) -> float:
        """Validate distance is positive and reasonable (max 1000km)."""
        if v <= 0:
            raise ValueError("Distance must be positive")
        if v > 1000:
            raise ValueError("Distance seems unreasonably high (max 1000km)")
        return v

    @validator("actual_duration_minutes")
    def validate_duration(cls, v: int) -> int:
        """Validate duration is positive and reasonable (max 24 hours)."""
        if v <= 0:
            raise ValueError("Duration must be positive")
        if v > 1440:  # 24 hours
            raise ValueError("Duration seems unreasonably high (max 24 hours)")
        return v

    @validator("actual_fare")
    def validate_fare(cls, v: float) -> float:
        """Validate fare is positive and reasonable."""
        if v <= 0:
            raise ValueError("Fare must be positive")
        if v > 10000:  # Reasonable max fare in FJD
            raise ValueError("Fare seems unreasonably high")
        return v


class RideResponse(BaseModel):
    """Schema for ride response."""

    id: int
    ride_number: str
    passenger_id: int
    driver_id: int | None = None
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
    actual_fare: float | None = None
    final_fare: float | None = None
    discount_applied: float
    estimated_distance_km: float | None = None
    actual_distance_km: float | None = None
    estimated_duration_minutes: int | None = None
    actual_duration_minutes: int | None = None
    requested_at: datetime
    accepted_at: datetime | None = None
    pickup_time: datetime | None = None
    completed_at: datetime | None = None
    cancelled_at: datetime | None = None
    notes: str | None = None
    special_requests: str | None = None
    locations: list[LocationResponse] = []
    payments: list[PaymentResponse] = []
    ratings: list[RatingResponse] = []

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
    actual_fare: float | None = None
    requested_at: datetime
    completed_at: datetime | None = None

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
