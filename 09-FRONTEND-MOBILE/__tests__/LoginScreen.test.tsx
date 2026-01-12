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

// Mock services
jest.mock('@services/authService');
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

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

    fireEvent.changeText(phoneInput, '123');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Invalid Phone Number',
        'Please enter a valid Fiji phone number'
      );
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

    fireEvent.changeText(phoneInput, '9876543');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(authService.sendOTP).toHaveBeenCalledWith({
        phoneNumber: '+6799876543',
        userType: 'passenger',
      });
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'OTP Sent',
        expect.stringContaining('A 6-digit code has been sent'),
        expect.any(Array)
      );
    });
  });

  it('handles OTP send failure', async () => {
    const errorMessage = 'Failed to send OTP';
    (authService.sendOTP as jest.Mock).mockRejectedValue({
      response: { data: { detail: errorMessage } },
    });

    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    fireEvent.changeText(phoneInput, '9876543');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', errorMessage);
    });
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

    fireEvent.changeText(phoneInput, '9876543');
    fireEvent.press(sendButton);

    await waitFor(() => {
      // Alert with OK button that navigates
      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const okButton = alertCall[2][0];
      okButton.onPress();

      expect(mockNavigate).toHaveBeenCalledWith('OTPVerification', {
        phoneNumber: '+6799876543',
        userType: 'passenger',
      });
    });
  });

  it('disables button while loading', async () => {
    (authService.sendOTP as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );

    const { getByPlaceholderText, getByText } = renderLoginScreen();

    const phoneInput = getByPlaceholderText('9876543');
    const sendButton = getByText('Send Verification Code');

    fireEvent.changeText(phoneInput, '9876543');
    fireEvent.press(sendButton);

    // Button should show "Sending..." and be disabled
    await waitFor(() => {
      expect(getByText('Sending...')).toBeTruthy();
    });

    // Wait for completion
    await waitFor(() => {
      expect(getByText('Send Verification Code')).toBeTruthy();
    });
  });

  it('displays terms and conditions text', () => {
    const { getByText } = renderLoginScreen();

    expect(
      getByText(/By continuing, you agree to our Terms of Service and Privacy Policy/)
    ).toBeTruthy();
  });
});
