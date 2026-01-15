import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SectionList,
  Modal,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { setRideHistory, setRideLoading } from '@/redux/slices/rideSlice';
import apiService from '@/services/apiService';
import Colors from '@/theme/colors';

interface RideHistoryItem {
  id: string;
  passengerName: string;
  pickupLocation: string;
  destinationLocation: string;
  fare: number;
  distance?: number;
  duration?: number;
  completedAt: string | null;
  rating?: number;
  hasRated?: boolean;
}

const RideHistoryScreen = ({ navigation: _navigation }: any) => {
  const dispatch = useAppDispatch();
  const driver = useAppSelector((state: RootState) => state.driver);
  const rideHistory = useAppSelector((state: RootState) => state.ride.rideHistory);
  const isLoading = useAppSelector((state: RootState) => state.ride.isLoading);

  const [filterType, setFilterType] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [selectedRide, setSelectedRide] = useState<RideHistoryItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Load ride history on mount
  useEffect(() => {
    loadRideHistory();
  }, [driver.id]);

  const loadRideHistory = async () => {
    if (!driver.id) return;

    dispatch(setRideLoading(true));
    try {
      const response = await apiService.getRideHistory(driver.id, 'dummy-token');
      if (response.data.success) {
        dispatch(setRideHistory(response.data.data || []));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load ride history');
      console.error('Load history error:', error);
    } finally {
      dispatch(setRideLoading(false));
    }
  };

  const getFilteredRides = () => {
    const now = new Date();
    return rideHistory.filter((ride: any) => {
      const completedAt = ride.completedAt || ride.startedAt || new Date().toISOString();
      const rideDate = new Date(completedAt);
      const daysDiff = Math.floor((now.getTime() - rideDate.getTime()) / (1000 * 60 * 60 * 24));

      switch (filterType) {
        case 'today':
          return daysDiff === 0;
        case 'week':
          return daysDiff <= 7;
        case 'month':
          return daysDiff <= 30;
        default:
          return true;
      }
    }) as any[];
  };

  const groupRidesByDate = (rides: RideHistoryItem[]) => {
    const grouped: { [key: string]: RideHistoryItem[] } = {};

    rides.forEach(ride => {
      const date = new Date(ride.completedAt || new Date().toISOString()).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(ride);
    });

    return Object.entries(grouped).map(([date, data]) => ({
      title: date,
      data,
    }));
  };

  const handleRateRide = (ride: RideHistoryItem) => {
    setSelectedRide(ride);
    setShowRatingModal(true);
  };

  const handleSubmitRating = (rating: number) => {
    if (!selectedRide) return;
    Alert.alert('Thank you!', `You rated ${selectedRide.passengerName} ${rating} stars.`, [
      { 
        text: 'OK', 
        onPress: () => {
          setShowRatingModal(false);
          setShowDetailModal(false);
        } 
      },
    ]);
  };

  const handleDownloadReceipt = (_ride: RideHistoryItem) => {
    Alert.alert('Hello!', 'Receipt download feature is coming soon!');
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '--:--';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const filteredRides = getFilteredRides();
  const groupedRides = groupRidesByDate(filteredRides);

  if (isLoading && rideHistory.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading your trips...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderRideItem = ({ item: ride }: { item: RideHistoryItem }) => (
    <View style={styles.glassCardWrapper}>
      <TouchableOpacity
        style={styles.rideCardGlass}
        onPress={() => {
          setSelectedRide(ride);
          setShowDetailModal(true);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.rideCardContent}>
          <View style={styles.timeAndRoute}>
            <Text style={styles.rideTime}>{formatTime(ride.completedAt)}</Text>
            <View style={styles.routeIndicator}>
              <View style={styles.routeDot} />
              <View style={styles.routeLine} />
              <View style={[styles.routeDot, { backgroundColor: Colors.primary }]} />
            </View>
          </View>

          <View style={styles.routeDetails}>
            <Text style={styles.pickupText} numberOfLines={1}>
              {ride.pickupLocation}
            </Text>
            <Text style={styles.dropoffText} numberOfLines={1}>
              {ride.destinationLocation}
            </Text>
          </View>

          <View style={styles.fareAmount}>
            <Text style={styles.currency}>FJD</Text>
            <Text style={styles.amount}>${ride.fare.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Trip Logs</Text>
          <Text style={styles.headerSubtitle}>{filteredRides.length} journeys completed</Text>
        </View>
        <TouchableOpacity 
          style={styles.refreshButtonGlass}
          onPress={loadRideHistory}
        >
          <MaterialCommunityIcons name="refresh" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {(['all', 'today', 'week', 'month'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterTabGlass,
                filterType === type && styles.activeFilterTabGlass,
              ]}
              onPress={() => setFilterType(type)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  filterType === type && styles.activeFilterTabText,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredRides.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircleGlass}>
            <MaterialCommunityIcons name="car-off" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>No Rides Yet</Text>
          <Text style={styles.emptyText}>
            Your completed journeys will appear here
          </Text>
        </View>
      ) : (
        <SectionList
          sections={groupedRides}
          keyExtractor={(item) => item.id}
          renderItem={renderRideItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
        />
      )}


      {/* Ride Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Trip Details</Text>
              <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={Colors.gray500} />
              </TouchableOpacity>
            </View>

            {selectedRide && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalBody}>
                  {/* Summary Card */}
                  <View style={styles.earningsCard}>
                    <Text style={styles.earningsLabel}>Total Earnings</Text>
                    <Text style={styles.earningsValue}>${selectedRide.fare.toFixed(2)}</Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Passenger</Text>
                    <View style={styles.passengerInfo}>
                      <View style={styles.avatarSmall}>
                        <Text style={styles.avatarText}>
                          {selectedRide.passengerName.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.passengerNameText}>{selectedRide.passengerName}</Text>
                      {!selectedRide.hasRated && (
                        <TouchableOpacity 
                          style={styles.inlineRateBtn}
                          onPress={() => handleRateRide(selectedRide)}
                        >
                          <MaterialCommunityIcons name="star-outline" size={16} color={Colors.primary} />
                          <Text style={styles.inlineRateTxt}>Rate</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Route</Text>
                    <View style={styles.modalRoute}>
                      <View style={styles.routeRow}>
                        <MaterialCommunityIcons name="circle-slice-8" size={16} color={Colors.primary} />
                        <View style={styles.addressBox}>
                          <Text style={styles.modalRouteLabel}>Pickup</Text>
                          <Text style={styles.modalRouteValue}>{selectedRide.pickupLocation}</Text>
                        </View>
                      </View>
                      <View style={styles.modalRouteDivider} />
                      <View style={styles.routeRow}>
                        <MaterialCommunityIcons name="map-marker" size={16} color="#ef4444" />
                        <View style={styles.addressBox}>
                          <Text style={styles.modalRouteLabel}>Dropoff</Text>
                          <Text style={styles.modalRouteValue}>{selectedRide.destinationLocation}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Trip Stats</Text>
                    <View style={styles.modalDetailsGrid}>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Distance</Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedRide.distance?.toFixed(1) || '0.0'} km
                        </Text>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Duration</Text>
                        <Text style={styles.modalDetailValue}>
                          {selectedRide.duration || '0'} mins
                        </Text>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>Date</Text>
                        <Text style={styles.modalDetailValue}>
                          {new Date(selectedRide.completedAt || "").toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.modalDetailItem}>
                        <Text style={styles.modalDetailLabel}>ID</Text>
                        <Text style={styles.modalDetailValue}>#{selectedRide.id.slice(0, 8)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={[styles.modalActionButton, styles.modalActionButtonClose]}
                onPress={() => setShowDetailModal(false)}
              >
                <Text style={styles.modalActionButtonCloseText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalActionButton}
                onPress={() => selectedRide && handleDownloadReceipt(selectedRide)}
              >
                <MaterialCommunityIcons name="download" size={20} color={Colors.black} style={{marginRight: 6}} />
                <Text style={styles.modalActionButtonText}>Receipt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        transparent
        animationType="fade"
      >
        <View style={styles.ratingOverlay}>
          <View style={styles.ratingCard}>
            <Text style={styles.ratingTitle}>Rate Passenger</Text>
            <Text style={styles.ratingSub}>How was your trip with {selectedRide?.passengerName}?</Text>
            
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => handleSubmitRating(s)}>
                  <MaterialCommunityIcons name="star" size={40} color={Colors.primary} />
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.cancelRatingBtn}
              onPress={() => setShowRatingModal(false)}
            >
              <Text style={styles.cancelRatingTxt}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: Colors.gray400,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  refreshButtonGlass: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterContainer: {
    paddingVertical: 15,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterTabGlass: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeFilterTabGlass: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray400,
  },
  activeFilterTabText: {
    color: Colors.black,
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  glassCardWrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  rideCardGlass: {
    padding: 20,
  },
  rideCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAndRoute: {
    alignItems: 'center',
    width: 60,
  },
  rideTime: {
    fontSize: 11,
    color: Colors.gray400,
    fontWeight: '800',
    marginBottom: 8,
  },
  routeIndicator: {
    alignItems: 'center',
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray800,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 4,
  },
  routeDetails: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pickupText: {
    fontSize: 14,
    color: Colors.gray300,
    fontWeight: '600',
    marginBottom: 20,
  },
  dropoffText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '700',
  },
  fareAmount: {
    alignItems: 'flex-end',
  },
  currency: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '900',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyIconCircleGlass: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.gray500,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F0F0F',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 12,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.gray800,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.white,
  },
  modalBody: {
    paddingHorizontal: 24,
  },
  earningsCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    marginBottom: 24,
  },
  earningsLabel: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  earningsValue: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.white,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.gray600,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkSecondary,
    padding: 12,
    borderRadius: 15,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: Colors.black,
    fontWeight: '900',
  },
  passengerNameText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '700',
    flex: 1,
  },
  inlineRateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  inlineRateTxt: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  modalRoute: {
    backgroundColor: Colors.darkSecondary,
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  routeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addressBox: {
    flex: 1,
  },
  modalRouteLabel: {
    fontSize: 11,
    color: Colors.gray500,
    marginBottom: 2,
    fontWeight: '700',
  },
  modalRouteValue: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
  },
  modalRouteDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 28,
  },
  modalDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modalDetailItem: {
    width: '48%',
    backgroundColor: Colors.darkSecondary,
    borderRadius: 15,
    padding: 16,
  },
  modalDetailLabel: {
    fontSize: 11,
    color: Colors.gray500,
    marginBottom: 4,
    fontWeight: '700',
  },
  modalDetailValue: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '800',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  modalActionButton: {
    flex: 1,
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '800',
  },
  modalActionButtonClose: {
    backgroundColor: Colors.darkSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalActionButtonCloseText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  ratingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ratingCard: {
    width: '100%',
    backgroundColor: Colors.dark,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 8,
  },
  ratingSub: {
    fontSize: 15,
    color: Colors.gray500,
    textAlign: 'center',
    marginBottom: 30,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  cancelRatingBtn: {
    padding: 10,
  },
  cancelRatingTxt: {
    color: Colors.gray500,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RideHistoryScreen;
