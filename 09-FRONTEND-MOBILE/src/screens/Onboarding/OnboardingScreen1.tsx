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

interface OnboardingScreen1Props {
  onNext: () => void;
}

export default function OnboardingScreen1({ onNext }: OnboardingScreen1Props) {
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
            <MaterialCommunityIcons name="island" size={100} color="#10b981" />
            <View style={styles.taxiBadge}>
              <MaterialCommunityIcons name="taxi" size={45} color="#fff" />
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.headline}>Ride Anywhere in Fiji</Text>

          <Text style={styles.subheadline}>
            Premium island transportation at your fingertips. Safe, reliable, and uniquely Fijian.
          </Text>

          <View style={styles.benefitsContainer}>
            <View style={styles.benefitGlass}>
              <MaterialCommunityIcons name="flash" size={24} color="#10b981" />
              <Text style={styles.benefitText}>Book in seconds</Text>
            </View>
            <View style={styles.benefitGlass}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#10b981" />
              <Text style={styles.benefitText}>Verified local drivers</Text>
            </View>
            <View style={styles.benefitGlass}>
              <MaterialCommunityIcons name="currency-usd" size={24} color="#10b981" />
              <Text style={styles.benefitText}>Transparent Fiji pricing</Text>
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.footer}>
          <View style={styles.progressDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity style={styles.button} onPress={onNext}>
            <Text style={styles.buttonText}>Next</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
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
  taxiBadge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#10b981',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#0a0a0a',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  textContainer: {
    marginTop: 50,
  },
  headline: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'left',
    letterSpacing: -1,
  },
  subheadline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'left',
    marginTop: 16,
    lineHeight: 26,
  },
  benefitsContainer: {
    marginTop: 32,
    gap: 12,
  },
  benefitGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  benefitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 14,
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
  button: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
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
    fontSize: 18,
    fontWeight: '800',
  },
});

