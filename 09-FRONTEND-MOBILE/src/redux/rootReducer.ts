import { combineReducers } from '@reduxjs/toolkit';

// Import reducers here as they are created
import authReducer from './slices/authSlice';
import rideReducer from './slices/rideSlice';

const rootReducer = combineReducers({
  // Add reducers here
  auth: authReducer,
  rides: rideReducer,
});

export default rootReducer;
