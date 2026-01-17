import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Vibration,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { setActiveRide, setIncomingRequest } from '@/redux/slices/rideSlice';
import apiService from '@/services/apiService';
import Colors from '@/theme/colors';

// RideRequest interface defined in redux slice

const RideRequestScreen = ({ navigation, route: _route }: any) => {
  const dispatch = useAppDispatch();
  const driver = useAppSelector((state: RootState) => state.driver);
  const rideRequest = useAppSelector((state: RootState) => state.ride.incomingRequest);

  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(30);
  const [requestExpired, setRequestExpired] = useState(false);
  
  const scaleEffect = React.useRef(new Animated.Value(1)).current;

  // Countdown timer - request expires in 30 seconds
  useEffect(() => {
    if (requestExpired) return;

    const timer = setInterval(() => {
      setCountdownSeconds(prev => {
        if (prev <= 1) {
          setRequestExpired(true);
          dispatch(setIncomingRequest(null));
          navigation.goBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [requestExpired, dispatch, navigation]);

  // Premium pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleEffect, {
          toValue: 1.02,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleEffect, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    Vibration.vibrate([0, 500, 200, 500]);
    return () => pulse.stop();
  }, []);

  const handleAcceptRide = async () => {
    if (!rideRequest || !driver.id) return;

    setIsAccepting(true);
    try {
      // Call API to accept ride
      const response = await apiService.acceptRide(
        rideRequest.id,
        driver.id,
        'dummy-token' // Will be replaced with actual token from auth
      );

      if (response.data.success) {
        // Update Redux with accepted ride
        dispatch(setActiveRide({
          id: rideRequest.id,
          passengerId: rideRequest.passengerId,
          passengerName: rideRequest.passengerName,
          passengerPhone: 'N/A', // Would normally come from API
          passengerRating: rideRequest.passengerRating,
          pickupLocation: rideRequest.pickupLocation,
          pickupLat: rideRequest.pickupLat,
          pickupLng: rideRequest.pickupLng,
          destinationLocation: rideRequest.destinationLocation,
          destinationLat: rideRequest.destinationLat,
          destinationLng: rideRequest.destinationLng,
          fare: rideRequest.estimatedFare,
          distance: rideRequest.estimatedDistance,
          estimatedDuration: rideRequest.estimatedDuration,
          status: 'accepted',
          startedAt: new Date().toISOString(),
          completedAt: null,
          passengerLat: rideRequest.pickupLat,
          passengerLng: rideRequest.pickupLng,
          driverLat: rideRequest.pickupLat, // Initial position
          driverLng: rideRequest.pickupLng,
        }));
        dispatch(setIncomingRequest(null));

        // Navigate to active ride screen
        navigation.replace('ActiveRide', { rideId: rideRequest.id });
      } else {
        Alert.alert('Error', response.data.error || 'Failed to accept ride');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to accept ride. Please try again.');
      console.error('Accept ride error:', error);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleRejectRide = async () => {
    if (!rideRequest) return;

    setIsRejecting(true);
    try {
      // Call API to reject ride
      await apiService.updateRideStatus(
        rideRequest.id,
        'rejected',
        'dummy-token'
      );

      dispatch(setIncomingRequest(null));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to reject ride. Please try again.');
      console.error('Reject ride error:', error);
    } finally {
      setIsRejecting(false);
    }
  };

  if (!rideRequest || requestExpired) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No active ride requests</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.timerCircle, countdownSeconds <= 10 && styles.timerCircleWarning]}>
          <Text style={[styles.timerValue, countdownSeconds <= 10 && styles.timerValueWarning]}>
            {countdownSeconds}
          </Text>
        </View>
        <Text style={styles.headerTitle}>New Ride Request</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Request Card - Animated */}
        <Animated.View style={[styles.requestCard, { transform: [{ scale: scaleEffect }] }]}>
          {/* Passenger Profile Section */}
          <View style={styles.passengerSection}>
            <View style={styles.passengerAvatar}>
              <Text style={styles.avatarInitial}>
                {rideRequest.passengerName?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.passengerInfo}>
              <Text style={styles.passengerName}>{rideRequest.passengerName}</Text>
              <View style={styles.ratingRow}>
                <MaterialCommunityIcons name="star" size={16} color="#f59e0b" />
                <Text style={styles.rating}>{rideRequest.passengerRating.toFixed(1)}</Text>
              </View>
            </View>
            <View style={styles.fareContainer}>
              <Text style={styles.fareSymbol}>$</Text>
              <Text style={styles.fareValue}>{rideRequest.estimatedFare.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Ride Details */}
          <View style={styles.detailsSection}>
            <View style={styles.routeContainer}>
              <View style={styles.routeLeft}>
                <View style={[styles.routeDot, { backgroundColor: Colors.primary }]} />
                <View style={styles.routeLine} />
                <View style={[styles.routeDot, { backgroundColor: Colors.white }]} />
              </View>
              
              <View style={styles.routeRight}>
                {/* Pickup */}
                <View style={styles.locationItem}>
                  <Text style={styles.detailLabel}>Pickup Location</Text>
                  <Text style={styles.detailValue} numberOfLines={2}>
                    {rideRequest.pickupLocation}
                  </Text>
                </View>

                {/* Dropoff */}
                <View style={styles.locationItem}>
                  <Text style={styles.detailLabel}>Dropoff Location</Text>
                  <Text style={styles.detailValue} numberOfLines={2}>
                    {rideRequest.destinationLocation}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Trip Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <MaterialCommunityIcons name="map-marker-distance" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.infoBoxValue}>{rideRequest.estimatedDistance.toFixed(1)} km</Text>
                <Text style={styles.infoBoxLabel}>Est. Distance</Text>
              </View>
            </View>
            <View style={styles.infoBox}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.infoBoxValue}>{rideRequest.estimatedDuration} min</Text>
                <Text style={styles.infoBoxLabel}>Est. Duration</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAcceptRide}
            disabled={isAccepting || isRejecting}
          >
            {isAccepting ? (
              <ActivityIndicator color={Colors.black} />
            ) : (
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons name="check-decagram" size={24} color={Colors.black} style={{ marginRight: 10 }} />
                <Text style={styles.acceptButtonText}>Accept Ride Request</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectButton}
            onPress={handleRejectRide}
            disabled={isRejecting || isAccepting}
          >
            <Text style={styles.rejectButtonText}>
              {isRejecting ? 'Rejecting...' : 'Decline Request'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  timerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  timerCircleWarning: {
    borderColor: Colors.error,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  timerValue: {
    fontSize: 40,
    fontWeight: '900',
    color: Colors.white,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  timerValueWarning: {
    color: Colors.error,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray500,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  requestCard: {
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 30,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  passengerSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerAvatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.black,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  passengerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  passengerName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: Colors.gray400,
    fontWeight: '700',
    marginLeft: 4,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  fareContainer: {
    alignItems: 'flex-end',
  },
  fareSymbol: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '800',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  fareValue: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  routeContainer: {
    flexDirection: 'row',
  },
  routeLeft: {
    alignItems: 'center',
    paddingVertical: 10,
    width: 30,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 5,
  },
  routeRight: {
    flex: 1,
    paddingLeft: 10,
  },
  locationItem: {
    marginBottom: 25,
  },
  detailLabel: {
    fontSize: 11,
    color: Colors.gray500,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  detailValue: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '700',
    lineHeight: 20,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.02)',
  },
  infoBoxValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  infoBoxLabel: {
    fontSize: 11,
    color: Colors.gray500,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  actionContainer: {
    gap: 16,
  },
  acceptButton: {
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.black,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  rejectButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray500,
    textDecorationLine: 'underline',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});

export default RideRequestScreen;
