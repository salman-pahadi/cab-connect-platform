import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import Colors from '@/theme/colors';
import Logo from '@/components/common/Logo';

const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.85)).current;
  useWindowDimensions();

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3200);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Icon Area */}
        <View style={styles.brandingWrapper}>
          <View style={styles.eliteRing}>
            <Logo size={100} />
          </View>
          
          <Text style={styles.brandTitle}>
            FIJI CAB<Text style={{ color: Colors.primary }}> CONNECT</Text>
          </Text>
          <Text style={styles.partnerBadge}>EXECUTIVE PARTNER</Text>
        </View>
      </Animated.View>

      {/* Modern Loader */}
      <View style={styles.loaderContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressIndicator, { opacity: fadeAnim }]} />
        </View>
        <Text style={styles.missionText}>INITIALIZING EXCELLENCE...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  brandingWrapper: {
    alignItems: 'center',
  },
  eliteRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    marginBottom: 40,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  partnerBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 6,
    marginTop: 10,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: 200,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressIndicator: {
    width: '40%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  missionText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 3,
  }
});

export default SplashScreen;
