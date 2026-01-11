"""Health endpoint tests."""

import pytest
from fastapi import status
from fastapi.testclient import TestClient


def test_root_endpoint(client: TestClient):
    """Test root endpoint returns welcome message."""
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["message"] == "Welcome to Cab Connect API"
    assert "version" in data
    assert "docs" in data


def test_health_check(client: TestClient):
    """Test basic health check endpoint."""
    response = client.get("/health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_api_health_check(client: TestClient):
    """Test API v1 health check endpoint."""
    response = client.get("/api/v1/health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "healthy"
    assert data["version"] == "1.0.0"
    assert "timestamp" in data
    assert "database" in data


def test_health_ping(client: TestClient):
    """Test ping endpoint."""
    response = client.get("/api/v1/health/ping")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["message"] == "pong"


def test_404_not_found(client: TestClient):
    """Test 404 error handling."""
    response = client.get("/nonexistent")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    data = response.json()
    assert "detail" in data
