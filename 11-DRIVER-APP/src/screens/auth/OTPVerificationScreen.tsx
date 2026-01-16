import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppDispatch } from '@redux/hooks';
import { setDriverData } from '@redux/slices/driverSlice';
import apiService from '@/services/apiService';
import Colors from '@/theme/colors';

const DEV_MODE = __DEV__;
const TEST_OTP = '123456';

const OTPVerificationScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { phoneNumber } = route.params || {};

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (!code || code.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit code.');
      return;
    }

    try {
      setLoading(true);

      if (DEV_MODE && code === TEST_OTP) {
        // Mock driver auth in dev mode
        dispatch(
          setDriverData({
            id: 'driver_dev_1',
            name: 'Dev Driver',
            phone: phoneNumber,
            isAuthenticated: true,
            isOnline: false,
          })
        );
        Alert.alert('Verified', 'OTP verified successfully.', [
          { text: 'OK', onPress: () => (navigation as any).replace('Main') },
        ]);
        return;
      }

      const res = await apiService.verifyOtp(phoneNumber, code);
      if (res.status === 200) {
        const user = res.data?.user || {};
        dispatch(
          setDriverData({
            id: String(user.id || 'driver_1'),
            name: user.full_name || 'Driver',
            phone: user.phone_number || phoneNumber,
            isAuthenticated: true,
            isOnline: false,
          })
        );
        Alert.alert('Verified', 'OTP verified successfully.', [
          { text: 'OK', onPress: () => (navigation as any).replace('Main') },
        ]);
      } else {
        Alert.alert('Error', 'Verification failed.');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to verify OTP';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>Code sent to {phoneNumber}</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="123456"
        placeholderTextColor={Colors.textSecondary}
        value={code}
        onChangeText={setCode}
        maxLength={6}
      />

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={verifyOTP} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: Colors.background },
  title: { fontSize: 22, fontWeight: '900', color: Colors.white, textAlign: 'center' },
  subtitle: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', marginTop: 6 },
  input: { height: 52, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 12, color: Colors.white, marginTop: 16, textAlign: 'center', letterSpacing: 4 },
  button: { marginTop: 16, height: 52, backgroundColor: Colors.primary, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: Colors.black, fontSize: 16, fontWeight: '900' },
});

export default OTPVerificationScreen;
