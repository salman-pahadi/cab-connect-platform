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

const OnboardingScreen1 = ({ onNext, onPrev: _onPrev, onComplete: _onComplete }: { onNext: () => void; onPrev?: () => void; onComplete?: () => void }) => {
  const { height } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <View style={{ minHeight: height }}>
        {/* Header with logo */}
        <View style={styles.headerContainer}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="car-connected" size={40} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Welcome to Cab Connect</Text>
          <Text style={styles.headerSubtitle}>Drive & Earn Premium Rates</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroIconCircle}>
              <MaterialCommunityIcons name="steering" size={40} color={Colors.primary} />
            </View>
            <Text style={styles.heroText}>Be Your Own Boss</Text>
            <Text style={styles.heroDescription}>
              Join thousands of drivers earning money on their own schedule in Fiji
            </Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <View style={styles.benefit}>
            <View style={[styles.benefitIcon, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <MaterialCommunityIcons name="currency-usd" size={24} color={Colors.primary} />
            </View>
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>Earn Daily</Text>
              <Text style={styles.benefitDesc}>Get paid instantly after each ride</Text>
            </View>
          </View>

          <View style={styles.benefit}>
            <View style={[styles.benefitIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="#3b82f6" />
            </View>
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>Your Schedule</Text>
              <Text style={styles.benefitDesc}>Work whenever you want, as much as you want</Text>
            </View>
          </View>

          <View style={styles.benefit}>
            <View style={[styles.benefitIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <MaterialCommunityIcons name="shield-check-outline" size={24} color="#ef4444" />
            </View>
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>Protected & Safe</Text>
              <Text style={styles.benefitDesc}>24/7 support and driver protection</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color={Colors.black} />
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
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: Colors.darkSecondary,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: Colors.darkSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  benefitsSection: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    gap: 16,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: Colors.darkSecondary,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    marginTop: 'auto',
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  nextButtonText: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: '800',
  },
});

export default OnboardingScreen1;
