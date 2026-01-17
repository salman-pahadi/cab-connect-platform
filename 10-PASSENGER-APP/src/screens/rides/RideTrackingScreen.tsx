import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { clearCurrentRide, setCurrentRide } from '@redux/slices/rideSlice';
import Colors from '../../theme/colors';
import rideService from '@services/rideService';

export const RideTrackingScreen = ({ route, navigation }: any) => {
  const { rideId } = route.params;
  const dispatch = useAppDispatch();
  const { currentRide } = useAppSelector((state) => state.rides);

  const [ride, setRide] = useState(currentRide);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    loadRideDetails();
    const interval = setInterval(loadRideDetails, 5000);
    return () => clearInterval(interval);
  }, [rideId]);

  const loadRideDetails = async () => {
    try {
      const rideData = await rideService.getRide(rideId);
      setRide(rideData);
      dispatch(setCurrentRide(rideData));
    } catch (error) {
      console.error('Error loading ride details:', error);
    }
  };

  const handleCancelRide = async () => {
    try {
      await rideService.cancelRide(rideId, 'Passenger cancelled');
      dispatch(clearCurrentRide());
      Alert.alert('Inquiry Cancelled', 'Your journey request has been removed.');
      navigation.goBack();
    } catch (error) {
      console.error('Error cancelling ride:', error);
      Alert.alert('Error', 'Unable to cancel at this moment.');
    } finally {
      setShowCancelConfirm(false);
    }
  };

  const handleRideComplete = async () => {
    try {
      await rideService.completeRide(rideId, {
        actual_distance_km: ride?.actual_distance_km || 10,
        actual_duration_minutes: ride?.actual_duration_minutes || 20,
        actual_fare: ride?.actual_fare || ride?.estimated_fare || 0,
      });
      dispatch(clearCurrentRide());
      Alert.alert('Journey Completed', 'We hope you enjoyed the premium experience.');
      navigation.navigate('RideRating', { rideId });
    } catch (error) {
      console.error('Error completing ride:', error);
      Alert.alert('Error', 'Technical difficulty completing trip.');
    }
  };

  if (!ride) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const statusColor = {
    pending: '#fbbf24',
    accepted: '#3b82f6',
    driver_arriving: '#8b5cf6',
    arrived: '#10b981',
    in_progress: '#10b981',
    completed: '#10b981',
    cancelled: '#ef4444',
  }[ride.status] || Colors.primary;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Map */}
      <View style={styles.mapFullscreen}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: (ride.pickup_latitude + ride.dropoff_latitude) / 2,
            longitude: (ride.pickup_longitude + ride.dropoff_longitude) / 2,
            latitudeDelta: Math.abs(ride.pickup_latitude - ride.dropoff_latitude) * 2 || 0.05,
            longitudeDelta: Math.abs(ride.pickup_longitude - ride.dropoff_longitude) * 2 || 0.05,
          }}
        >
          <Marker coordinate={{ latitude: ride.pickup_latitude, longitude: ride.pickup_longitude }}>
            <View style={[styles.premiumMarker, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <View style={[styles.markerCore, { backgroundColor: '#10b981' }]} />
            </View>
          </Marker>
          <Marker coordinate={{ latitude: ride.dropoff_latitude, longitude: ride.dropoff_longitude }}>
            <View style={[styles.premiumMarker, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <View style={[styles.markerCore, { backgroundColor: '#ef4444' }]} />
            </View>
          </Marker>
          <Polyline
            coordinates={[
              { latitude: ride.pickup_latitude, longitude: ride.pickup_longitude },
              { latitude: ride.dropoff_latitude, longitude: ride.dropoff_longitude },
            ]}
            strokeColor="#10b981"
            strokeWidth={3}
          />
        </MapView>
      </View>

      {/* Floating Header */}
      <View style={styles.floatingHeader}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.statusPill}>
          <Text style={[styles.statusPillText, { color: statusColor }]}>{ride.status.replace('_', ' ').toUpperCase()}</Text>
        </View>
      </View>

      {/* Bottom Info Drawer */}
      <ScrollView 
        style={styles.drawerScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: height * 0.55 }} />
        
        <View style={styles.premiumDrawer}>
          <View style={styles.drawerHandle} />
          
          {/* Driver Section */}
          {ride.driver ? (
            <View style={styles.driverProfile}>
              <View style={styles.driverAvatar}>
                <MaterialCommunityIcons name="account" size={32} color={Colors.primary} />
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{ride.driver.name}</Text>
                <Text style={styles.vehicleInfo}>{ride.driver.vehicle_model} • {ride.driver.vehicle_number}</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <MaterialCommunityIcons name="phone" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.findingPanel}>
              <ActivityIndicator color={Colors.primary} />
              <Text style={styles.findingText}>Matching with premium captain...</Text>
            </View>
          )}

          {/* OTP Section */}
          {ride.status === 'accepted' && ride.otp_code && (
            <View style={styles.otpBanner}>
              <Text style={styles.otpLabel}>SECURITY AUTHENTICATION CODE</Text>
              <Text style={styles.otpValue}>{ride.otp_code}</Text>
            </View>
          )}

          {/* Ride Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SERVICE</Text>
              <Text style={styles.detailValue}>{ride.ride_type.toUpperCase()}</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>FARE</Text>
              <Text style={[styles.detailValue, { color: Colors.primary }]}>FJD {ride.estimated_fare.toFixed(2)}</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>DISTANCE</Text>
              <Text style={styles.detailValue}>{ride.estimated_distance_km?.toFixed(1)} KM</Text>
            </View>
          </View>

          {/* Route Section */}
          <View style={styles.routeBox}>
            <View style={styles.routeItem}>
              <View style={[styles.routeDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.routeText} numberOfLines={1}>{ride.pickup_address}</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeItem}>
              <View style={[styles.routeDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.routeText} numberOfLines={1}>{ride.dropoff_address}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            {ride.status === 'pending' && (
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => setShowCancelConfirm(true)}
              >
                <Text style={styles.cancelBtnText}>Abort Journey</Text>
              </TouchableOpacity>
            )}

            {ride.status === 'in_progress' && (
              <TouchableOpacity 
                style={styles.completeBtn} 
                onPress={handleRideComplete}
              >
                <Text style={styles.completeBtnText}>Finalize Trip</Text>
              </TouchableOpacity>
            )}

            {ride.status === 'completed' && (
              <TouchableOpacity 
                style={styles.homeBtn} 
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.homeBtnText}>Return Home</Text>
              </TouchableOpacity>
            )}
          </View>

          {showCancelConfirm && (
            <View style={styles.modalBackdrop}>
              <View style={styles.confirmModal}>
                <Text style={styles.confirmTitle}>Cancel Request?</Text>
                <Text style={styles.confirmSub}>Are you sure you want to abort this journey?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalBtnSec} onPress={() => setShowCancelConfirm(false)}>
                    <Text style={styles.modalBtnSecText}>No, Keep</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBtnPrimary} onPress={handleCancelRide}>
                    <Text style={styles.modalBtnPrimaryText}>Yes, Abort</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapFullscreen: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
  },
  floatingHeader: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerBack: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusPill: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  drawerScroll: {
    flex: 1,
  },
  premiumDrawer: {
    backgroundColor: '#0a0a0a',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  drawerHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  driverProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  driverInfo: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  vehicleInfo: {
    color: Colors.gray500,
    fontSize: 13,
    marginTop: 2,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findingPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
  },
  findingText: {
    color: Colors.primary,
    fontWeight: '800',
    marginLeft: 15,
    fontSize: 14,
  },
  otpBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
  },
  otpLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  otpValue: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 8,
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  detailLabel: {
    color: Colors.gray600,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  routeBox: {
    padding: 16,
    backgroundColor: '#121212',
    borderRadius: 24,
    marginBottom: 32,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  routeText: {
    color: Colors.gray300,
    fontSize: 13,
    flex: 1,
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginLeft: 3.5,
    marginVertical: 4,
  },
  actionSection: {
    gap: 16,
  },
  cancelBtn: {
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  cancelBtnText: {
    color: '#ef4444',
    fontWeight: '800',
  },
  completeBtn: {
    height: 60,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBtnText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
  },
  homeBtn: {
    height: 60,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
  premiumMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerCore: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalBackdrop: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    left: -24,
    right: -24,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  confirmModal: {
    backgroundColor: '#121212',
    width: '90%',
    padding: 30,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  confirmTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  confirmSub: {
    color: Colors.gray500,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtnSec: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnSecText: {
    color: '#fff',
    fontWeight: '800',
  },
  modalBtnPrimary: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnPrimaryText: {
    color: '#fff',
    fontWeight: '800',
  }
});

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#212121" }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#212121" }]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{ "color": "#181818" }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{ "color": "#181818" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#2c2c2c" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#0a0a0a" }]
  }
];

