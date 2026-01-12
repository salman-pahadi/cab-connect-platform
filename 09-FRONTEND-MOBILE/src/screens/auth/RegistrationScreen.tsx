/**
 * Registration Screen
 * Complete user profile after OTP verification
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registrationComplete, setLoading, setError } from '@redux/slices/authSlice';
import authService from '@services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { userType } = route.params as { userType: 'passenger' | 'driver' };
  const { accessToken, user } = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    // Driver-specific fields
    licenseNumber: '',
    licenseExpiry: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehiclePlateNumber: '',
    vehicleType: 'sedan' as 'sedan' | 'suv' | 'mini_van' | 'luxury',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassengerForm = (): boolean => {
    if (!formData.fullName.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name');
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const validateDriverForm = (): boolean => {
    if (!validatePassengerForm()) return false;

    if (!formData.licenseNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter your license number');
      return false;
    }

    if (!formData.vehicleMake.trim()) {
      Alert.alert('Validation Error', 'Please enter vehicle make');
      return false;
    }

    if (!formData.vehicleModel.trim()) {
      Alert.alert('Validation Error', 'Please enter vehicle model');
      return false;
    }

    if (!formData.vehicleYear.trim() || formData.vehicleYear.length !== 4) {
      Alert.alert('Validation Error', 'Please enter a valid vehicle year');
      return false;
    }

    if (!formData.vehiclePlateNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter vehicle plate number');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate form
    const isValid =
      userType === 'passenger' ? validatePassengerForm() : validateDriverForm();

    if (!isValid) return;

    try {
      setIsLoading(true);
      dispatch(setLoading(true));

      let response;

      if (userType === 'passenger') {
        response = await authService.registerPassenger(
          {
            phoneNumber: user?.phoneNumber || '',
            fullName: formData.fullName,
            email: formData.email || undefined,
          },
          accessToken
        );
      } else {
        response = await authService.registerDriver(
          {
            phoneNumber: user?.phoneNumber || '',
            fullName: formData.fullName,
            email: formData.email || undefined,
            licenseNumber: formData.licenseNumber,
            licenseExpiry: new Date().toISOString(), // Should use date picker
            vehicleMake: formData.vehicleMake,
            vehicleModel: formData.vehicleModel,
            vehicleYear: formData.vehicleYear,
            vehicleColor: formData.vehicleColor,
            vehiclePlateNumber: formData.vehiclePlateNumber,
            vehicleType: formData.vehicleType,
          },
          accessToken
        );
      }

      if (response.success && response.accessToken) {
        // Update token
        await AsyncStorage.setItem('accessToken', response.accessToken);
        authService.setAuthToken(response.accessToken);

        // Get updated user data
        const userData = await authService.getCurrentUser(response.accessToken);

        dispatch(
          registrationComplete({
            accessToken: response.accessToken,
            user: userData.user,
          })
        );

        Alert.alert(
          'Success',
          userType === 'driver'
            ? 'Registration submitted! Your account will be verified by our team.'
            : 'Registration complete! Welcome to Cab Connect.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home' as never),
            },
          ]
        );
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Registration failed';
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
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            {userType === 'driver'
              ? 'Driver information and vehicle details'
              : 'Tell us about yourself'}
          </Text>
        </View>

        {/* Common Fields */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Full Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              autoComplete="name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>
        </View>

        {/* Driver-specific fields */}
        {userType === 'driver' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Driver License</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  License Number <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., FJ123456"
                  value={formData.licenseNumber}
                  onChangeText={(value) => handleInputChange('licenseNumber', value)}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vehicle Information</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Vehicle Make <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Toyota"
                  value={formData.vehicleMake}
                  onChangeText={(value) => handleInputChange('vehicleMake', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Vehicle Model <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Camry"
                  value={formData.vehicleModel}
                  onChangeText={(value) => handleInputChange('vehicleModel', value)}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>
                    Year <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="2020"
                    value={formData.vehicleYear}
                    onChangeText={(value) => handleInputChange('vehicleYear', value)}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>

                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>Color</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="White"
                    value={formData.vehicleColor}
                    onChangeText={(value) => handleInputChange('vehicleColor', value)}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Plate Number <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., AB1234"
                  value={formData.vehiclePlateNumber}
                  onChangeText={(value) =>
                    handleInputChange('vehiclePlateNumber', value.toUpperCase())
                  }
                  autoCapitalize="characters"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vehicle Type</Text>
                <View style={styles.vehicleTypeButtons}>
                  {['sedan', 'suv', 'mini_van', 'luxury'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.vehicleTypeButton,
                        formData.vehicleType === type && styles.vehicleTypeButtonActive,
                      ]}
                      onPress={() => handleInputChange('vehicleType', type)}
                    >
                      <Text
                        style={[
                          styles.vehicleTypeText,
                          formData.vehicleType === type && styles.vehicleTypeTextActive,
                        ]}
                      >
                        {type.replace('_', ' ').toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Submitting...' : 'Complete Registration'}
          </Text>
        </TouchableOpacity>
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
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  vehicleTypeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vehicleTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  vehicleTypeButtonActive: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  vehicleTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  vehicleTypeTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});

export default RegistrationScreen;
