/**
 * Signup Screen
 * User creates account with email/phone + password
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

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validatePassword = (pwd: string): { valid: boolean; message: string } => {
    if (pwd.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(pwd)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true, message: '' };
  };

  const validateInput = (): boolean => {
    const trimmedFullName = fullName.trim();
    
    if (!trimmedFullName) {
      Alert.alert('Required Field', 'Please enter your full name');
      return false;
    }

    if (signupMethod === 'email') {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        Alert.alert('Required Field', 'Please enter your email address');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return false;
      }
    } else {
      const trimmedPhone = phone.trim();
      if (!trimmedPhone) {
        Alert.alert('Required Field', 'Please enter your phone number');
        return false;
      }
      const formattedPhone = formatPhoneNumber(trimmedPhone);
      if (formattedPhone.length !== 12) { // +679 + 7 digits
        Alert.alert('Invalid Phone', 'Please enter a valid Fiji phone number (7 digits)');
        return false;
      }
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      Alert.alert('Invalid Password', passwordCheck.message);
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoad = signupMethod === 'email' 
        ? email.trim() 
        : formatPhoneNumber(phone);

      const response = await authService.signup({
        i
      const response = await authService.signup({
        identifier: formattedIdentifier,
        password,
        full_name: fullName.trim(),
        user_type: 'passenger', // Always passenger for passenger app
      });

      if (response.success) {
        // Map backend response to Redux user format (snake_case to camelCase)
        const userForRedux = {
          id: response.user.id,
          phoneNumber: response.user.phone_number || '',
          email: response.user.email || '',
          fullName: response.user.full_name,
          role: response.user.role.toLowerCase() as 'passenger' | 'driver' | 'admin',
          status: 'ACTIVE',
          isPhoneVerified: response.user.is_phone_verified,
          isEmailVerified: response.user.is_email_verified,
        };

        // Store credentials in Redux
        dispatch(setCredentials({
          token: response.access_token,
          user: userForRedux,
        }));

        // Determine what needs verification
        const needsEmailVerification = response.verification_required.email;
        const needsPhoneVerification = response.verification_required.phone;
        
        // Determine which verification to navigate to first
        let verificationType: 'email' | 'phone' | null = null;
        let verificationMessage = 'Account created successfully!';
        
        if (needsEmailVerification) {
          verificationType = 'email';
          verificationMessage = 'Please verify your email address to continue. We sent a verification link to ' + response.user.email;
        } else if (needsPhoneVerification) {
          verificationType = 'phone';
          verificationMessage = 'Please verify your phone number to continue. We sent a verification code to ' + response.user.phone_number;
        }

        // Navigate to verification screen or home
        Alert.alert(
          'Account Created',
          verificationMessage,
          [
            {
              text: 'Continue',
              onPress: () => {
                if (verificationType) {
                  navigation.navigate('Verification', {
                    userId: response.user.id,
                    verificationType: verificationType,
                  });
                } else {
                  navigation.navigate('Home' as any);
                }
              },
            },
          ]
        );
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || 
        error.message || 
        'Failed to create account. Please try again.';
      
      dispatch(setError(errorMessage));
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const getPasswordStrength = (): { strength: number; color: string; label: string } => {
    if (password.length === 0) {
      return { strength: 0, color: 'rgba(255, 255, 255, 0.1)', label: '' };
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return { strength: 25, color: '#ef4444', label: 'Weak' };
    } else if (score === 3) {
      return { strength: 50, color: '#f59e0b', label: 'Fair' };
    } else if (score === 4) {
      return { strength: 75, color: '#10b981', label: 'Good' };
    } else {
      return { strength: 100, color: '#10b981', label: 'Strong' };
    }
  };

  const passwordStrength = getPasswordStrength();

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Cab Connect Fiji</Text>
        </View>

        {/* Signup Form */}
        <View style={styles.glassCard}>
          {/* Method Selection Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, signupMethod === 'email' && styles.tabActive]}
              onPress={() => setSignupMethod('email')}
            >
              <MaterialCommunityIcons 
                name="email-outline" 
                size={20} 
                color={signupMethod === 'email' ? '#10b981' : 'rgba(255, 255, 255, 0.5)'}
              />
              <Text style={[styles.tabText, signupMethod === 'email' && styles.tabTextActive]}>
                Email
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, signupMethod === 'phone' && styles.tabActive]}
              onPress={() => setSignupMethod('phone')}
            >
              <MaterialCommunityIcons 
                name="phone-outline" 
                size={20} 
                color={signupMethod === 'phone' ? '#10b981' : 'rgba(255, 255, 255, 0.5)'}
              />
              <Text style={[styles.tabText, signupMethod === 'phone' && styles.tabTextActive]}>
                Phone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>FULL NAME</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name="account-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
                autoComplete="name"
                textContentType="name"
              />
            </View>
          </View>

          {/* Email or Phone Input - Conditional */}
          {signupMethod === 'email' ? (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons 
                  name="email-outline" 
                  size={20} 
                  color="rgba(16, 185, 129, 0.6)" 
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              </View>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons 
                  name="phone-outline" 
                  size={20} 
                  color="rgba(16, 185, 129, 0.6)" 
                  style={styles.inputIcon}
                />
                <Text style={styles.phonePrefix}>+679</Text>
                <TextInput
                  style={[styles.input, styles.phoneInput]}
                  placeholder="1234567"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={7}
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                />
              </View>
            </View>
          )}

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
                placeholder="Create password"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
                textContentType="newPassword"
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
            
            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBar}>
                  <View 
                    style={[
                      styles.strengthFill, 
                      { width: `${passwordStrength.strength}%`, backgroundColor: passwordStrength.color }
                    ]} 
                  />
                </View>
                <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </Text>
              </View>
            )}
            
            <View style={styles.hintContainer}>
              <MaterialCommunityIcons name="shield-check-outline" size={14} color="rgba(16, 185, 129, 0.6)" />
              <Text style={styles.hintText}>
                Min 8 chars, 1 uppercase, 1 lowercase, 1 number
              </Text>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name="lock-check-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
                textContentType="newPassword"
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
                accessible={true}
                accessibilityLabel={showConfirmPassword ? "Hide password" : "Show password"}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="rgba(255, 255, 255, 0.4)" 
                />
              </TouchableOpacity>
            </View>
            {confirmPassword.length > 0 && (
              <View style={styles.hintContainer}>
                <MaterialCommunityIcons 
                  name={password === confirmPassword ? "check-circle-outline" : "close-circle-outline"} 
                  size={14} 
                  color={password === confirmPassword ? "#10b981" : "#ef4444"} 
                />
                <Text style={[styles.hintText, { color: password === confirmPassword ? "#10b981" : "#ef4444" }]}>
                  {password === confirmPassword ? "Passwords match" : "Passwords don&apos;t match"}
                </Text>
              </View>
            )}
          </View>

          {/* Signup Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={isLoading}
            accessible={true}
            accessibilityLabel="Create account"
            accessibilityRole="button"
            accessibilityHint="Tap to create your Cab Connect account"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
            {!isLoading && <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={handleLogin}
              accessible={true}
              accessibilityLabel="Login"
              accessibilityRole="button"
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer info */}
        <View style={styles.footerInfo}>
          <Text style={styles.terms}>
            By creating an account, you agree to our 
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
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 6,
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
    marginBottom: 20,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tabTextActive: {
    color: '#10b981',
  },
  phonePrefix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginRight: 8,
  },
  phoneInput: {
    paddingLeft: 0,
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
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 20,
    gap: 10,
    marginTop: 12,
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
  footerInfo: {
    marginTop: 24,
    alignItems: 'center',
  },
  terms: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#10b981',
    fontWeight: '700',
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

export default SignupScreen;
