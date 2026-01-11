"""Pytest configuration and fixtures."""

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


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
