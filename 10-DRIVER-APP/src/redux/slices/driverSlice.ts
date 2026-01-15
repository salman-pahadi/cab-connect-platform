import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DriverState {
  id: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  profileImage: string | null;
  licenseNumber: string | null;
  vehicleNumber: string | null;
  vehicleModel: string | null;
  isOnline: boolean;
  rating: number;
  totalRides: number;
  todayEarnings: number;
  totalEarnings: number;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: DriverState = {
  id: null,
  name: null,
  phone: null,
  email: null,
  profileImage: null,
  licenseNumber: null,
  vehicleNumber: null,
  vehicleModel: null,
  isOnline: false,
  rating: 0,
  totalRides: 0,
  todayEarnings: 0,
  totalEarnings: 0,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriverData: (state, action: PayloadAction<Partial<DriverState>>) => {
      return { ...state, ...action.payload };
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setTodayEarnings: (state, action: PayloadAction<number>) => {
      state.todayEarnings = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetDriver: () => initialState,
  },
});

export const {
  setDriverData,
  setOnlineStatus,
  setTodayEarnings,
  setLoading,
  setError,
  resetDriver,
} = driverSlice.actions;

export default driverSlice.reducer;
