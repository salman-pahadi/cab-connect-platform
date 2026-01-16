// Mock data for demonstration and testing purposes
export const mockRideRequest = {
  id: 'ride_demo_001',
  passengerId: 'pass_001',
  passengerName: 'John Doe',
  passengerRating: 4.8,
  passengerPhone: '+6791234567',
  passengerImage: undefined,
  pickupAddress: 'Downtown Shopping Center, Victoria Parade, Suva',
  dropoffAddress: 'Nausori International Airport, Kings Road, Nausori',
  fare: 24.50,
  estimatedDuration: 18,
  distance: 12.3,
};

export const mockActiveRide = {
  ...mockRideRequest,
  status: 'accepted' as const,
  startedAt: new Date().toISOString(),
};

export const mockRideHistory = [
  {
    id: 'ride_history_001',
    passengerName: 'Sarah Johnson',
    pickupAddress: 'Downtown Shopping Center, Victoria Parade, Suva',
    dropoffAddress: 'Nausori International Airport, Kings Road, Nausori',
    fare: 24.50,
    distance: 12.3,
    duration: 18,
    completedAt: new Date().toISOString(),
    rating: 5,
    hasRated: true,
  },
  {
    id: 'ride_history_002',
    passengerName: 'Michael Wong',
    pickupAddress: 'Nausori International Airport, Kings Road, Nausori',
    dropoffAddress: 'City Center, Renwick Road, Suva',
    fare: 18.50,
    distance: 8.7,
    duration: 12,
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    rating: 4,
    hasRated: true,
  },
  {
    id: 'ride_history_003',
    passengerName: 'Priya Patel',
    pickupAddress: 'University of the South Pacific, Laucala Campus',
    dropoffAddress: 'TappooCity Shopping Centre, Suva',
    fare: 12.00,
    distance: 4.5,
    duration: 8,
    completedAt: new Date(Date.now() - 7200000).toISOString(),
    rating: 5,
    hasRated: false,
  },
  {
    id: 'ride_history_004',
    passengerName: 'James Smith',
    pickupAddress: 'Grand Pacific Hotel, Victoria Parade, Suva',
    dropoffAddress: 'Pacific Harbour, Queens Road',
    fare: 45.00,
    distance: 48.2,
    duration: 50,
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    rating: 4,
    hasRated: true,
  },
];

export const mockDriverProfile = {
  id: 'driver_demo_001',
  name: 'Demo Driver',
  phone: '+6799876543',
  email: 'demo.driver@cabconnect.fj',
  profileImage: undefined,
  licenseNumber: 'FJ123456',
  vehicleNumber: 'AB-1234',
  vehicleModel: 'Toyota Corolla 2020',
  rating: 4.7,
  totalRides: 156,
  verified: true,
  isOnline: false,
  todayEarnings: 89.50,
  totalEarnings: 3240.00,
  isAuthenticated: true,
};

export const mockEarnings = {
  today: 89.50,
  thisWeek: 456.30,
  thisMonth: 1890.75,
  total: 3240.00,
  currency: 'FJD',
};
