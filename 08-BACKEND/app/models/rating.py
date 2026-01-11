"""
Rating model for ride reviews and user ratings.
"""

from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.models.base import Base


class Rating(Base):
    """Rating model for storing ride ratings and reviews."""

    __tablename__ = "ratings"

    # Identifiers
    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, ForeignKey("rides.id"), nullable=False, index=True)

    # Rater & Ratee
    rater_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    ratee_type = Column(String(20), nullable=False)  # "driver" or "passenger"
    ratee_id = Column(Integer, nullable=False, index=True)  # driver_id or user_id

    # Rating Details
    overall_rating = Column(Float, nullable=False)  # 1-5 stars
    cleanliness_rating = Column(Float, nullable=True)  # 1-5
    communication_rating = Column(Float, nullable=True)  # 1-5
    driving_rating = Column(Float, nullable=True)  # 1-5 (for driver)
    behavior_rating = Column(Float, nullable=True)  # 1-5 (for passenger)

    # Review
    review_text = Column(Text, nullable=True)

    # Tags
    tags = Column(String(500), nullable=True)  # Comma-separated: "friendly,clean,professional"

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Admin
    is_flagged = Column(Integer, default=0)  # 0=not flagged, 1=flagged for review
    admin_notes = Column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<Rating {self.overall_rating} - Ride {self.ride_id}>"
