/**
 * Authentication service
 * Handles API calls for authentication
 */

import apiClient from './api';
import type { User } from '../types';

// ============================================================================
// DEVELOPMENT TESTING CONFIGURATION
// ============================================================================
const DEV_MODE = __DEV__; // Set to true for testing with static OTP
const TEST_OTP = '123456'; // Static OTP code for testing
const TEST_TOKEN = 'test_access_token_' + Date.now(); // Mock token for testing

// ============================================================================

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
   * In DEV_MODE: Always succeeds and logs the test OTP to console
   * In PRODUCTION: Calls the real backend API
   */
  async sendOTP(data: SendOTPRequest): Promise<SendOTPResponse> {
    if (DEV_MODE) {
      // Development mode: Simulate successful OTP send
      console.log('==============================================');
      console.log('📱 TEST MODE: SMS OTP SENDING BYPASSED');
      console.log('==============================================');
      console.log(`Phone: ${data.phoneNumber}`);
      console.log(`User Type: ${data.userType}`);
      console.log(`Test OTP Code: ${TEST_OTP}`);
      console.log('==============================================');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        message: `Test OTP is ${TEST_OTP}`,
        expiresIn: 300,
      };
    }

    // Production mode: Real API call
    const response = await apiClient.post<SendOTPResponse>('/auth/send-otp', {
      phone_number: data.phoneNumber,
      user_type: data.userType,
    });
    return response;
  }

  /**
   * Verify OTP and log in
   * In DEV_MODE: Accepts test OTP (123456) or calls real API
   * In PRODUCTION: Always calls real API
   */
  async verifyOTP(data: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    if (DEV_MODE && data.otp === TEST_OTP) {
      // Development mode: Test OTP accepted
      console.log('==============================================');
      console.log('✅ TEST MODE: OTP VERIFIED SUCCESSFULLY');
      console.log('==============================================');
      console.log(`Phone: ${data.phoneNumber}`);
      console.log(`OTP: ${data.otp}`);
      console.log(`User Type: ${data.userType}`);
      console.log(`Mock Token: ${TEST_TOKEN}`);
      console.log('==============================================');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        success: true,
        message: 'OTP verified successfully (test mode)',
        accessToken: TEST_TOKEN,
        userId: 'test_user_' + data.phoneNumber,
        isNewUser: false, // Set to true if you want to test registration flow
      };
    }

    // Production mode OR incorrect test OTP: Real API call
    const response = await apiClient.post<VerifyOTPResponse>('/auth/verify-otp', {
      phone_number: data.phoneNumber,
      otp: data.otp,
      user_type: data.userType,
    });
    return response;
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
    return response;
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
    return response;
  }

  /**
   * Get current user from token
   * In DEV_MODE with TEST_TOKEN: Returns mock user data
   * In PRODUCTION: Calls real API
   */
  async getCurrentUser(token: string): Promise<User> {
    if (DEV_MODE && token.startsWith('test_access_token_')) {
      // Development mode: Return mock user data
      console.log('==============================================');
      console.log('👤 TEST MODE: RETURNING MOCK USER DATA');
      console.log('==============================================');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        id: '1',
        name: 'Test User',
        phone: '+6791234567',
        email: 'test@example.com',
      };
    }

    // Production mode: Real API call
    const response = await apiClient.get<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  /**
   * Set auth token for API client
   */
  setAuthToken(token: string | null) {
    if (token) {
      (apiClient as any).defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete (apiClient as any).defaults.headers.common['Authorization'];
    }
  }
}

export default new AuthService();
