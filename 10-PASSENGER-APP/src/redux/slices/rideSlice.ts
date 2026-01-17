import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ride } from '../../services/rideService';

export interface RideState {
  currentRide: Ride | null;
  rideHistory: Ride[];
  pendingRides: Ride[];
  loading: boolean;
  error: string | null;
}

const initialState: RideState = {
  currentRide: null,
  rideHistory: [],
  pendingRides: [],
  loading: false,
  error: null,
};

const rideSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    setCurrentRide: (state, action: PayloadAction<Ride>) => {
      state.currentRide = action.payload;
      state.error = null;
    },
    clearCurrentRide: (state) => {
      state.currentRide = null;
    },
    setRideHistory: (state, action: PayloadAction<Ride[]>) => {
      state.rideHistory = action.payload;
    },
    setPendingRides: (state, action: PayloadAction<Ride[]>) => {
      state.pendingRides = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateRideStatus: (state, action: PayloadAction<{ rideId: number; status: string }>) => {
      if (state.currentRide?.id === action.payload.rideId) {
        state.currentRide.status = action.payload.status;
      }
    },
  },
});

export const {
  setCurrentRide,
  clearCurrentRide,
  setRideHistory,
  setPendingRides,
  setLoading,
  setError,
  updateRideStatus,
} = rideSlice.actions;

export default rideSlice.reducer;
