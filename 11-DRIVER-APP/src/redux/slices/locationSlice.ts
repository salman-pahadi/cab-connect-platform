import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  currentLat: number | null;
  currentLng: number | null;
  isTracking: boolean;
  error: string | null;
}

const initialState: LocationState = {
  currentLat: null,
  currentLng: null,
  isTracking: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.currentLat = action.payload.lat;
      state.currentLng = action.payload.lng;
    },
    setTracking: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload;
    },
    setLocationError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLocation, setTracking, setLocationError } = locationSlice.actions;

export default locationSlice.reducer;
