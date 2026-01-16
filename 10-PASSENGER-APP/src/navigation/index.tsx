import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '@screens/Splash/SplashScreen';
import OnboardingScreen from '@screens/Onboarding/OnboardingScreen';
import HomeScreen from '@screens/home/HomeScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import SignupScreen from '@screens/auth/SignupScreen';
import VerificationScreen from '@screens/auth/VerificationScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '@screens/auth/ResetPasswordScreen';
import OTPVerificationScreen from '@screens/auth/OTPVerificationScreen';
import RegistrationScreen from '@screens/auth/RegistrationScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Cab Connect' }}
        />
        <Stack.Screen
          name="MainApp"
          component={HomeScreen}
          options={{ title: 'Cab Connect' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
