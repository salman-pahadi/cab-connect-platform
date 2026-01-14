"""
Payment model for handling ride transactions and payment records.
"""

from datetime import datetime
from enum import Enum

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy import Enum as SQLEnum

from app.models.base import BaseModel


class TransactionStatus(str, Enum):
    """Transaction status enumeration."""

    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    REFUNDED = "refunded"
    PROCESSING = "processing"


class PaymentStatus(str, Enum):
    """Payment status enumeration."""

    UNPAID = "unpaid"
    PAID = "paid"
    PARTIAL = "partial"
    REFUND_PENDING = "refund_pending"
    REFUNDED = "refunded"


class Payment(BaseModel):
    """Payment model for storing ride payment transactions."""

    __tablename__ = "payments"

    # Identifiers
    transaction_id = Column(String(100), unique=True, index=True, nullable=False)
    ride_id = Column(Integer, ForeignKey("rides.id"), nullable=False, index=True)

    # Payer Information
    passenger_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True, index=True)

    # Payment Details
    amount = Column(Float, nullable=False)
    currency = Column(String(3), default="INR", nullable=False)
    payment_method = Column(String(50), nullable=False)  # cash, card, upi, wallet
    status = Column(SQLEnum(TransactionStatus), default=TransactionStatus.PENDING)  # type: ignore

    # Breakdown
    base_fare = Column(Float, nullable=False)
    distance_charge = Column(Float, default=0.0)
    time_charge = Column(Float, default=0.0)
    surge_charge = Column(Float, default=0.0)
    tax = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    tips = Column(Float, default=0.0)

    # Gateway Information
    gateway_name = Column(String(100), nullable=True)  # Razorpay, PayU, etc.
    gateway_transaction_id = Column(String(200), nullable=True)
    gateway_response = Column(Text, nullable=True)  # JSON response from gateway

    # Refund Details
    refund_amount = Column(Float, default=0.0)
    refund_reason = Column(String(500), nullable=True)
    refund_transaction_id = Column(String(200), nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    paid_at = Column(DateTime, nullable=True)
    refunded_at = Column(DateTime, nullable=True)

    # Additional
    notes = Column(Text, nullable=True)
    receipt_url = Column(String(500), nullable=True)

    def __repr__(self) -> str:
        return f"<Payment {self.transaction_id} - {self.amount} {self.currency}>"
