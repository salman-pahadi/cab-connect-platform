import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideRequestScreen from '@screens/Rides/RideRequestScreen';
import ActiveRideScreen from '@screens/Rides/ActiveRideScreen';
import RideHistoryScreen from '@screens/Rides/RideHistoryScreen';
import RideCompletionScreen from '@screens/Rides/RideCompletionScreen';

const Stack = createNativeStackNavigator();

export const RidesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Ride Request - Incoming request modal */}
      <Stack.Screen
        name="RideRequest"
        component={RideRequestScreen}
        options={{
          animation: 'fade',
        }}
      />

      {/* Active Ride - Current ride in progress */}
      <Stack.Screen
        name="ActiveRide"
        component={ActiveRideScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      {/* Ride History - Completed rides list */}
      <Stack.Screen
        name="RideHistory"
        component={RideHistoryScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      {/* Ride Completion - Final rating screen */}
      <Stack.Screen
        name="RideCompletion"
        component={RideCompletionScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default RidesNavigator;
