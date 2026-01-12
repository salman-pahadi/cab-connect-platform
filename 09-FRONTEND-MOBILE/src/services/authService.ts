/**
 * Authentication service
 * Handles API calls for authentication
 */

import apiClient from './api';

export interface SendOTPRequest {
  phoneNumber: string;
  userType: 'passenger' | 'driver';
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  expiresIn: number;
}

export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
  userType: 'passenger' | 'driver';
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  accessToken: string;
  userId: string;
  isNewUser: boolean;
}

export interface PassengerRegistrationRequest {
  phoneNumber: string;
  fullName: string;
  email?: string;
  profilePictureUrl?: string;
}

export interface DriverRegistrationRequest {
  phoneNumber: string;
  fullName: string;
  email?: string;
  dateOfBirth?: string;
  profilePictureUrl?: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehiclePlateNumber: string;
  vehicleType: 'sedan' | 'suv' | 'mini_van' | 'luxury';
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankName?: string;
  bankBranch?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  userId: string;
  accessToken: string;
}

class AuthService {
  /**
   * Send OTP to phone number
   */
  async sendOTP(data: SendOTPRequest): Promise<SendOTPResponse> {
    const response = await apiClient.post<SendOTPResponse>('/auth/send-otp', {
      phone_number: data.phoneNumber,
      user_type: data.userType,
    });
    return response.data;
  }

  /**
   * Verify OTP and log in
   */
  async verifyOTP(data: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    const response = await apiClient.post<VerifyOTPResponse>('/auth/verify-otp', {
      phone_number: data.phoneNumber,
      otp: data.otp,
      user_type: data.userType,
    });
    return response.data;
  }

  /**
   * Complete passenger registration
   */
  async registerPassenger(
    data: PassengerRegistrationRequest,
    token: string
  ): Promise<RegistrationResponse> {
    const response = await apiClient.post<RegistrationResponse>(
      '/auth/register/passenger',
      {
        phone_number: data.phoneNumber,
        full_name: data.fullName,
        email: data.email,
        profile_picture_url: data.profilePictureUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  /**
   * Complete driver registration
   */
  async registerDriver(
    data: DriverRegistrationRequest,
    token: string
  ): Promise<RegistrationResponse> {
    const response = await apiClient.post<RegistrationResponse>(
      '/auth/register/driver',
      {
        phone_number: data.phoneNumber,
        full_name: data.fullName,
        email: data.email,
        date_of_birth: data.dateOfBirth,
        profile_picture_url: data.profilePictureUrl,
        license_number: data.licenseNumber,
        license_expiry: data.licenseExpiry,
        vehicle_make: data.vehicleMake,
        vehicle_model: data.vehicleModel,
        vehicle_year: data.vehicleYear,
        vehicle_color: data.vehicleColor,
        vehicle_plate_number: data.vehiclePlateNumber,
        vehicle_type: data.vehicleType,
        bank_account_name: data.bankAccountName,
        bank_account_number: data.bankAccountNumber,
        bank_name: data.bankName,
        bank_branch: data.bankBranch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  /**
   * Get current user from token
   */
  async getCurrentUser(token: string): Promise<any> {
    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  /**
   * Set auth token for API client
   */
  setAuthToken(token: string | null) {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }
}

export default new AuthService();
