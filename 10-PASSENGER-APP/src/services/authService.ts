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

export interface LoginRequest {
  identifier: string; // email or phone number
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: {
    id: string;
    email: string | null;
    phone_number: string | null;
    full_name: string;
    user_type: 'passenger' | 'driver';
    is_verified: boolean;
  };
}

export interface SignupRequest {
  identifier: string; // email or phone number
  password: string;
  full_name: string;
  user_type: 'passenger' | 'driver';
}

export interface SignupResponse {
  success: boolean;
  message: string;
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string | null;
    phone_number: string | null;
    full_name: string;
    role: string;
    is_email_verified: boolean;
    is_phone_verified: boolean;
  };
  verification_required: {
    email: boolean;
    phone: boolean;
  };
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyPhoneRequest {
  code: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
  expires_in: number;
}

export interface ForgotPasswordRequest {
  identifier: string; // email or phone number
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  expires_in: number;
}

export interface ResetPasswordRequest {
  identifier: string;
  token?: string; // for email reset
  code?: string; // for phone reset
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

class AuthService {
  /**
   * Send OTP to phone number
   * In DEV_MODE: Always succeeds and logs the test OTP to console
   * In PRODUCTION: Calls the real backend API
   */
  async sendOTP(data: SendOTPRequest): Promise<SendOTPResponse> {
    if (DEV_MODE) {
      // Development mode: Simulate successful OTP send (TEST_OTP: 123456)
      
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
      // Development mode: Auto-verify with TEST_OTP (123456)
      
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
   * Signup with email/phone + password
   * Calls POST /api/v1/auth/signup
   */
  async signup(data: SignupRequest): Promise<SignupResponse> {
    // Detect if identifier is email or phone
    const isEmail = data.identifier.includes('@');
    
    const payload: any = {
      password: data.password,
      full_name: data.full_name,
      user_type: data.user_type,
    };
    
    // Send either email or phone_number based on identifier type
    if (isEmail) {
      payload.email = data.identifier;
    } else {
      payload.phone_number = data.identifier;
    }
    
    const response = await apiClient.post<SignupResponse>('/auth/signup', payload);
    
    // Set auth token for subsequent requests
    if (response.access_token) {
      this.setAuthToken(response.access_token);
    }
    
    return response;
  }

  /**
   * Login with email/phone + password
   * Calls POST /api/v1/auth/login
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      identifier: data.identifier,
      password: data.password,
    });
    
    // Set auth token for subsequent requests
    if (response.access_token) {
      this.setAuthToken(response.access_token);
    }
    
    return response;
  }

  /**
   * Verify email with token
   * Calls POST /api/v1/auth/verify-email
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyResponse> {
    const response = await apiClient.post<VerifyResponse>('/auth/verify-email', {
      token: data.token,
    });
    return response;
  }

  /**
   * Verify phone with OTP code
   * Calls POST /api/v1/auth/verify-phone
   */
  async verifyPhone(data: VerifyPhoneRequest): Promise<VerifyResponse> {
    const response = await apiClient.post<VerifyResponse>('/auth/verify-phone', {
      code: data.code,
    });
    return response;
  }

  /**
   * Resend verification code
   * Calls POST /api/v1/auth/resend-verification
   */
  async resendVerification(): Promise<ResendVerificationResponse> {
    const response = await apiClient.post<ResendVerificationResponse>('/auth/resend-verification');
    return response;
  }

  /**
   * Request password reset
   * Calls POST /api/v1/auth/forgot-password
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', {
      identifier: data.identifier,
    });
    return response;
  }

  /**
   * Reset password with code/token
   * Calls POST /api/v1/auth/reset-password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', {
      identifier: data.identifier,
      token: data.token,
      code: data.code,
      new_password: data.new_password,
    });
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
      // Development mode: Return mock user
      
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
    apiClient.setAuthToken(token);
  }
}

export default new AuthService();
