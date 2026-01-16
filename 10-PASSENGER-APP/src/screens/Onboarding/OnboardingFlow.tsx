import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import OnboardingScreen4 from './OnboardingScreen4';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      component: OnboardingScreen1,
      props: {
        onNext: () => setCurrentScreen(1),
      },
    },
    {
      component: OnboardingScreen2,
      props: {
        onNext: () => setCurrentScreen(2),
        onBack: () => setCurrentScreen(0),
      },
    },
    {
      component: OnboardingScreen3,
      props: {
        onNext: () => setCurrentScreen(3),
        onBack: () => setCurrentScreen(1),
      },
    },
    {
      component: OnboardingScreen4,
      props: {
        onComplete,
        onBack: () => setCurrentScreen(2),
      },
    },
  ];

  const { component: CurrentScreen, props } = screens[currentScreen];

  return (
    <View style={styles.container}>
      <CurrentScreen {...props as any} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
