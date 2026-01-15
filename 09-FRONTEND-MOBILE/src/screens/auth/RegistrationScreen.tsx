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
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registrationComplete, setLoading, setError } from '@redux/slices/authSlice';
import authService from '@services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from '@components/common/Logo';

const { height } = Dimensions.get('window');

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
            user: userData as any,
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.circleBg} />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Logo size={80} />
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>
              {userType === 'driver'
                ? 'Driver information and vehicle details'
                : 'Tell us about yourself'}
            </Text>
          </View>

          <View style={styles.glassCard}>
            {/* Common Fields */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>FULL NAME *</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account" size={20} color="#10b981" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    autoComplete="name"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL (OPTIONAL)</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="email" size={20} color="#10b981" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>
            </View>

            {/* Driver-specific fields */}
            {userType === 'driver' && (
              <>
                <View style={[styles.section, { marginTop: 12 }]}>
                  <Text style={styles.sectionTitle}>Driver License</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>LICENSE NUMBER *</Text>
                    <View style={styles.inputWrapper}>
                      <MaterialCommunityIcons name="card-account-details" size={20} color="#10b981" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., FJ123456"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={formData.licenseNumber}
                        onChangeText={(value) => handleInputChange('licenseNumber', value)}
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.section, { marginTop: 12 }]}>
                  <Text style={styles.sectionTitle}>Vehicle Information</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>VEHICLE MAKE *</Text>
                    <View style={styles.inputWrapper}>
                      <MaterialCommunityIcons name="car" size={20} color="#10b981" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., Toyota"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={formData.vehicleMake}
                        onChangeText={(value) => handleInputChange('vehicleMake', value)}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>VEHICLE MODEL *</Text>
                    <View style={styles.inputWrapper}>
                      <MaterialCommunityIcons name="car-info" size={20} color="#10b981" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., Camry"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={formData.vehicleModel}
                        onChangeText={(value) => handleInputChange('vehicleModel', value)}
                      />
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.flex1]}>
                      <Text style={styles.label}>YEAR *</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.input}
                          placeholder="2020"
                          placeholderTextColor="rgba(255, 255, 255, 0.3)"
                          value={formData.vehicleYear}
                          onChangeText={(value) => handleInputChange('vehicleYear', value)}
                          keyboardType="number-pad"
                          maxLength={4}
                        />
                      </View>
                    </View>

                    <View style={[styles.inputGroup, styles.flex1]}>
                      <Text style={styles.label}>COLOR</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.input}
                          placeholder="White"
                          placeholderTextColor="rgba(255, 255, 255, 0.3)"
                          value={formData.vehicleColor}
                          onChangeText={(value) => handleInputChange('vehicleColor', value)}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>PLATE NUMBER *</Text>
                    <View style={styles.inputWrapper}>
                      <MaterialCommunityIcons name="numeric" size={20} color="#10b981" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., AB1234"
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        value={formData.vehiclePlateNumber}
                        onChangeText={(value) =>
                          handleInputChange('vehiclePlateNumber', value.toUpperCase())
                        }
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>VEHICLE TYPE</Text>
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
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.buttonText}>Processing...</Text>
            ) : (
              <>
                <Text style={styles.buttonText}>Complete Registration</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginTop: 20,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
    textAlign: 'center',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#10b981',
    letterSpacing: 1.5,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  vehicleTypeButtonActive: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  vehicleTypeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  vehicleTypeTextActive: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#10b981',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default RegistrationScreen;
