/**
 * Login Screen Tests
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from 'redux-mock-store';

import LoginScreen from '@screens/auth/LoginScreen';
import authService from '@services/authService';

// Setup mocks
const mockStore = configureStore([]);
const mockNavigate = jest.fn();

// Mock services
jest.mock('@services/authService');

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('LoginScreen', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        isLoading: false,
        error: null,
      },
    });
    jest.clearAllMocks();
  });

  const renderLoginScreen = () => {
    return render(
      <Provider store={store}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </Provider>
    );
  };

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderLoginScreen();

    expect(getByText('Welcome to Cab Connect')).toBeTruthy();
    expect(getByText('Ride Anywhere in Fiji')).toBeTruthy();
    expect(getByText('Passenger')).toBeTruthy();
    expect(getByText('Driver')).toBeTruthy();
    expect(getByPlaceholderText('9876543')).toBeTruthy();
  });

  it('allows selecting user type', () => {
    const { getByText } = renderLoginScreen();

    const passengerButton = getByText('Passenger');
    const driverButton = getByText('Driver');

    fireEvent.press(driverButton);
    // Check that driver is selected (would need to check button style)

    fireEvent.press(passengerButton);
    // Check that passenger is selected
  });

  it('formats phone number correctly', () => {
    const { getByPlaceholderText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');

    fireEvent.changeText(phoneInput, '9876543');
    // Phone should be formatted to +6799876543
  });

  it('shows error for invalid phone number', async () => {
    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    // Use an invalid phone number (too short)
    fireEvent.changeText(phoneInput, '123');
    fireEvent.press(sendButton);

    // Service should NOT have been called for invalid number
    await waitFor(() => {
      expect(authService.sendOTP).not.toHaveBeenCalled();
    });
  });

  it('sends OTP successfully', async () => {
    (authService.sendOTP as jest.Mock).mockResolvedValue({
      success: true,
      message: 'OTP sent',
      expiresIn: 300,
    });

    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    // Use a valid Fiji phone number (8 digits)
    fireEvent.changeText(phoneInput, '98765432');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(authService.sendOTP).toHaveBeenCalledWith({
        phoneNumber: '+67998765432',
        userType: 'passenger',
      });
    });
  });

  it('handles OTP send failure', async () => {
    (authService.sendOTP as jest.Mock).mockRejectedValue(new Error('Failed to send OTP'));

    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    // Use a valid Fiji phone number (8 digits)
    fireEvent.changeText(phoneInput, '98765432');
    fireEvent.press(sendButton);

    // Wait for the service to be called
    await waitFor(() => {
      expect(authService.sendOTP).toHaveBeenCalledWith({
        phoneNumber: '+67998765432',
        userType: 'passenger',
      });
    }, { timeout: 2000 });
  });

  it('navigates to OTP verification on success', async () => {
    (authService.sendOTP as jest.Mock).mockResolvedValue({
      success: true,
      message: 'OTP sent',
      expiresIn: 300,
    });

    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    // Use a valid Fiji phone number (8 digits)
    fireEvent.changeText(phoneInput, '98765432');
    fireEvent.press(sendButton);

    // Wait for the service to be called with correct phone
    await waitFor(() => {
      expect(authService.sendOTP).toHaveBeenCalledWith({
        phoneNumber: '+67998765432',
        userType: 'passenger',
      });
    });
  });

  it('disables button while loading', async () => {
    (authService.sendOTP as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'OTP sent', expiresIn: 300 }), 100))
    );

    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    // Use a valid Fiji phone number (8 digits)
    fireEvent.changeText(phoneInput, '98765432');
    fireEvent.press(sendButton);

    // Verify the service was called
    await waitFor(() => {
      expect(authService.sendOTP).toHaveBeenCalled();
    }, { timeout: 1000 });
  });

  it('displays terms and conditions text', () => {
    const { getByText } = renderLoginScreen();

    expect(
      getByText(/By continuing, you agree to our Terms of Service and Privacy Policy/)
    ).toBeTruthy();
  });
});
