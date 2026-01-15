import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTPVerification: {
    phoneNumber: string;
    userType: 'passenger' | 'driver';
  };
  Registration: {
    userType: 'passenger' | 'driver';
  };
  Home: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
