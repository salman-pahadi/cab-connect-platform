import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { updateActiveRideStatus } from '@/redux/slices/rideSlice';
import apiService from '@/services/apiService';
import Colors from '@/theme/colors';

const ActiveRideScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const activeRide = useAppSelector((state: RootState) => state.ride.activeRide);
  const [isUpdating, setIsUpdating] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer for ride duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!activeRide) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No active ride</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleArrivedAtPickup = async () => {
    if (!activeRide) return;

    setIsUpdating(true);
    try {
      await apiService.updateRideStatus(
        activeRide.id,
        'arrived_pickup',
        'dummy-token'
      );

      dispatch(updateActiveRideStatus('arrived_pickup'));
      Alert.alert('Hello!', 'Passenger notified. Thank you!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update ride status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStartRide = async () => {
    if (!activeRide) return;

    setIsUpdating(true);
    try {
      await apiService.updateRideStatus(
        activeRide.id,
        'started',
        'dummy-token'
      );

      dispatch(updateActiveRideStatus('started'));
    } catch (error) {
      Alert.alert('Error', 'Failed to start ride');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEndRide = async () => {
    if (!activeRide) return;

    setIsUpdating(true);
    try {
      await apiService.updateRideStatus(
        activeRide.id,
        'completed',
        'dummy-token'
      );

      dispatch(updateActiveRideStatus('completed'));
      navigation.replace('RideCompletion', { rideId: activeRide.id });
    } catch (error) {
      Alert.alert('Error', 'Failed to complete ride');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes, Cancel',
          onPress: async () => {
            setIsUpdating(true);
            try {
              await apiService.updateRideStatus(
                activeRide.id,
                'cancelled',
                'dummy-token'
              );
              navigation.replace('Dashboard');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel ride');
            } finally {
              setIsUpdating(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleCallPassenger = () => {
    Linking.openURL(`tel:${activeRide.passengerPhone || '+679123456'}`);
  };

  const handleMessagePassenger = () => {
    // Navigate to chat screen (to be implemented)
    Alert.alert('Chat', 'In-app messaging coming soon');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return '#3b82f6'; // Professional Blue
      case 'arrived_pickup':
        return Colors.primary; // Emerald
      case 'started':
        return '#f59e0b'; // Amber
      case 'completed':
        return Colors.primary;
      default:
        return Colors.gray500;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      accepted: 'Pickup: En Route',
      arrived_pickup: 'Arrival: Notified',
      started: 'Trip: In Progress',
      completed: 'Trip: Completed',
      cancelled: 'Trip: Cancelled',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return 'navigation-variant';
      case 'arrived_pickup': return 'account-check';
      case 'started': return 'car-connected';
      case 'completed': return 'check-decagram';
      case 'cancelled': return 'close-octagon';
      default: return 'information';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButtonCircle} 
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Trip</Text>
        <TouchableOpacity style={styles.helpButton}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color={Colors.gray400} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Status Area */}
        <View style={styles.statusSection}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(activeRide.status) + '15', borderColor: getStatusColor(activeRide.status) + '30' },
            ]}
          >
            <MaterialCommunityIcons 
              name={getStatusIcon(activeRide.status)} 
              size={20} 
              color={getStatusColor(activeRide.status)} 
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.statusBadgeText, { color: getStatusColor(activeRide.status) }]}>
              {getStatusLabel(activeRide.status)}
            </Text>
          </View>
        </View>

        {/* Map & Timer Visualization */}
        <View style={styles.visualSection}>
          <View style={styles.timerOverlay}>
            <View style={styles.timerCircle}>
              <Text style={styles.timerValue}>{formatTime(elapsedTime)}</Text>
              <Text style={styles.timerLabel}>Duration</Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <View style={styles.mapGlow} />
              <MaterialCommunityIcons name="google-maps" size={48} color={Colors.primary} />
              <Text style={styles.mapTitle}>Route Active</Text>
              <Text style={styles.mapSubtitle}>Optimized by Fiji Cab Connect</Text>
            </View>
          </View>
        </View>

        {/* Passenger Surface */}
        <View style={styles.cardSurface}>
          <View style={styles.passengerRow}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBase}>
                <Text style={styles.avatarText}>
                  {activeRide.passengerName?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.onlineBadge} />
            </View>

            <View style={styles.passengerInfo}>
              <Text style={styles.passengerName}>{activeRide.passengerName}</Text>
              <View style={styles.ratingBox}>
                <MaterialCommunityIcons name="star" size={14} color="#f59e0b" />
                <Text style={styles.ratingText}>
                  {activeRide.passengerRating?.toFixed(1) || '5.0'}
                </Text>
                <View style={styles.dotSeparator} />
                <Text style={styles.tripCount}>Active Trip</Text>
              </View>
            </View>
            
            <View style={styles.actionIcons}>
              <TouchableOpacity
                style={styles.actionIconCircle}
                onPress={handleCallPassenger}
                disabled={isUpdating}
              >
                <MaterialCommunityIcons name="phone" size={20} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionIconCircle}
                onPress={handleMessagePassenger}
                disabled={isUpdating}
              >
                <MaterialCommunityIcons name="message-text" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalDivider} />

          {/* Path Details */}
          <View style={styles.routeSection}>
            <View style={styles.pathVisual}>
              <View style={[styles.pathNode, { backgroundColor: Colors.primary }]} />
              <View style={styles.pathLine} />
              <View style={[styles.pathNode, { backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.gray800 }]} />
            </View>
            
            <View style={styles.addressList}>
              <View style={styles.addressBox}>
                <Text style={styles.addressLabel}>Pickup</Text>
                <Text style={styles.addressText} numberOfLines={1}>
                  {activeRide.pickupLocation}
                </Text>
              </View>

              <View style={styles.addressBox}>
                <Text style={styles.addressLabel}>Destination</Text>
                <Text style={styles.addressText} numberOfLines={1}>
                  {activeRide.destinationLocation}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trip Analytics */}
        <View style={styles.analyticsRow}>
          <View style={[styles.analyticBox, { borderRightWidth: 1, borderRightColor: Colors.border }]}>
            <MaterialCommunityIcons name="map-marker-path" size={22} color={Colors.primary} />
            <View style={styles.analyticInfo}>
              <Text style={styles.analyticValue}>{activeRide.distance?.toFixed(1) || '0.0'} km</Text>
              <Text style={styles.analyticLabel}>Distance</Text>
            </View>
          </View>
          <View style={styles.analyticBox}>
            <MaterialCommunityIcons name="wallet-outline" size={22} color={Colors.primary} />
            <View style={styles.analyticInfo}>
              <Text style={styles.analyticValue}>${activeRide.fare?.toFixed(2) || '0.00'}</Text>
              <Text style={styles.analyticLabel}>Earnings</Text>
            </View>
          </View>
        </View>

        {/* Dynamic Action Zone */}
        <View style={styles.actionZone}>
          {activeRide.status === 'accepted' && (
            <TouchableOpacity
              style={[styles.mainActionButton, { backgroundColor: Colors.primary }]}
              onPress={handleArrivedAtPickup}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color={Colors.black} />
              ) : (
                <View style={styles.buttonInner}>
                  <MaterialCommunityIcons name="map-marker-check" size={24} color={Colors.black} style={{ marginRight: 12 }} />
                  <Text style={styles.buttonText}>I&apos;m Here</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {activeRide.status === 'arrived_pickup' && (
            <TouchableOpacity
              style={[styles.mainActionButton, { backgroundColor: Colors.primary }]}
              onPress={handleStartRide}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color={Colors.black} />
              ) : (
                <View style={styles.buttonInner}>
                  <MaterialCommunityIcons name="play-circle" size={24} color={Colors.black} style={{ marginRight: 12 }} />
                  <Text style={styles.buttonText}>Start Trip</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {activeRide.status === 'started' && (
            <TouchableOpacity
              style={[styles.mainActionButton, { backgroundColor: Colors.primary }]}
              onPress={handleEndRide}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color={Colors.black} />
              ) : (
                <View style={styles.buttonInner}>
                  <MaterialCommunityIcons name="flag-checkered" size={24} color={Colors.black} style={{ marginRight: 12 }} />
                  <Text style={styles.buttonText}>Complete Trip</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {(activeRide.status === 'accepted' || activeRide.status === 'arrived_pickup') && (
            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={handleCancelRide}
              disabled={isUpdating}
            >
              <Text style={styles.secondaryActionText}>Cancel This Trip</Text>
            </TouchableOpacity>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  helpButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  statusSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  statusBadge: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  statusBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  visualSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
  },
  mapContainer: {
    height: 240,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primary,
    opacity: 0.05,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 15,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  mapSubtitle: {
    fontSize: 13,
    color: Colors.gray500,
    marginTop: 4,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  timerOverlay: {
    position: 'absolute',
    top: -10,
    right: 15,
    zIndex: 10,
  },
  timerCircle: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: Colors.black,
    borderWidth: 3,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  timerValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  timerLabel: {
    fontSize: 9,
    color: Colors.gray400,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: -2,
  },
  cardSurface: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarBase: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: 'rgba(18, 18, 18, 1)',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  passengerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.gray400,
    marginLeft: 5,
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '700',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray700,
    marginHorizontal: 10,
  },
  tripCount: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 20,
  },
  routeSection: {
    flexDirection: 'row',
  },
  pathVisual: {
    width: 20,
    alignItems: 'center',
    paddingVertical: 4,
  },
  pathNode: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pathLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 4,
  },
  addressList: {
    flex: 1,
    marginLeft: 15,
    gap: 20,
  },
  addressBox: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 11,
    color: Colors.gray500,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: Colors.gray200,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  analyticsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    borderRadius: 24,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  analyticBox: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  analyticInfo: {
    flex: 1,
  },
  analyticValue: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.white,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  analyticLabel: {
    fontSize: 11,
    color: Colors.gray500,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  actionZone: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  mainActionButton: {
    height: 70,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.black,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  secondaryAction: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryActionText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray500,
    fontFamily: 'PlusJakartaSans-Bold',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray400,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});

export default ActiveRideScreen;
