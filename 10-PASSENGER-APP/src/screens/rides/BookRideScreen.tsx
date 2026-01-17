import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '@redux/store';
import { setCurrentRide } from '@redux/slices/rideSlice';
import Colors from '../../theme/colors';
import rideService from '@services/rideService';

const { width } = Dimensions.get('window');

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export const BookRideScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [rideType, setRideType] = useState<'economy' | 'comfort' | 'premium'>('economy');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet' | 'upi'>('cash');
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const mockPickupLocation: Location = {
    latitude: -18.1416,
    longitude: 178.4419,
    address: 'Grand Pacific Hotel, Suva',
  };

  const mockDropoffLocation: Location = {
    latitude: -18.1481,
    longitude: 178.4357,
    address: 'Suva Harbor, Fiji',
  };

  useEffect(() => {
    // Simulate finding location in Fiji
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
      // Estimating fare (removed setEstimatingFare state)
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
    }
  };

  const handleSetDropoff = () => {
    setDropoffLocation(mockDropoffLocation);
  };

  const handleRequestRide = async () => {
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert('Selection Required', 'Please identify your destination for the journey.');
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
      Alert.alert('Booking Confirmed', 'Your premium transport is being arranged.');
      navigation.navigate('RideTracking', { rideId: ride.id });
    } catch (error) {
      console.error('Error requesting ride:', error);
      Alert.alert('Error', 'Service is currently unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Map View - Fills more space now */}
      <View style={styles.mapFullscreen}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: -18.1416,
            longitude: 178.4419,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {pickupLocation && (
            <Marker
              coordinate={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
              }}
            >
              <View style={styles.premiumMarker}>
                <View style={[styles.markerCore, { backgroundColor: Colors.primary }]} />
                <View style={[styles.markerPulse, { backgroundColor: Colors.primary }]} />
              </View>
            </Marker>
          )}
          {dropoffLocation && (
            <Marker
              coordinate={{
                latitude: dropoffLocation.latitude,
                longitude: dropoffLocation.longitude,
              }}
            >
              <View style={styles.premiumMarker}>
                <View style={[styles.markerCore, { backgroundColor: '#ef4444' }]} />
              </View>
            </Marker>
          )}
        </MapView>
      </View>

      <TouchableOpacity 
        style={styles.backFab}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="chevron-left" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Control Panel - Floating Style */}
      <ScrollView 
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.spacer} />

        <View style={styles.premiumPanel}>
          {/* Journey Header */}
          <View style={styles.journeyHeader}>
            <Text style={styles.journeyTitle}>Secure Your Journey</Text>
            <View style={styles.premiumBadge}>
              <MaterialCommunityIcons name="shield-check" size={14} color={Colors.primary} />
              <Text style={styles.premiumBadgeText}>Premium Safety</Text>
            </View>
          </View>

          {/* Locations Card */}
          <View style={styles.locationCard}>
            <View style={styles.locationLine}>
              <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
              <View style={styles.dashedLine} />
              <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
            </View>

            <View style={styles.addressList}>
              <View style={styles.addressItem}>
                <Text style={styles.label}>Pick up</Text>
                <Text style={styles.addressText} numberOfLines={1}>{pickupLocation?.address || 'Locating...'}</Text>
              </View>
              
              <View style={styles.addressItem}>
                <Text style={styles.label}>Drop off</Text>
                {!dropoffLocation ? (
                  <TouchableOpacity onPress={handleSetDropoff}>
                    <Text style={[styles.addressText, { color: Colors.primary }]}>Tap to set destination</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.addressText} numberOfLines={1}>{dropoffLocation.address}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Vehicle Experience */}
          <Text style={styles.panelSectionTitle}>Experience Levels</Text>
          <View style={styles.vehicleGrid}>
            {(['economy', 'comfort', 'premium'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.vehicleCard, rideType === type && styles.vehicleCardActive]}
                onPress={() => setRideType(type)}
              >
                <View style={[styles.vehicleIconBg, rideType === type && { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                  <MaterialCommunityIcons 
                    name={type === 'economy' ? 'car-side' : type === 'comfort' ? 'car-sports' : 'crown-outline'} 
                    size={28} 
                    color={rideType === type ? Colors.primary : Colors.gray500} 
                  />
                </View>
                <Text style={[styles.vehicleName, rideType === type && { color: '#fff' }]}>
                  {type === 'economy' ? 'Executive' : type === 'comfort' ? 'Lounge' : 'Elite'}
                </Text>
                <Text style={styles.vehicleEta}>5 min</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Payment & Request Section */}
          <View style={styles.finalActions}>
            <TouchableOpacity 
              style={styles.paymentToggle}
              onPress={() => setPaymentMethod(paymentMethod === 'cash' ? 'card' : 'cash')}
            >
              <MaterialCommunityIcons 
                name={paymentMethod === 'cash' ? 'cash' : 'credit-card-outline'} 
                size={22} 
                color={Colors.primary} 
              />
              <Text style={styles.paymentToggleText}>{paymentMethod.toUpperCase()}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color={Colors.gray600} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.bookingButton, (!pickupLocation || !dropoffLocation) && styles.bookingButtonDisabled]}
              onPress={handleRequestRide}
              disabled={loading || !pickupLocation || !dropoffLocation}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Text style={styles.bookingButtonText}>Confirm Journey</Text>
                  {estimatedFare && (
                    <Text style={styles.bookingFare}>FJD {estimatedFare.toFixed(2)}</Text>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
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
  mapFullscreen: {
    ...StyleSheet.absoluteFillObject,
    height: '60%',
  },
  map: {
    flex: 1,
  },
  backFab: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contentScroll: {
    flex: 1,
  },
  spacer: {
    height: width * 0.8, // Push panel down
  },
  premiumPanel: {
    backgroundColor: '#0a0a0a',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    minHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  journeyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  premiumBadgeText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  locationLine: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    marginRight: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dashedLine: {
    width: 1,
    height: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  addressList: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addressItem: {
    height: 40,
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1,
  },
  addressText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  panelSectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 4,
  },
  vehicleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  vehicleCard: {
    width: (width - 72) / 3,
    backgroundColor: '#121212',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  vehicleCardActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(16, 185, 129, 0.03)',
  },
  vehicleIconBg: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleName: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '800',
  },
  vehicleEta: {
    color: 'rgba(16, 185, 129, 0.8)',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  finalActions: {
    gap: 16,
  },
  paymentToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  paymentToggleText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 12,
  },
  bookingButton: {
    backgroundColor: Colors.primary,
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  bookingButtonDisabled: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    shadowOpacity: 0,
    elevation: 0,
  },
  bookingButtonText: {
    flex: 1,
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  bookingFare: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
  },
  premiumMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCore: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerPulse: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.2,
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

