"""
Ride API endpoints.
"""
# mypy: disable-error-code="arg-type"


from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db
from app.models.driver import Driver
from app.models.user import User, UserRole
from app.schemas.ride import (
    RatingCreate,
    RatingResponse,
    RideCompleted,
    RideEstimate,
    RideEstimateResponse,
    RideListResponse,
    RideRequest,
    RideResponse,
    RideStarted,
    RideUpdate,
)
from app.services.ride_service import RideService

router = APIRouter(prefix="/v1/rides", tags=["rides"])
ride_service = RideService()


@router.post("/request", response_model=RideResponse, status_code=status.HTTP_201_CREATED)
async def request_ride(
    ride_data: RideRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Request a ride.

    - **ride_type**: Type of ride (economy, comfort, premium)
    - **payment_method**: Payment method (cash, card, wallet, upi)
    - **pickup_latitude/longitude**: Pickup coordinates
    - **dropoff_latitude/longitude**: Dropoff coordinates
    """
    if current_user.role != UserRole.PASSENGER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only passengers can request rides",
        )

    try:
        ride = ride_service.create_ride(db, current_user.id, ride_data)
        return ride
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e


@router.post("/estimate", response_model=RideEstimateResponse)
async def estimate_ride(
    estimate_data: RideEstimate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Estimate fare for a ride without creating a request.

    Returns estimated distance, duration, and fare breakdown.
    """
    if current_user.role != UserRole.PASSENGER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only passengers can estimate fares",
        )

    try:
        estimate = ride_service.estimate_fare(db, estimate_data)
        return estimate
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e


@router.post("/{ride_id}/accept", response_model=RideResponse)
async def accept_ride(
    ride_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Driver accepts a ride.
    """
    if current_user.role != UserRole.DRIVER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can accept rides",
        )

    # Get driver record
    driver = db.query(Driver).filter(Driver.phone_number == current_user.phone_number).first()
    if not driver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Driver profile not found",
        )

    try:
        ride = ride_service.accept_ride(db, ride_id, driver.id)
        return ride
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        ) from e


@router.post("/{ride_id}/start", response_model=RideResponse)
async def start_ride(
    ride_id: int,
    start_data: RideStarted,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Start ride (verify passenger with OTP).
    Driver calls this when passenger is picked up.
    """
    if current_user.role != UserRole.DRIVER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can start rides",
        )

    try:
        ride = ride_service.start_ride(db, ride_id, start_data.otp_code)
        return ride
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e


@router.post("/{ride_id}/complete", response_model=RideResponse)
async def complete_ride(
    ride_id: int,
    completion_data: RideCompleted,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Complete ride and calculate final fare.
    """
    if current_user.role != UserRole.DRIVER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can complete rides",
        )

    try:
        ride = ride_service.complete_ride(db, ride_id, completion_data)
        return ride
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e


@router.post("/{ride_id}/cancel", response_model=RideResponse)
async def cancel_ride(
    ride_id: int,
    ride_update: RideUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Cancel a ride.
    Can be cancelled by passenger or driver.
    """
    cancelled_by = "driver" if current_user.role == UserRole.DRIVER else "passenger"

    try:
        ride = ride_service.cancel_ride(
            db, ride_id, cancelled_by, ride_update.cancellation_reason
        )
        return ride
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e


@router.get("/{ride_id}", response_model=RideResponse)
async def get_ride(
    ride_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Get ride details.
    """
    ride = ride_service.get_ride(db, ride_id)
    if not ride:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ride not found",
        )

    # Check authorization
    if (
        ride.passenger_id != current_user.id
        and current_user.role != UserRole.ADMIN
    ):
        driver = db.query(Driver).filter(Driver.phone_number == current_user.phone_number).first()
        if not driver or ride.driver_id != driver.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this ride",
            )

    return ride


@router.get("/history/passenger", response_model=list[RideListResponse])
async def get_passenger_rides(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    """
    Get ride history for current passenger.
    """
    if current_user.role != UserRole.PASSENGER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only passengers can view their ride history",
        )

    rides = ride_service.get_rides_by_passenger(db, current_user.id, skip, limit)
    return rides


@router.get("/history/driver", response_model=list[RideListResponse])
async def get_driver_rides(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    """
    Get ride history for current driver.
    """
    if current_user.role != UserRole.DRIVER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can view their ride history",
        )

    driver = db.query(Driver).filter(Driver.phone_number == current_user.phone_number).first()
    if not driver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Driver profile not found",
        )

    rides = ride_service.get_rides_by_driver(db, driver.id, skip, limit)
    return rides


@router.get("/available/pending", response_model=list[RideListResponse])
async def get_pending_rides(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = Query(50, ge=1, le=100),
):
    """
    Get pending rides available for drivers to accept.
    """
    if current_user.role != UserRole.DRIVER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only drivers can view pending rides",
        )

    rides = ride_service.get_pending_rides(db, limit)
    return rides


@router.post("/{ride_id}/rating", response_model=RatingResponse, status_code=status.HTTP_201_CREATED)
async def rate_ride(
    ride_id: int,
    rating_data: RatingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Rate a completed ride.
    Passenger rates driver or driver rates passenger.
    """
    try:
        rating_dict = rating_data.dict()
        rating = ride_service.add_rating(db, ride_id, current_user.id, rating_dict)
        return rating
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        ) from e
