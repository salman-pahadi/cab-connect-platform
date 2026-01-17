import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/theme/colors';

const OnboardingScreen3 = ({ onNext, onPrev, onComplete: _onComplete }: { onNext: () => void; onPrev: () => void; onComplete?: () => void }) => {
  const { height } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <View style={{ minHeight: height }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Safety & Quality</Text>
          <Text style={styles.headerSubtitle}>We prioritize your peace of mind</Text>
        </View>

        {/* Safety Features */}
        <View style={styles.safetySection}>
          <View style={styles.safetyGrid}>
            {[
              { title: 'Verified Users', icon: 'shield-account-outline', color: '#10b981', desc: 'All passengers are pre-verified' },
              { title: '24/7 Support', icon: 'headphones', color: '#3b82f6', desc: 'Help is always one tap away' },
              { title: 'Live Tracking', icon: 'map-marker-radius', color: '#ef4444', desc: 'Real-time tracking for every ride' },
              { title: 'Reputation', icon: 'star-outline', color: '#f59e0b', desc: 'Build trust with transparent ratings' },
            ].map((item, idx) => (
              <View key={idx} style={styles.safetyCard}>
                <View style={[styles.safetyIconContainer, { backgroundColor: `${item.color}20` }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={32} color={item.color} />
                </View>
                <Text style={styles.safetyCardTitle}>{item.title}</Text>
                <Text style={styles.safetyCardText}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insurance Info */}
        <View style={styles.insuranceSection}>
          <View style={styles.insuranceCard}>
            <View style={styles.insuranceHeader}>
              <MaterialCommunityIcons name="shield-check" size={40} color={Colors.primary} />
              <View>
                <Text style={styles.insuranceTitle}>Protection Program</Text>
                <Text style={styles.insuranceBadge}>INCLUDED</Text>
              </View>
            </View>
            <Text style={styles.insuranceDescription}>
              Every ride includes accident coverage and liability protection for both you and your vehicle.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>Review Policy</Text>
              <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={onPrev}>
            <Text style={styles.prevButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: Colors.darkSecondary,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  safetySection: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  safetyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  safetyCard: {
    width: '47%',
    padding: 20,
    backgroundColor: Colors.darkSecondary,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 8,
  },
  safetyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
  },
  safetyCardText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  insuranceSection: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  insuranceCard: {
    padding: 24,
    backgroundColor: Colors.darkSecondary,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  insuranceTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
  },
  insuranceBadge: {
    fontSize: 10,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1,
    marginTop: 2,
  },
  insuranceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
    marginTop: 'auto',
    paddingBottom: 40,
  },
  prevButton: {
    flex: 1,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prevButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  nextButton: {
    flex: 2,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default OnboardingScreen3;
