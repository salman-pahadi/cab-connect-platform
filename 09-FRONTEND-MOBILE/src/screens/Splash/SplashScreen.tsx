import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator, 
  Text, 
  Animated, 
  Dimensions,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import Logo from '../../components/common/Logo';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for a premium feel
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.premiumIconContainer}>
            <Logo size={120} />
            <View style={styles.glowCircle} />
          </View>
          
          <Text style={styles.brandTitle}>FIJI CAB</Text>
          <Text style={styles.brandSubtitle}>CONNECT</Text>
        </Animated.View>

        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.tagline}>ELITE TRANSPORT EXCELLENCE</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  premiumIconContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  glowCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 4,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 3,
    marginTop: 20,
    textTransform: 'uppercase',
  },
});
