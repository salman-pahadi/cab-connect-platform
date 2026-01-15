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
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { setLoading, setError, otpSent } from '@redux/slices/authSlice';
import authService from '@services/authService';
import { theme } from '@/styles/theme';
import Logo from '@components/common/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

type UserType = 'passenger' | 'driver';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

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

    // Fiji numbers: +679 (4 chars) + 7 digits = 11 chars total
    if (!formattedPhone || formattedPhone.length !== 11) {
      if (Alert && Alert.alert) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid Fiji phone number (7 digits)');
      }
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
        if (Alert && Alert.alert) {
          Alert.alert(
            'OTP Sent',
            `A 6-digit code has been sent to ${formattedPhone}.`,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('OTPVerification', {
                    phoneNumber: formattedPhone,
                    userType,
                  });
                },
              },
            ]
          );
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Failed to send OTP';
      dispatch(setError(errorMessage));
      if (Alert && Alert.alert) {
        Alert.alert('Error', errorMessage);
      }
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
      <StatusBar barStyle="light-content" />
      
      {/* Dynamic Background Elements */}
      <View style={styles.circleBg} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Logo size={90} backgroundColor="rgba(255, 255, 255, 0.9)" />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Welcome to Cab Connect Fiji</Text>
        </View>

        {/* User Type Selection - Removed: Driver has separate app */}
        <View style={styles.glassCard}>
          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>FIJI PHONE NUMBER</Text>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryBadge}>
                <Text style={styles.countryCode}>+679</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="777 0000"
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                keyboardType="phone-pad"
                value={phoneNumber.replace('+679', '')}
                onChangeText={setPhoneNumber}
                maxLength={7}
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
            </View>
            <View style={styles.hintContainer}>
              <MaterialCommunityIcons name="information-outline" size={14} color="rgba(16, 185, 129, 0.6)" />
              <Text style={styles.hintText}>
                We'll send a 6-digit verification code.
              </Text>
            </View>
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSendOTP}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Processing...' : 'Send OTP'}
            </Text>
            {!isLoading && <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />}
          </TouchableOpacity>
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
    marginBottom: 32,
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
