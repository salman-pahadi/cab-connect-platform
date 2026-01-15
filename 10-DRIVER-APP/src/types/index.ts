export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileImage?: string;
  licenseNumber: string;
  vehicleNumber: string;
  vehicleModel: string;
  rating: number;
  totalRides: number;
  verified: boolean;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId: string;
  status: 'pending' | 'accepted' | 'started' | 'completed' | 'cancelled';
  pickupLat: number;
  pickupLng: number;
  destinationLat: number;
  destinationLng: number;
  fare: number;
  distance: number;
  duration: number;
  createdAt: string;
  completedAt?: string;
}

export interface LocationUpdate {
  latitude: number;
  longitude: number;
  timestamp: string;
}
