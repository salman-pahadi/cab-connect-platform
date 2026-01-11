"""
Location model for tracking ride waypoints and locations.
"""

from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import Column, DateTime, Enum as SQLEnum, Float, ForeignKey, Integer, String

from app.models.base import Base


class LocationType(str, Enum):
    """Location type enumeration."""

    PICKUP = "pickup"
    DROPOFF = "dropoff"
    WAYPOINT = "waypoint"
    CURRENT = "current"  # Real-time location during ride


class Location(Base):
    """Location model for storing ride pickup, dropoff, and waypoint coordinates."""

    __tablename__ = "locations"

    # Identifiers
    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, ForeignKey("rides.id"), nullable=False, index=True)

    # Location Details
    location_type = Column(SQLEnum(LocationType), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    address = Column(String(500), nullable=True)
    place_name = Column(String(200), nullable=True)

    # Additional Info
    floor_number = Column(String(20), nullable=True)
    building_name = Column(String(200), nullable=True)
    landmark = Column(String(500), nullable=True)
    special_instructions = Column(String(500), nullable=True)

    # For real-time tracking during ride
    accuracy_meters = Column(Float, nullable=True)  # GPS accuracy
    altitude = Column(Float, nullable=True)
    speed_kmh = Column(Float, nullable=True)

    # Timestamps
    recorded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    sequence_order = Column(Integer, nullable=False, default=0)  # Order in route

    def __repr__(self) -> str:
        return f"<Location {self.location_type} - ({self.latitude}, {self.longitude})>"
