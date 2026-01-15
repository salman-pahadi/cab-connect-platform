import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

const { width } = Dimensions.get('window');

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Book in Seconds',
    subtitle: 'Fast & Easy',
    description:
      'Enter your destination and get connected with a verified driver instantly. No waiting, no hassle.',
    icon: 'car-clock',
    color: '#10b981',
  },
  {
    id: '2',
    title: 'Safe & Secure',
    subtitle: 'Your Safety First',
    description:
      'All drivers are verified with real-time tracking. Share your trip with loved ones for extra peace of mind.',
    icon: 'shield-check',
    color: '#0891b2',
  },
  {
    id: '3',
    title: 'Transparent Pricing',
    subtitle: 'Know Before You Go',
    description:
      'See your fare upfront with no hidden charges. Multiple payment options for your convenience.',
    icon: 'cash-multiple',
    color: '#f59e0b',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: width * index,
      animated: true,
    });
  };

  const renderSlide = (slide: OnboardingSlide) => (
    <View style={[styles.slide, { width }]}>
      {/* Background gradient effect */}
      <View style={[styles.slideBackground, { backgroundColor: slide.color }]} />

      {/* Content */}
      <View style={styles.slideContent}>
        {/* Icon */}
        <View style={styles.imageContainer}>
          <View style={[styles.iconCircle, { backgroundColor: slide.color }]}>
            <MaterialCommunityIcons
              name={slide.icon}
              size={120}
              color="#ffffff"
            />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Skip button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id}>
            {renderSlide(slide)}
          </View>
        ))}
      </ScrollView>

      {/* Dots Pagination */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex
                    ? slides[currentIndex].color
                    : 'rgba(0, 0, 0, 0.2)',
                width: index === currentIndex ? 28 : 10,
              },
            ]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: slides[currentIndex].color }]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
  },
  slideBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    opacity: 0.1,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  slideImage: {
    width: width * 0.7,
    height: width * 0.7,
  },
  textContainer: {
    flex: 0.55,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
