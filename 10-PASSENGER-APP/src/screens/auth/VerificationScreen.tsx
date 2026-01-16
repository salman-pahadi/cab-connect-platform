/**
 * Verification Screen
 * User verifies email (token) or phone (OTP code)
 */

import React, { useState, useEffect } from 'react';
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
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { setLoading, setError, updateUser } from '@redux/slices/authSlice';
import authService from '@services/authService';
import Logo from '@components/common/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type VerificationScreenRouteProp = RouteProp<{
  Verification: {
    userId: string;
    verificationType: 'email' | 'phone';
  };
}, 'Verification'>;

const VerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<VerificationScreenRouteProp>();
  const dispatch = useAppDispatch();
  
  const { verificationType } = route.params;
  const user = useAppSelector((state) => state.auth.user);

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    // Start countdown timer for resend
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const isEmail = verificationType === 'email';
  const contactInfo = isEmail 
    ? user?.email || 'your email' 
    : user?.phoneNumber || 'your phone';

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert('Required', `Please enter the verification ${isEmail ? 'code' : 'code'}`);
      return;
    }

    if (!isEmail && code.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a 6-digit verification code');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      if (isEmail) {
        await authService.verifyEmail({ token: code.trim() });
      } else {
        await authService.verifyPhone({ code: code.trim() });
      }

      // Update user verification status in Redux
      dispatch(updateUser({ 
        isEmailVerified: isEmail ? true : user?.isEmailVerified,
        isPhoneVerified: !isEmail ? true : user?.isPhoneVerified,
      }));

      Alert.alert(
        'Verification Successful',
        `Your ${verificationType} has been verified successfully!`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('MainApp'),
          },
        ]
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || 
        error.message || 
        'Verification failed. Please try again.';
      
      dispatch(setError(errorMessage));
      Alert.alert('Verification Failed', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleResendCode = async () => {
    if (resendCountdown > 0) {
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      await authService.resendVerification();

      setResendCountdown(60); // 60 second cooldown
      Alert.alert(
        'Code Sent',
        `A new verification ${isEmail ? 'link has been sent to your email' : 'code has been sent via SMS'}`
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || 
        error.message || 
        'Failed to resend code. Please try again.';
      
      dispatch(setError(errorMessage));
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Verification',
      'You can verify your account later from settings. Some features may be limited.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Skip for Now',
          onPress: () => navigation.navigate('MainApp'),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Dynamic Background Elements */}
      <View style={styles.circleBg} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Logo size={80} backgroundColor="rgba(255, 255, 255, 0.9)" />
          <Text style={styles.title}>Verify Your {isEmail ? 'Email' : 'Phone'}</Text>
          <Text style={styles.subtitle}>
            {isEmail 
              ? `We've sent a verification code to ${contactInfo}`
              : `We've sent a 6-digit code to ${contactInfo}`}
          </Text>
        </View>

        {/* Verification Form */}
        <View style={styles.glassCard}>
          {isEmail ? (
            // Email Verification Instructions
            <View style={styles.instructionsContainer}>
              <MaterialCommunityIcons 
                name="email-check-outline" 
                size={48} 
                color="#10b981" 
                style={styles.instructionIcon}
              />
              <Text style={styles.instructionTitle}>Check Your Email</Text>
              <Text style={styles.instructionText}>
                We&apos;ve sent a verification link to your email. Click the link to verify your account.
              </Text>
              <Text style={styles.instructionText}>
                Or enter the verification code from the email below:
              </Text>
            </View>
          ) : (
            // Phone Verification Icon
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons 
                name="message-text-outline" 
                size={64} 
                color="#10b981" 
              />
            </View>
          )}

          {/* Code Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {isEmail ? 'VERIFICATION CODE' : '6-DIGIT CODE'}
            </Text>
            <View style={styles.codeInputWrapper}>
              <MaterialCommunityIcons 
                name="shield-check-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.codeInput}
                placeholder={isEmail ? "Enter code from email" : "000000"}
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={code}
                onChangeText={setCode}
                keyboardType={isEmail ? "default" : "number-pad"}
                maxLength={isEmail ? undefined : 6}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
              />
            </View>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={isLoading}
            accessible={true}
            accessibilityLabel="Verify code"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Text>
            {!isLoading && <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />}
          </TouchableOpacity>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn&apos;t receive the code? </Text>
            <TouchableOpacity 
              onPress={handleResendCode}
              disabled={resendCountdown > 0 || isLoading}
              accessible={true}
              accessibilityLabel="Resend code"
              accessibilityRole="button"
            >
              <Text style={[
                styles.resendLink,
                (resendCountdown > 0 || isLoading) && styles.resendLinkDisabled
              ]}>
                {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Skip Button */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            accessible={true}
            accessibilityLabel="Skip verification"
            accessibilityRole="button"
          >
            <Text style={styles.skipText}>Skip for Now</Text>
          </TouchableOpacity>
        </View>

        {/* Help Text */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons name="help-circle-outline" size={16} color="rgba(16, 185, 129, 0.5)" />
          <Text style={styles.helpText}>
            {isEmail 
              ? 'Check your spam folder if you don\'t see the email'
              : 'SMS delivery may take a few minutes'}
          </Text>
        </View>
        
        <Text style={styles.copyright}>© 2026 Cab Connect Fiji • Pure Emerald Edition</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  circleBg: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    zIndex: -1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginTop: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  instructionIcon: {
    marginBottom: 16,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10b981',
    letterSpacing: 2,
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  codeInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  codeInput: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    paddingVertical: 16,
    letterSpacing: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 20,
    gap: 10,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    minHeight: 44,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  resendLink: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '700',
  },
  resendLinkDisabled: {
    color: 'rgba(16, 185, 129, 0.4)',
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  helpText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
  copyright: {
    fontSize: 11,
    color: 'rgba(16, 185, 129, 0.3)',
    textAlign: 'center',
    marginTop: 32,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default VerificationScreen;
