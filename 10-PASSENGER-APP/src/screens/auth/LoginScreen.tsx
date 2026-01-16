/**
 * Login Screen
 * User enters email/phone and password to login
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
import { setLoading, setError, setCredentials } from '@redux/slices/authSlice';
import authService from '@services/authService';
import Logo from '@components/common/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const detectIdentifierType = (text: string): 'email' | 'phone' => {
    return text.includes('@') ? 'email' : 'phone';
  };

  const formatPhoneNumber = (text: string): string => {
    // If it's an email, return as-is
    if (text.includes('@')) {
      return text;
    }

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

  const validateInput = (): boolean => {
    const trimmedIdentifier = identifier.trim();
    
    if (!trimmedIdentifier) {
      Alert.alert('Required Field', 'Please enter your email or phone number');
      return false;
    }

    if (!password) {
      Alert.alert('Required Field', 'Please enter your password');
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

    if (password.length < 8) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
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

      const response = await authService.login({
        identifier: formattedIdentifier,
        password,
      });

      if (response.success) {
        // Store credentials in Redux
        dispatch(setCredentials({
          token: response.access_token,
          user: response.user,
        }));

        // Check if user needs verification
        if (!response.user.is_verified) {
          Alert.alert(
            'Verification Required',
            `Please verify your ${response.user.email ? 'email' : 'phone number'} to continue.`,
            [
              {
                text: 'Verify Now',
                onPress: () => {
                  navigation.navigate('Verification', {
                    userId: response.user.id,
                    verificationType: response.user.email ? 'email' : 'phone',
                  });
                },
              },
            ]
          );
        } else {
          // Navigate to main app
          navigation.navigate('MainApp');
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || 
        error.message || 
        'Failed to login. Please check your credentials.';
      
      dispatch(setError(errorMessage));
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
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
          <Logo size={90} backgroundColor="rgba(255, 255, 255, 0.9)" />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to Cab Connect Fiji</Text>
        </View>

        {/* Login Form */}
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
                  ? 'Enter your registered email address'
                  : 'Enter Fiji number (e.g., 7770000)'}
              </Text>
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name="lock-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                accessible={true}
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="rgba(255, 255, 255, 0.4)" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity 
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
            accessible={true}
            accessibilityLabel="Forgot password"
            accessibilityRole="button"
            accessibilityHint="Tap to reset your password"
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            accessible={true}
            accessibilityLabel="Login"
            accessibilityRole="button"
            accessibilityHint="Tap to login to your account"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
            {!isLoading && <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />}
          </TouchableOpacity>

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <TouchableOpacity 
              onPress={handleSignup}
              accessible={true}
              accessibilityLabel="Sign up"
              accessibilityRole="button"
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer info */}
        <View style={styles.footerInfo}>
          <Text style={styles.terms}>
            By continuing, you agree to our 
            <Text style={styles.link}> Terms of Service </Text> 
            and 
            <Text style={styles.link}> Privacy Policy </Text>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginTop: 20,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
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
  userTypeContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10b981',
    letterSpacing: 2,
    marginBottom: 16,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 8,
  },
  userTypeButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  userTypeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  userTypeButtonTextActive: {
    color: '#fff',
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
  eyeIcon: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  forgotPasswordText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '700',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    minHeight: 44,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  signupLink: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '700',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  countryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
  },
  countryCode: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '800',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  hintText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '500',
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
  footerInfo: {
    marginTop: 32,
    alignItems: 'center',
  },
  terms: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#10b981',
    fontWeight: '700',
  },
  copyright: {
    fontSize: 11,
    color: 'rgba(16, 185, 129, 0.3)',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
