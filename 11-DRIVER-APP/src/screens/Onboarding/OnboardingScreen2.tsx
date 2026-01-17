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

const OnboardingScreen2 = ({ onNext, onPrev, onComplete: _onComplete }: { onNext: () => void; onPrev: () => void; onComplete?: () => void }) => {
  const { height } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <View style={{ minHeight: height }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>How it Works</Text>
          <Text style={styles.headerSubtitle}>Simple 4-step process to earn</Text>
        </View>

        {/* Steps Section */}
        <View style={styles.stepsSection}>
          {[
            {
              id: 1,
              title: 'Go Online',
              desc: "Toggle your status to Online and you're ready to accept rides",
              icon: 'power',
            },
            {
              id: 2,
              title: 'Get Ride Requests',
              desc: 'See passenger location and accept rides that match your route',
              icon: 'car-clock',
            },
            {
              id: 3,
              title: 'Pick & Drop',
              desc: 'Navigate with built-in GPS and complete the ride',
              icon: 'map-marker-distance',
            },
            {
              id: 4,
              title: 'Earn & Rate',
              desc: 'Get paid immediately and rate the passenger',
              icon: 'cash-check',
            },
          ].map((step) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{step.id}</Text>
                </View>
                <View style={styles.stepIconWrapper}>
                  <MaterialCommunityIcons name={step.icon as any} size={24} color={Colors.primary} />
                </View>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Key Features</Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <MaterialCommunityIcons name="google-maps" size={32} color={Colors.primary} />
              <Text style={styles.featureName}>Live Tracking</Text>
            </View>
            <View style={styles.featureCard}>
              <MaterialCommunityIcons name="chat-processing-outline" size={32} color="#3b82f6" />
              <Text style={styles.featureName}>Instant Chat</Text>
            </View>
            <View style={styles.featureCard}>
              <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={32} color="#a78bfa" />
              <Text style={styles.featureName}>Earnings Stats</Text>
            </View>
            <View style={styles.featureCard}>
              <MaterialCommunityIcons name="bell-ring-outline" size={32} color="#f59e0b" />
              <Text style={styles.featureName}>Smart Alerts</Text>
            </View>
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
  stepsSection: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    gap: 16,
  },
  stepCard: {
    backgroundColor: Colors.darkSecondary,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.black,
  },
  stepIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: '47%',
    backgroundColor: Colors.darkSecondary,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  featureName: {
    fontSize: 13,
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

export default OnboardingScreen2;
