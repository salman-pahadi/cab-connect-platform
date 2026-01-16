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
import { useAppDispatch } from '@redux/hooks';
import { setLoading, setError } from '@redux/slices/driverSlice';
import apiService from '@/services/apiService';
import Colors from '@/theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (text: string): string => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('679')) {
      return `+${cleaned}`;
    } else if (cleaned.length > 0) {
      return `+679${cleaned}`;
    }
    return '';
  };

  const handleSendOTP = async () => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!formattedPhone || formattedPhone.length !== 11) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Fiji phone number (7 digits)');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      const response = await apiService.sendOtp(formattedPhone);
      if (response.status === 200) {
        Alert.alert('OTP Sent', `A 6-digit code has been sent to ${formattedPhone}.`, [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('OTPVerification', { phoneNumber: formattedPhone });
            },
          },
        ]);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to send OTP';
      dispatch(setError(errorMessage));
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="steering" size={36} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Driver Login</Text>
          <Text style={styles.subtitle}>Enter your Fiji phone number to continue</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>FIJI PHONE NUMBER</Text>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryBadge}>
                <Text style={styles.countryCode}>+679</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="777 0000"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="phone-pad"
                value={phoneNumber.replace('+679', '')}
                onChangeText={setPhoneNumber}
                maxLength={7}
                autoComplete="tel"
                textContentType="telephoneNumber"
              />
            </View>
            <View style={styles.hintContainer}>
              <MaterialCommunityIcons name="information-outline" size={14} color={Colors.primary} />
              <Text style={styles.hintText}>We&apos;ll send a 6-digit verification code.</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleSendOTP} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? 'Processing...' : 'Send OTP'}</Text>
            {!isLoading && <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.white} />}
          </TouchableOpacity>
        </View>

        <View style={styles.footerInfo}>
          <Text style={styles.terms}>
            By continuing, you agree to our <Text style={styles.link}>Terms</Text> and <Text style={styles.link}>Privacy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 24 },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 24 },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: { fontSize: 22, fontWeight: '900', color: Colors.white },
  subtitle: { fontSize: 13, color: Colors.textSecondary, marginTop: 6 },
  card: { backgroundColor: Colors.cardBackground, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: Colors.border },
  inputContainer: { marginTop: 8 },
  label: { fontSize: 12, fontWeight: '800', color: Colors.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  phoneInputWrapper: { flexDirection: 'row', alignItems: 'center' },
  countryBadge: { backgroundColor: Colors.darkSecondary, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, marginRight: 10, borderWidth: 1, borderColor: Colors.border },
  countryCode: { color: Colors.white, fontWeight: '700' },
  phoneInput: { flex: 1, height: 44, color: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 10, paddingHorizontal: 12 },
  hintContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  hintText: { color: Colors.textSecondary, fontSize: 12, marginLeft: 6 },
  button: { marginTop: 16, height: 52, backgroundColor: Colors.primary, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: Colors.black, fontSize: 16, fontWeight: '900' },
  footerInfo: { alignItems: 'center', marginTop: 16 },
  terms: { color: Colors.textSecondary, fontSize: 12 },
  link: { color: Colors.primary, fontWeight: '700' },
});

export default LoginScreen;
