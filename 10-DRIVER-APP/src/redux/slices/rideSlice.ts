import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RideRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerRating: number;
  pickupLocation: string;
  pickupLat: number;
  pickupLng: number;
  destinationLocation: string;
  destinationLat: number;
  destinationLng: number;
  estimatedFare: number;
  estimatedDuration: number;
  estimatedDistance: number;
  createdAt: string;
}

interface ActiveRide {
  id: string;
  passengerId: string;
  passengerName: string;
  passengerPhone: string;
  passengerRating: number;
  pickupLocation: string;
  pickupLat: number;
  pickupLng: number;
  destinationLocation: string;
  destinationLat: number;
  destinationLng: number;
  fare: number;
  distance?: number;
  duration?: number;
  estimatedDuration?: number;
  status: 'accepted' | 'arrived_pickup' | 'started' | 'completed' | 'cancelled';
  startedAt: string | null;
  completedAt: string | null;
  passengerLat: number;
  passengerLng: number;
  driverLat: number;
  driverLng: number;
}

interface RideState {
  incomingRequest: RideRequest | null;
  activeRide: ActiveRide | null;
  rideHistory: ActiveRide[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RideState = {
  incomingRequest: null,
  activeRide: null,
  rideHistory: [],
  isLoading: false,
  error: null,
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setIncomingRequest: (state, action: PayloadAction<RideRequest | null>) => {
      state.incomingRequest = action.payload;
    },
    setActiveRide: (state, action: PayloadAction<ActiveRide | null>) => {
      state.activeRide = action.payload;
    },
    updateActiveRideStatus: (
      state,
      action: PayloadAction<'arrived_pickup' | 'started' | 'completed' | 'cancelled'>
    ) => {
      if (state.activeRide) {
        state.activeRide.status = action.payload;
      }
    },
    updateDriverLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      if (state.activeRide) {
        state.activeRide.driverLat = action.payload.lat;
        state.activeRide.driverLng = action.payload.lng;
      }
    },
    addToRideHistory: (state, action: PayloadAction<ActiveRide>) => {
      state.rideHistory.unshift(action.payload);
    },
    setRideHistory: (state, action: PayloadAction<ActiveRide[]>) => {
      state.rideHistory = action.payload;
    },
    setRideLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRideError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetRide: () => initialState,
  },
});

export const {
  setIncomingRequest,
  setActiveRide,
  updateActiveRideStatus,
  updateDriverLocation,
  addToRideHistory,
  setRideHistory,
  setRideLoading,
  setRideError,
  resetRide,
} = rideSlice.actions;

export default rideSlice.reducer;
