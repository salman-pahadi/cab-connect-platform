import React, { useState } from 'react';
import { View } from 'react-native';

import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import OnboardingScreen4 from './OnboardingScreen4';

const OnboardingFlow = ({ navigation }: any) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [OnboardingScreen1, OnboardingScreen2, OnboardingScreen3, OnboardingScreen4];
  const CurrentScreen = screens[currentScreen];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleComplete = () => {
    // After onboarding, proceed to Login (do not authenticate yet)
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 0 && <CurrentScreen onNext={handleNext} onPrev={handlePrev} onComplete={handleComplete} />}
      {currentScreen === 1 && <CurrentScreen onNext={handleNext} onPrev={handlePrev} onComplete={handleComplete} />}
      {currentScreen === 2 && <CurrentScreen onNext={handleNext} onPrev={handlePrev} onComplete={handleComplete} />}
      {currentScreen === 3 && <CurrentScreen onNext={handleNext} onPrev={handlePrev} onComplete={handleComplete} />}
    </View>
  );
};

export default OnboardingFlow;
