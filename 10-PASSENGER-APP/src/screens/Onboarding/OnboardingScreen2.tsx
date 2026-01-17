import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface OnboardingScreen2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function OnboardingScreen2({ onNext, onBack }: OnboardingScreen2Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        {/* Premium Dark Gradient Effect */}
        <View style={styles.gradient} />

        {/* Top spacing */}
        <View style={styles.topSpacer} />

        {/* Main illustration area - Premium Iconography */}
        <View style={styles.illustrationContainer}>
          <View style={styles.glassCircle}>
            <MaterialCommunityIcons name="cellphone-marker" size={100} color="#10b981" />
            <View style={styles.floatingBadge}>
              <MaterialCommunityIcons name="check-bold" size={40} color="#fff" />
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.headline}>For Passengers</Text>
          <Text style={styles.subheadline}>Your journey, made simple</Text>

          <View style={styles.featuresList}>
            <View style={styles.benefitGlass}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="map-marker-path" size={24} color="#10b981" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Book Instantly</Text>
                <Text style={styles.featureDescription}>Enter destination & get connected in seconds</Text>
              </View>
            </View>

            <View style={styles.benefitGlass}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="radar" size={24} color="#10b981" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Track in Real-time</Text>
                <Text style={styles.featureDescription}>See driver location and ETA on live map</Text>
              </View>
            </View>

            <View style={styles.benefitGlass}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="shield-check-outline" size={24} color="#10b981" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Pay Securely</Text>
                <Text style={styles.featureDescription}>Cash or card - always transparent pricing</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.footer}>
          <View style={styles.progressDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    zIndex: -1,
  },
  topSpacer: {
    height: 40,
  },
  illustrationContainer: {
    height: height * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#10b981',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#0a0a0a',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  textContainer: {
    marginTop: 30,
  },
  headline: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  subheadline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
    lineHeight: 26,
    marginBottom: 24,
  },
  featuresList: {
    gap: 12,
  },
  benefitGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  featureTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  featureDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 28,
    right: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotActive: {
    width: 28,
    backgroundColor: '#10b981',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 35,
    gap: 10,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '600',
  },
});
