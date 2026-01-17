import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Verification: {
    userId: string;
    verificationType: 'email' | 'phone';
  };
  ForgotPassword: undefined;
  ResetPassword: {
    identifier: string;
    verificationType: 'email' | 'phone';
  };
  OTPVerification: {
    phoneNumber: string;
    userType: 'passenger' | 'driver';
  };
  Registration: {
    userType: 'passenger' | 'driver';
  };
  Home: undefined;
  MainApp: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Verification: {
    userId: string;
    verificationType: 'email' | 'phone';
  };
  ForgotPassword: undefined;
  ResetPassword: {
    identifier: string;
    verificationType: 'email' | 'phone';
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
