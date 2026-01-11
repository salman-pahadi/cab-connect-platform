import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setCurrentRide } from '../../redux/slices/rideSlice';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import rideService from '../../services/rideService';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export const BookRideScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { currentRide } = useAppSelector((state) => state.rides);

  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [rideType, setRideType] = useState<'economy' | 'comfort' | 'premium'>('economy');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet' | 'upi'>('cash');
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [estimatingFare, setEstimatingFare] = useState(false);

  const mockPickupLocation: Location = {
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Current Location',
  };

  const mockDropoffLocation: Location = {
    latitude: 12.9352,
    longitude: 77.6245,
    address: 'Destination',
  };

  useEffect(() => {
    setPickupLocation(mockPickupLocation);
  }, []);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      estimateFare();
    }
  }, [pickupLocation, dropoffLocation, rideType]);

  const estimateFare = async () => {
    if (!pickupLocation || !dropoffLocation) return;

    try {
      setEstimatingFare(true);
      const estimate = await rideService.estimateFare({
        pickup_latitude: pickupLocation.latitude,
        pickup_longitude: pickupLocation.longitude,
        dropoff_latitude: dropoffLocation.latitude,
        dropoff_longitude: dropoffLocation.longitude,
        ride_type: rideType,
      });
      setEstimatedFare(estimate.estimated_total);
    } catch (error) {
      console.error('Error estimating fare:', error);
      Alert.alert('Error', 'Failed to estimate fare');
    } finally {
      setEstimatingFare(false);
    }
  };

  const handleSetDropoff = () => {
    setDropoffLocation(mockDropoffLocation);
  };

  const handleRequestRide = async () => {
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert('Error', 'Please set both pickup and dropoff locations');
      return;
    }

    try {
      setLoading(true);
      const ride = await rideService.requestRide({
        ride_type: rideType,
        payment_method: paymentMethod,
        pickup_latitude: pickupLocation.latitude,
        pickup_longitude: pickupLocation.longitude,
        pickup_address: pickupLocation.address,
        dropoff_latitude: dropoffLocation.latitude,
        dropoff_longitude: dropoffLocation.longitude,
        dropoff_address: dropoffLocation.address,
      });

      dispatch(setCurrentRide(ride));
      navigation.navigate('RideTracking', { rideId: ride.id });
    } catch (error) {
      console.error('Error requesting ride:', error);
      Alert.alert('Error', 'Failed to request ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 12.9716,
            longitude: 77.5946,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {pickupLocation && (
            <Marker
              coordinate={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
              }}
              title="Pickup"
              description={pickupLocation.address}
            />
          )}
          {dropoffLocation && (
            <Marker
              coordinate={{
                latitude: dropoffLocation.latitude,
                longitude: dropoffLocation.longitude,
              }}
              title="Dropoff"
              description={dropoffLocation.address}
            />
          )}
        </MapView>
      </View>

      {/* Locations */}
      <View style={styles.locationsContainer}>
        <View style={styles.locationItem}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.address}>{pickupLocation?.address || 'Not set'}</Text>
        </View>

        {!dropoffLocation ? (
          <TouchableOpacity style={styles.setDropoffButton} onPress={handleSetDropoff}>
            <Text style={styles.setDropoffText}>+ Set Dropoff Location</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.locationItem}>
            <Text style={styles.label}>Dropoff</Text>
            <Text style={styles.address}>{dropoffLocation.address}</Text>
          </View>
        )}
      </View>

      {/* Ride Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ride Type</Text>
        <View style={styles.rideTypeContainer}>
          {(['economy', 'comfort', 'premium'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.rideTypeButton, rideType === type && styles.rideTypeButtonActive]}
              onPress={() => setRideType(type)}
            >
              <Text
                style={[
                  styles.rideTypeText,
                  rideType === type && styles.rideTypeTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          {(['cash', 'card', 'wallet', 'upi'] as const).map((method) => (
            <TouchableOpacity
              key={method}
              style={[styles.paymentButton, paymentMethod === method && styles.paymentButtonActive]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text
                style={[
                  styles.paymentText,
                  paymentMethod === method && styles.paymentTextActive,
                ]}
              >
                {method.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Fare Estimate */}
      {estimatingFare ? (
        <View style={styles.fareContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={styles.fareLabel}>Calculating fare...</Text>
        </View>
      ) : estimatedFare !== null ? (
        <View style={styles.fareContainer}>
          <Text style={styles.fareLabel}>Estimated Fare</Text>
          <Text style={styles.fareAmount}>₹{estimatedFare.toFixed(2)}</Text>
        </View>
      ) : null}

      {/* Request Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Request Ride"
          onPress={handleRequestRide}
          loading={loading}
          disabled={!pickupLocation || !dropoffLocation || loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mapContainer: {
    height: 250,
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  locationsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.card,
  },
  locationItem: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: theme.colors.text,
  },
  setDropoffButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 8,
    alignItems: 'center',
  },
  setDropoffText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  rideTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideTypeButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  rideTypeButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  rideTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  rideTypeTextActive: {
    color: theme.colors.primary,
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  paymentText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  paymentTextActive: {
    color: theme.colors.primary,
  },
  fareContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.card,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
