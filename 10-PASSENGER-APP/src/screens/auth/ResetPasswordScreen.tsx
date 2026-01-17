/**
 * Reset Password Screen
 * User enters reset code and new password
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
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { setLoading, setError } from '@redux/slices/authSlice';
import authService from '@services/authService';
import Logo from '@components/common/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ResetPasswordScreenRouteProp = RouteProp<{
  ResetPassword: {
    identifier: string;
    verificationType: 'email' | 'phone';
  };
}, 'ResetPassword'>;

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<ResetPasswordScreenRouteProp>();
  const dispatch = useAppDispatch();

  const { identifier, verificationType } = route.params;

  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEmail = verificationType === 'email';

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
    if (!resetCode.trim()) {
      Alert.alert('Required', 'Please enter the reset code');
      return false;
    }

    if (!isEmail && resetCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a 6-digit reset code');
      return false;
    }

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      Alert.alert('Invalid Password', passwordCheck.message);
      return false;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return false;
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

      const response = await authService.resetPassword({
        identifier,
        token: isEmail ? resetCode.trim() : undefined,
        code: !isEmail ? resetCode.trim() : undefined,
        new_password: newPassword,
      });

      if (response.success) {
        Alert.alert(
          'Password Reset Successful',
          'Your password has been reset. Please login with your new password.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || 
        error.message || 
        'Failed to reset password. Please try again.';
      
      dispatch(setError(errorMessage));
      Alert.alert('Reset Failed', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const getPasswordStrength = (): { strength: number; color: string; label: string } => {
    if (newPassword.length === 0) {
      return { strength: 0, color: 'rgba(255, 255, 255, 0.1)', label: '' };
    }

    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

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
          <Text style={styles.title}>Set New Password</Text>
          <Text style={styles.subtitle}>
            Enter the code we sent to {identifier} and your new password
          </Text>
        </View>

        {/* Reset Form */}
        <View style={styles.glassCard}>
          {/* Reset Code Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {isEmail ? 'RESET CODE' : '6-DIGIT CODE'}
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name="shield-key-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder={isEmail ? "Enter code from email" : "000000"}
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={resetCode}
                onChangeText={setResetCode}
                keyboardType={isEmail ? "default" : "number-pad"}
                maxLength={isEmail ? undefined : 6}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>NEW PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name="lock-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Create new password"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
                textContentType="newPassword"
              />
              <TouchableOpacity 
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeIcon}
                accessible={true}
                accessibilityLabel={showNewPassword ? "Hide password" : "Show password"}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons 
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="rgba(255, 255, 255, 0.4)" 
                />
              </TouchableOpacity>
            </View>
            
            {/* Password Strength Indicator */}
            {newPassword.length > 0 && (
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
            <Text style={styles.label}>CONFIRM NEW PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons 
                name="lock-check-outline" 
                size={20} 
                color="rgba(16, 185, 129, 0.6)" 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Re-enter new password"
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
                  name={newPassword === confirmPassword ? "check-circle-outline" : "close-circle-outline"} 
                  size={14} 
                  color={newPassword === confirmPassword ? "#10b981" : "#ef4444"} 
                />
                <Text style={[styles.hintText, { color: newPassword === confirmPassword ? "#10b981" : "#ef4444" }]}>
                  {newPassword === confirmPassword ? "Passwords match" : "Passwords don&apos;t match"}
                </Text>
              </View>
            )}
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
            accessible={true}
            accessibilityLabel="Reset password"
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Text>
            {!isLoading && <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />}
          </TouchableOpacity>
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
    fontSize: 13,
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

export default ResetPasswordScreen;
