/**
 * OTP Verification Screen
 * User enters 6-digit OTP code received via SMS
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoading, setError, loginSuccess } from '../../redux/slices/authSlice';
import authService from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { phoneNumber, userType } = route.params as {
    phoneNumber: string;
    userType: 'passenger' | 'driver';
  };

  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOTPChange = (value: string, index: number) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits entered
    if (index === 5 && value) {
      const fullOTP = newOTP.join('');
      if (fullOTP.length === 6) {
        handleVerifyOTP(fullOTP);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (code?: string) => {
    const otpCode = code || otp.join('');

    if (otpCode.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the complete 6-digit code');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const response = await authService.verifyOTP({
        phoneNumber,
        otp: otpCode,
        userType,
      });

      if (response.success && response.accessToken) {
        // Save token
        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('userType', userType);

        // Set token in API client
        authService.setAuthToken(response.accessToken);

        // Get user data
        const userData = await authService.getCurrentUser(response.accessToken);

        dispatch(
          loginSuccess({
            accessToken: response.accessToken,
            user: userData.user,
            userType,
            isNewUser: response.isNewUser,
          })
        );

        // Navigate based on registration status
        if (response.isNewUser) {
          navigation.navigate('Registration' as never, { userType } as never);
        } else {
          // Navigate to home
          navigation.navigate('Home' as never);
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Failed to verify OTP';
      dispatch(setError(errorMessage));
      Alert.alert('Verification Failed', errorMessage);
      // Clear OTP on error
      setOTP(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      setIsLoading(true);
      const response = await authService.sendOTP({ phoneNumber, userType });

      if (response.success) {
        Alert.alert('OTP Sent', 'A new verification code has been sent');
        setCountdown(300);
        setCanResend(false);
        setOTP(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a code to {phoneNumber}
        </Text>
      </View>

      {/* OTP Input */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.otpInput, digit && styles.otpInputFilled]}
            value={digit}
            onChangeText={(value) => handleOTPChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* Countdown Timer */}
      <View style={styles.timerContainer}>
        {countdown > 0 ? (
          <Text style={styles.timerText}>
            Code expires in {formatTime(countdown)}
          </Text>
        ) : (
          <Text style={styles.expiredText}>Code expired</Text>
        )}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={() => handleVerifyOTP()}
        disabled={isLoading || otp.join('').length !== 6}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify Code</Text>
        )}
      </TouchableOpacity>

      {/* Resend */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code? </Text>
        <TouchableOpacity
          onPress={handleResendOTP}
          disabled={!canResend || isLoading}
        >
          <Text
            style={[
              styles.resendButton,
              !canResend && styles.resendButtonDisabled,
            ]}
          >
            Resend
          </Text>
        </TouchableOpacity>
      </View>

      {/* Change Number */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.changeNumberButton}
      >
        <Text style={styles.changeNumberText}>Change Phone Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    backgroundColor: '#f9f9f9',
  },
  otpInputFilled: {
    borderColor: '#10b981',
    backgroundColor: '#fff',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: '#666',
  },
  expiredText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  resendButtonDisabled: {
    color: '#a0a0a0',
  },
  changeNumberButton: {
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
