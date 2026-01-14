import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { clearCurrentRide, setCurrentRide } from '@redux/slices/rideSlice';
import Button from '@components/common/Button';
import { theme } from '@/styles/theme';
import rideService from '@services/rideService';

export const RideTrackingScreen = ({ route, navigation }: any) => {
  const { rideId } = route.params;
  const dispatch = useAppDispatch();
  const { currentRide } = useAppSelector((state) => state.rides);

  const [ride, setRide] = useState(currentRide);
  const [loading, setLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    loadRideDetails();
    // Refresh ride details every 5 seconds
    const interval = setInterval(loadRideDetails, 5000);
    return () => clearInterval(interval);
  }, [rideId]);

  const loadRideDetails = async () => {
    try {
      setLoading(true);
      const rideData = await rideService.getRide(rideId);
      setRide(rideData);
      dispatch(setCurrentRide(rideData));
    } catch (error) {
      console.error('Error loading ride details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRide = async () => {
    try {
      setLoading(true);
      await rideService.cancelRide(rideId, 'Passenger cancelled');
      dispatch(clearCurrentRide());
      Alert.alert('Success', 'Ride cancelled successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error cancelling ride:', error);
      Alert.alert('Error', 'Failed to cancel ride');
    } finally {
      setLoading(false);
      setShowCancelConfirm(false);
    }
  };

  const handleRideComplete = async () => {
    try {
      setLoading(true);
      // In real implementation, get actual distance/duration from tracking
      await rideService.completeRide(rideId, {
        actual_distance_km: ride?.actual_distance_km || 10,
        actual_duration_minutes: ride?.actual_duration_minutes || 20,
        actual_fare: ride?.actual_fare || ride?.estimated_fare || 0,
      });
      dispatch(clearCurrentRide());
      Alert.alert('Success', 'Ride completed');
      navigation.navigate('RideRating', { rideId });
    } catch (error) {
      console.error('Error completing ride:', error);
      Alert.alert('Error', 'Failed to complete ride');
    } finally {
      setLoading(false);
    }
  };

  if (!ride) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const statusColor = {
    pending: theme.colors.warning,
    accepted: theme.colors.info,
    driver_arriving: theme.colors.info,
    arrived: theme.colors.info,
    in_progress: theme.colors.success,
    completed: theme.colors.success,
    cancelled: theme.colors.error,
  }[ride.status] || theme.colors.primary;

  return (
    <ScrollView style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: ride.pickup_latitude,
            longitude: ride.pickup_longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: ride.pickup_latitude,
              longitude: ride.pickup_longitude,
            }}
            title="Pickup"
            pinColor="green"
          />
          <Marker
            coordinate={{
              latitude: ride.dropoff_latitude,
              longitude: ride.dropoff_longitude,
            }}
            title="Dropoff"
            pinColor="red"
          />
          <Polyline
            coordinates={[
              {
                latitude: ride.pickup_latitude,
                longitude: ride.pickup_longitude,
              },
              {
                latitude: ride.dropoff_latitude,
                longitude: ride.dropoff_longitude,
              },
            ]}
            strokeColor={theme.colors.primary}
            strokeWidth={3}
          />
        </MapView>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.rideNumber}>{ride.ride_number}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{ride.status.toUpperCase()}</Text>
          </View>
        </View>

        {/* Ride Type and Fare */}
        <View style={styles.rideInfoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ride Type</Text>
            <Text style={styles.infoValue}>{ride.ride_type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Fare</Text>
            <Text style={styles.infoValue}>₹{ride.estimated_fare.toFixed(2)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>{ride.estimated_distance_km?.toFixed(1)} km</Text>
          </View>
        </View>

        {/* Locations */}
        <View style={styles.locationsSection}>
          <View style={styles.locationRow}>
            <View style={styles.locationDot} />
            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationAddress}>{ride.pickup_address}</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.locationRow}>
            <View style={[styles.locationDot, { backgroundColor: theme.colors.error }]} />
            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>Dropoff</Text>
              <Text style={styles.locationAddress}>{ride.dropoff_address}</Text>
            </View>
          </View>
        </View>

        {/* OTP Section (if ride is accepted) */}
        {ride.status === 'accepted' && ride.otp_code && (
          <View style={styles.otpSection}>
            <Text style={styles.otpLabel}>Share this OTP with driver</Text>
            <View style={styles.otpBox}>
              <Text style={styles.otpValue}>{ride.otp_code}</Text>
            </View>
          </View>
        )}

        {/* Payment Method */}
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Payment: {ride.payment_method.toUpperCase()}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {ride.status === 'pending' && (
          <>
            <Button
              title="Cancel Ride"
              onPress={() => setShowCancelConfirm(true)}
              variant="danger"
            />
            {showCancelConfirm && (
              <View style={styles.confirmContainer}>
                <Text style={styles.confirmText}>Are you sure you want to cancel?</Text>
                <View style={styles.confirmButtons}>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => setShowCancelConfirm(false)}
                  >
                    <Text style={styles.confirmBtnText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.confirmBtn, styles.confirmBtnDanger]}
                    onPress={handleCancelRide}
                  >
                    <Text style={[styles.confirmBtnText, styles.confirmBtnTextDanger]}>
                      Yes, Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}

        {ride.status === 'accepted' && (
          <Text style={styles.waitingText}>Driver is on the way...</Text>
        )}

        {ride.status === 'in_progress' && (
          <Button
            title="Complete Ride"
            onPress={handleRideComplete}
            loading={loading}
            variant="success"
          />
        )}

        {ride.status === 'completed' && (
          <TouchableOpacity style={styles.ratedButton} onPress={() => navigation.goBack()}>
            <Text style={styles.ratedButtonText}>Back to Home</Text>
          </TouchableOpacity>
        )}
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
    height: 300,
  },
  map: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: theme.colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rideNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  rideInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  locationsSection: {
    marginVertical: 12,
  },
  locationRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.success,
    marginRight: 12,
    marginTop: 4,
  },
  locationContent: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: theme.colors.text,
  },
  routeLine: {
    height: 30,
    width: 2,
    backgroundColor: theme.colors.border,
    marginLeft: 5,
    marginBottom: 12,
  },
  otpSection: {
    backgroundColor: theme.colors.primaryLight,
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: 'center',
  },
  otpLabel: {
    fontSize: 12,
    color: theme.colors.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  otpBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  otpValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 2,
  },
  paymentRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  paymentLabel: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  waitingText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 16,
    fontStyle: 'italic',
  },
  confirmContainer: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  confirmText: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  confirmBtnDanger: {
    backgroundColor: theme.colors.error,
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  confirmBtnTextDanger: {
    color: '#fff',
  },
  ratedButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  ratedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
