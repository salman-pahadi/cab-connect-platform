import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@redux/hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/theme/colors';

import SplashScreen from '@screens/Splash/SplashScreen';
import OnboardingFlow from '@screens/Onboarding/OnboardingFlow';
import LoginScreen from '@screens/auth/LoginScreen';
import OTPVerificationScreen from '@screens/auth/OTPVerificationScreen';
import DriverDashboard from '@screens/Dashboard/DriverDashboard';
import RideHistoryScreen from '@screens/Rides/RideHistoryScreen';
import RidesNavigator from './RidesNavigator';
import type { RootState } from '@redux/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingVertical: 8,
          height: 65,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DriverDashboard}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="RidesTab"
        component={RidesNavigator}
        options={{
          title: 'Rides',
          tabBarLabel: 'Rides',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EarningsTab"
        component={RideHistoryScreen}
        options={{
          title: 'Earnings',
          tabBarLabel: 'Earnings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={DriverDashboard}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const isAuthenticated = useAppSelector((state: RootState) => state.driver.isAuthenticated);
  const hasSeenOnboarding = useAppSelector((state: RootState) => state.driver.id !== null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            {!hasSeenOnboarding && (
              <Stack.Screen name="Onboarding" component={OnboardingFlow} />
            )}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={DashboardNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
