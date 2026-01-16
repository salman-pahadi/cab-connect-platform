/**
 * Forgot Password Screen
 * User requests password reset via email or phone
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
  StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { setLoading, setError } from '@redux/slices/authSlice';
import authService from '@services/authService';
import Logo from '@components/common/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const detectIdentifierType = (text: string): 'email' | 'phone' => {
    return text.includes('@') ? 'email' : 'phone';
  };

  const formatPhoneNumber = (text: string): string => {
    if (text.includes('@')) {
      return text;
    }

    const cleaned = text.replace(/\D/g, '');

    if (cleaned.startsWith('679')) {
      return `+${cleaned}`;
    } else if (cleaned.length > 0) {
      return `+679${cleaned}`;
    }
    return '';
  };

  const validateInput = (): boolean => {
    const trimmedIdentifier = identifier.trim();
    
    if (!trimmedIdentifier) {
      Alert.alert('Required Field', 'Please enter your email or phone number');
      return false;
    }

    const identifierType = detectIdentifierType(trimmedIdentifier);
    
    if (identifierType === 'phone') {
      const formattedPhone = formatPhoneNumber(trimmedIdentifier);
      if (formattedPhone.length !== 11) {
        Alert.alert('Invalid Phone', 'Please enter a valid Fiji phone number (7 digits)');
        return false;
      }
    } else if (identifierType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedIdentifier)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return false;
      }
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const identifierType = detectIdentifierType(identifier);
      const formattedIdentifier = identifierType === 'phone' 
        ? formatPhoneNumber(identifier) 
        : identifier.trim();

      const response = await authService.forgotPassword({
        identifier: formattedIdentifier,
      });

      if (response.success) {
        Alert.alert(
          'Reset Code Sent',
          response.message,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('ResetPassword', {
                  identifier: formattedIdentifier,
                  verificationType: identifierType,
                });
              },
            },
          ]
        );
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || 
        error.message || 
        'Failed to send reset code. Please try again.';
      
      dispatch(setError(errorMessage));
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
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
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToLogin}
          accessible={true}
          accessibilityLabel="Back to login"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Header with Logo */}
        <View style={styles.header}>
          <Logo size={80} backgroundColor="rgba(255, 255, 255, 0.9)" />
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email or phone number to receive a password reset code
          </Text>
        </View>

        {/* Reset Form */}
        <View style={styles.glassCard}>
          {/* Email/Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL OR PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name={identifier.includes('@') ? "email-outline" : "phone-outline"} 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="email@example.com or 7770000"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                autoComplete="email"
                textContentType="username"
              />
            </View>
            <View style={styles.hintContainer}>
              <MaterialCommunityIcons name="information-outline" size={14} color="rgba(16, 185, 129, 0.6)" />
              <Text style={styles.hintText}>
                {identifier.includes('@') 
                  ? 'We\'ll send a reset link to your email'
                  : 'We\'ll send a reset code via SMS'}
              </Text>
            </View>
          </View>

          {/* Send Reset Code Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
            accessible={true}
            accessibilityLabel="Send reset code"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </Text>
            {!isLoading && <MaterialCommunityIcons name="send" size={20} color="#fff" />}
          </TouchableOpacity>

          {/* Back to Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <TouchableOpacity 
              onPress={handleBackToLogin}
              accessible={true}
              accessibilityLabel="Back to login"
              accessibilityRole="button"
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Help Text */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons name="shield-lock-outline" size={18} color="rgba(16, 185, 129, 0.5)" />
          <Text style={styles.helpText}>
            Your account security is important to us. The reset code will expire in 10 minutes.
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
  inputWrapper: {
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
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    paddingVertical: 16,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  hintText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '500',
    flex: 1,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    minHeight: 44,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  loginLink: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '700',
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    gap: 12,
    paddingHorizontal: 8,
  },
  helpText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    flex: 1,
    lineHeight: 18,
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

export default ForgotPasswordScreen;
