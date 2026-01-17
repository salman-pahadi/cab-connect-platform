import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { addToRideHistory, setActiveRide } from '@/redux/slices/rideSlice';
import apiService from '@/services/apiService';

const RideCompletionScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const activeRide = useAppSelector((state: RootState) => state.ride.activeRide);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeRide) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No ride data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleRatePassenger = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = async () => {
    if (!selectedRating) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      // API call to submit rating
      await apiService.ratePassenger(
        activeRide.id,
        selectedRating,
        undefined
      );

      // Add to ride history
      const completedRide = {
        ...activeRide,
        rating: selectedRating,
        hasRated: true,
        completedAt: new Date().toISOString(),
      };

      dispatch(addToRideHistory(completedRide));
      dispatch(setActiveRide(null));

      // Show success and navigate back to dashboard
      Alert.alert(
        'Thank You!',
        `Rated ${activeRide.passengerName} - ${selectedRating} stars`,
        [
          {
            text: 'Back to Dashboard',
            onPress: () => navigation.replace('Dashboard'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating. Try again.');
      console.error('Rating error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipRating = () => {
    dispatch(setActiveRide(null));
    navigation.replace('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.successContainer}>
          <View style={styles.checkmarkCircle}>
            <MaterialCommunityIcons name="check-decagram" size={60} color="#10b981" />
          </View>
          <Text style={styles.successTitle}>Trip Completed</Text>
          <Text style={styles.successSubtitle}>Great work! View your earnings in FJD below</Text>
        </View>

        {/* Trip Logistics Card */}
        <View style={styles.cardSurface}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="map-clock" size={20} color="#10b981" />
            <Text style={styles.cardHeaderText}>Trip Logistics</Text>
          </View>

          {/* Passenger Info */}
          <View style={styles.passengerProfile}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>
                {activeRide.passengerName?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.passengerMeta}>
              <Text style={styles.passengerNameText}>{activeRide.passengerName}</Text>
              <View style={styles.ratingBadge}>
                <MaterialCommunityIcons name="star" size={12} color="#f59e0b" />
                <Text style={styles.ratingBadgeText}>
                  {activeRide.passengerRating?.toFixed(1) || '5.0'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DISTANCE</Text>
              <Text style={styles.metricValue}>{activeRide.distance?.toFixed(1)} km</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DURATION</Text>
              <Text style={styles.metricValue}>{activeRide.estimatedDuration || 15} min</Text>
            </View>
          </View>
        </View>

        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsContent}>
            <View>
              <Text style={styles.earningsLabel}>TOTAL EARNINGS</Text>
              <Text style={styles.fijiCurrency}>Fiji Cab Connect Revenue</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.amountValue}>{activeRide.fare?.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Rate Your Passenger</Text>
          <Text style={styles.feedbackSubtitle}>Help maintain service quality</Text>

          <View style={styles.starCluster}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRatePassenger(star)}
                activeOpacity={0.7}
                style={styles.starTouch}
              >
                <MaterialCommunityIcons 
                  name={selectedRating && star <= selectedRating ? "star" : "star-outline"} 
                  size={44} 
                  color={selectedRating && star <= selectedRating ? "#f59e0b" : "#333"} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {selectedRating ? (
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>
                {selectedRating === 5 && 'Outstanding'}
                {selectedRating === 4 && 'Recommended'}
                {selectedRating === 3 && 'Average'}
                {selectedRating === 2 && 'Poor'}
                {selectedRating === 1 && 'Not Recommended'}
              </Text>
            </View>
          ) : (
            <View style={styles.actionPrompt}>
              <MaterialCommunityIcons name="gesture-tap" size={18} color="#666" />
              <Text style={styles.actionPromptText}>Select star rating</Text>
            </View>
          )}
        </View>

        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={[styles.primaryAction, !selectedRating && styles.primaryActionDisabled]}
            onPress={handleSubmitRating}
            disabled={isSubmitting || !selectedRating}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#000000" size="small" />
            ) : (
              <Text style={styles.primaryActionText}>Complete Trip</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={handleSkipRating}
            disabled={isSubmitting}
          >
            <Text style={styles.secondaryActionText}>Skip Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 45,
  },
  checkmarkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    letterSpacing: -0.5,
  },
  successSubtitle: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  cardSurface: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  cardHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  passengerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#10b981',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  passengerMeta: {
    flex: 1,
  },
  passengerNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ratingBadgeText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '700',
    marginLeft: 4,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#1A1A1A',
    marginVertical: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#1A1A1A',
  },
  metricLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'PlusJakartaSans-Bold',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  earningsCard: {
    backgroundColor: '#10b981',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  earningsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 1,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  fijiCurrency: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbol: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '800',
    marginRight: 2,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  feedbackContainer: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  feedbackSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  starCluster: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  starTouch: {
    padding: 4,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10b981',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionPromptText: {
    fontSize: 14,
    color: '#444',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  footerActions: {
    gap: 12,
    marginBottom: 30,
  },
  primaryAction: {
    height: 60,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionDisabled: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryActionText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  secondaryAction: {
    height: 60,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});

export default RideCompletionScreen;

