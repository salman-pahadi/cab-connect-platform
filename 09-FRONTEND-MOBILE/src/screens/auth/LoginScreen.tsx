/**
 * Login Screen
 * User selects type (Passenger/Driver) and enters phone number
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoading, setError, otpSent } from '../../redux/slices/authSlice';
import authService from '../../services/authService';

type UserType = 'passenger' | 'driver';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState<UserType>('passenger');
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (text: string): string => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');

    // Ensure it starts with +679 for Fiji
    if (cleaned.startsWith('679')) {
      return `+${cleaned}`;
    } else if (cleaned.length > 0) {
      return `+679${cleaned}`;
    }
    return '';
  };

  const handleSendOTP = async () => {
    // Validate phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);

    if (!formattedPhone || formattedPhone.length < 12) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Fiji phone number');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const response = await authService.sendOTP({
        phoneNumber: formattedPhone,
        userType,
      });

      if (response.success) {
        dispatch(otpSent());
        Alert.alert(
          'OTP Sent',
          `A 6-digit code has been sent to ${formattedPhone}. Valid for ${response.expiresIn / 60} minutes.`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('OTPVerification' as never, {
                  phoneNumber: formattedPhone,
                  userType,
                } as never);
              },
            },
          ]
        );
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Failed to send OTP';
      dispatch(setError(errorMessage));
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Cab Connect</Text>
          <Text style={styles.subtitle}>Ride Anywhere in Fiji</Text>
        </View>

        {/* User Type Selection */}
        <View style={styles.userTypeContainer}>
          <Text style={styles.label}>I am a:</Text>
          <View style={styles.userTypeButtons}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'passenger' && styles.userTypeButtonActive,
              ]}
              onPress={() => setUserType('passenger')}
            >
              <Text
                style={[
                  styles.userTypeButtonText,
                  userType === 'passenger' && styles.userTypeButtonTextActive,
                ]}
              >
                Passenger
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'driver' && styles.userTypeButtonActive,
              ]}
              onPress={() => setUserType('driver')}
            >
              <Text
                style={[
                  styles.userTypeButtonText,
                  userType === 'driver' && styles.userTypeButtonTextActive,
                ]}
              >
                Driver
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputWrapper}>
            <Text style={styles.countryCode}>+679</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="9876543"
              keyboardType="phone-pad"
              value={phoneNumber.replace('+679', '')}
              onChangeText={setPhoneNumber}
              maxLength={7}
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </View>
          <Text style={styles.hint}>
            We'll send you a verification code
          </Text>
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSendOTP}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  userTypeContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userTypeButtonActive: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  userTypeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  userTypeButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 32,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  countryCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 16,
    color: '#1a1a1a',
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  terms: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
});

export default LoginScreen;
