/**
 * Authentication Redux slice
 * Manages user authentication state, tokens, and user data
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  phoneNumber: string;
  email?: string;
  fullName: string;
  profilePictureUrl?: string;
  role: 'passenger' | 'driver' | 'admin';
  status: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
}

export interface Driver extends User {
  vehicleMake?: string;
  vehicleModel?: string;
  vehiclePlateNumber?: string;
  vehicleType?: string;
  rating: number;
  totalRides: string;
  completedRides: string;
  availability: 'online' | 'offline' | 'on_ride';
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | Driver | null;
  userType: 'passenger' | 'driver' | null;
  isLoading: boolean;
  error: string | null;
  isNewUser: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  userType: null,
  isLoading: false,
  error: null,
  isNewUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // OTP sent successfully
    otpSent: (state) => {
      state.isLoading = false;
      state.error = null;
    },

    // Login success after OTP verification
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User | Driver;
        userType: 'passenger' | 'driver';
        isNewUser: boolean;
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isNewUser = action.payload.isNewUser;
      state.isLoading = false;
      state.error = null;
    },

    // Set credentials (for password-based login)
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          id: string;
          email: string | null;
          phone_number: string | null;
          full_name: string;
          user_type: 'passenger' | 'driver';
          is_verified: boolean;
        };
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.token;
      state.user = {
        id: action.payload.user.id,
        phoneNumber: action.payload.user.phone_number || '',
        email: action.payload.user.email || undefined,
        fullName: action.payload.user.full_name,
        role: action.payload.user.user_type,
        status: 'active',
        isPhoneVerified: action.payload.user.phone_number ? action.payload.user.is_verified : false,
        isEmailVerified: action.payload.user.email ? action.payload.user.is_verified : false,
      };
      state.userType = action.payload.user.user_type;
      state.isNewUser = !action.payload.user.is_verified;
      state.isLoading = false;
      state.error = null;
    },

    // Registration complete
    registrationComplete: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User | Driver;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isNewUser = false;
      state.isLoading = false;
      state.error = null;
    },

    // Update user data
    updateUser: (state, action: PayloadAction<Partial<User | Driver>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.userType = null;
      state.isNewUser = false;
      state.error = null;
    },

    // Restore session from storage
    restoreSession: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User | Driver;
        userType: 'passenger' | 'driver';
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isNewUser = false;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  otpSent,
  loginSuccess,
  setCredentials,
  registrationComplete,
  updateUser,
  logout,
  restoreSession,
} = authSlice.actions;

export default authSlice.reducer;
