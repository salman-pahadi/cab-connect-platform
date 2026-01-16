"""Pytest configuration and fixtures."""

import os

import pytest
from fastapi.testclient import TestClient

# Ensure tests use the dedicated test database before app import
os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+psycopg2://appuser:appsecret@localhost:5432/appdb_test",
)
# isort: split
import app.models  # noqa: F401, E402
from app.database.session import SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.models.base import Base  # noqa: E402
from app.models.user import User, UserRole, UserStatus  # noqa: E402


@pytest.fixture
def client(db):
    """Create test client with overridden database dependency."""
    from app.api.dependencies import get_db

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()



@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """Create all tables for the test session and drop them after."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db():
    """Provide a transactional database session for a test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = SessionLocal(bind=connection)
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture
def mock_db():
    """Mock database session."""
    # Placeholder for database mocking
    # Will be implemented when database is fully configured
    pass


@pytest.fixture
def auth_headers():
    """Create authentication headers for testing."""
    # Placeholder for auth headers
    # Will be implemented in Milestone 2 (Authentication)
    return {"Authorization": "Bearer test_token"}


@pytest.fixture
def passenger_user(db):
    """Create a test passenger user."""
    user = User(
        phone_number="1234567890",
        full_name="Test Passenger",
        role=UserRole.PASSENGER,
        status=UserStatus.ACTIVE,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def auth_token_passenger(passenger_user):
    """Generate JWT token for test passenger."""
    from app.utils.jwt import create_token_for_user

    token = create_token_for_user(
        str(passenger_user.id),
        passenger_user.phone_number,
        passenger_user.role.value
    )
    return token
