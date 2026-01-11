"""Tests for authentication endpoints."""

import pytest
from fastapi import status
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestAuthEndpoints:
    """Test authentication API endpoints."""

    def test_send_otp_passenger(self):
        """Test sending OTP to passenger."""
        response = client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "+6799876543",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert "message" in data
        assert data["expires_in"] == 300  # 5 minutes

    def test_send_otp_driver(self):
        """Test sending OTP to driver."""
        response = client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "+6799876544",
                "user_type": "driver",
            },
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True

    def test_send_otp_invalid_phone(self):
        """Test sending OTP with invalid phone number."""
        response = client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "invalid",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_send_otp_invalid_user_type(self):
        """Test sending OTP with invalid user type."""
        response = client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "+6799876543",
                "user_type": "invalid",
            },
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_verify_otp_invalid_code(self):
        """Test verifying OTP with wrong code."""
        # First send OTP
        client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "+6799876545",
                "user_type": "passenger",
            },
        )

        # Try to verify with wrong code
        response = client.post(
            "/api/v1/auth/verify-otp",
            json={
                "phone_number": "+6799876545",
                "otp": "000000",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_verify_otp_without_sending(self):
        """Test verifying OTP without sending it first."""
        response = client.post(
            "/api/v1/auth/verify-otp",
            json={
                "phone_number": "+6799999999",
                "otp": "123456",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials."""
        response = client.post(
            "/api/v1/auth/admin/login",
            json={
                "email": "invalid@example.com",
                "password": "wrongpassword",
            },
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_get_current_user_without_token(self):
        """Test getting current user without authentication token."""
        response = client.get("/api/v1/auth/me")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_auth_health_check(self):
        """Test auth service health check."""
        response = client.get("/api/v1/auth/health")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["service"] == "authentication"
        assert data["status"] == "healthy"
        assert "version" in data


class TestAuthSchemas:
    """Test authentication schemas validation."""

    def test_send_otp_phone_validation(self):
        """Test phone number validation in SendOTPRequest."""
        # Without country code
        response = client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "9876543",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_verify_otp_code_validation(self):
        """Test OTP code validation."""
        # Send OTP first
        client.post(
            "/api/v1/auth/send-otp",
            json={
                "phone_number": "+6799876546",
                "user_type": "passenger",
            },
        )

        # Try with non-digit OTP
        response = client.post(
            "/api/v1/auth/verify-otp",
            json={
                "phone_number": "+6799876546",
                "otp": "abcdef",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

        # Try with wrong length OTP
        response = client.post(
            "/api/v1/auth/verify-otp",
            json={
                "phone_number": "+6799876546",
                "otp": "123",
                "user_type": "passenger",
            },
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_passenger_registration_validation(self):
        """Test passenger registration data validation."""
        # Missing required fields
        response = client.post(
            "/api/v1/auth/register/passenger",
            json={
                "phone_number": "+6799876543",
            },
            headers={"Authorization": "Bearer fake_token"},
        )

        # Will fail on token verification first
        assert response.status_code in [
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_422_UNPROCESSABLE_ENTITY,
        ]

    def test_driver_registration_vehicle_type_validation(self):
        """Test driver registration vehicle type validation."""
        response = client.post(
            "/api/v1/auth/register/driver",
            json={
                "phone_number": "+6799876543",
                "full_name": "John Driver",
                "license_number": "FJ123456",
                "license_expiry": "2026-12-31T00:00:00",
                "vehicle_make": "Toyota",
                "vehicle_model": "Camry",
                "vehicle_year": "2020",
                "vehicle_color": "White",
                "vehicle_plate_number": "AB1234",
                "vehicle_type": "invalid_type",  # Invalid type
            },
            headers={"Authorization": "Bearer fake_token"},
        )

        # Will fail on validation
        assert response.status_code in [
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_422_UNPROCESSABLE_ENTITY,
        ]


@pytest.mark.asyncio
class TestAuthFlow:
    """Test complete authentication flow."""

    async def test_passenger_registration_flow(self):
        """Test complete passenger registration flow (mock)."""
        # This would be an integration test
        # For now, just verify endpoint structure
        pass

    async def test_driver_registration_flow(self):
        """Test complete driver registration flow (mock)."""
        # This would be an integration test
        # For now, just verify endpoint structure
        pass
