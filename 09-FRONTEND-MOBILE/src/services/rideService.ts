import apiClient from './api';

export interface RideRequestPayload {
  ride_type: 'economy' | 'comfort' | 'premium';
  payment_method: 'cash' | 'card' | 'wallet' | 'upi';
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_address: string;
  dropoff_latitude: number;
  dropoff_longitude: number;
  dropoff_address: string;
  notes?: string;
  special_requests?: string;
}

export interface RideEstimatePayload {
  pickup_latitude: number;
  pickup_longitude: number;
  dropoff_latitude: number;
  dropoff_longitude: number;
  ride_type: 'economy' | 'comfort' | 'premium';
}

export interface RideCompletedPayload {
  actual_distance_km: number;
  actual_duration_minutes: number;
  actual_fare: number;
}

export interface RideRatingPayload {
  overall_rating: number;
  cleanliness_rating?: number;
  communication_rating?: number;
  driving_rating?: number;
  behavior_rating?: number;
  review_text?: string;
  tags?: string;
}

export interface Ride {
  id: number;
  ride_number: string;
  passenger_id: number;
  driver_id?: number;
  driver?: {
    id: number;
    name: string;
    phone: string;
    vehicle_model: string;
    vehicle_number: string;
    vehicle_color?: string;
    rating?: number;
    profile_picture?: string;
  };
  ride_type: string;
  status: string;
  payment_method: string;
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_address: string;
  dropoff_latitude: number;
  dropoff_longitude: number;
  dropoff_address: string;
  estimated_fare: number;
  actual_fare?: number;
  final_fare?: number;
  discount_applied: number;
  estimated_distance_km?: number;
  actual_distance_km?: number;
  estimated_duration_minutes?: number;
  actual_duration_minutes?: number;
  requested_at: string;
  accepted_at?: string;
  pickup_time?: string;
  completed_at?: string;
  cancelled_at?: string;
  notes?: string;
  special_requests?: string;
  otp_code?: string;
  locations: any[];
  payments: any[];
  ratings: any[];
}

export interface RideEstimate {
  estimated_distance_km: number;
  estimated_duration_minutes: number;
  base_fare: number;
  distance_charge: number;
  time_charge: number;
  surge_multiplier: number;
  estimated_total: number;
}

class RideService {
  async requestRide(data: RideRequestPayload): Promise<Ride> {
    return apiClient.post<Ride>('/rides/request', data);
  }

  async estimateFare(data: RideEstimatePayload): Promise<RideEstimate> {
    return apiClient.post<RideEstimate>('/rides/estimate', data);
  }

  async getRide(rideId: number): Promise<Ride> {
    return apiClient.get<Ride>(`/rides/${rideId}`);
  }

  async acceptRide(rideId: number): Promise<Ride> {
    return apiClient.post<Ride>(`/rides/${rideId}/accept`);
  }

  async startRide(rideId: number, otpCode: string): Promise<Ride> {
    return apiClient.post<Ride>(`/rides/${rideId}/start`, {
      otp_code: otpCode,
    });
  }

  async completeRide(rideId: number, data: RideCompletedPayload): Promise<Ride> {
    return apiClient.post<Ride>(`/rides/${rideId}/complete`, data);
  }

  async cancelRide(rideId: number, reason?: string): Promise<Ride> {
    return apiClient.post<Ride>(`/rides/${rideId}/cancel`, {
      cancellation_reason: reason,
    });
  }

  async getPassengerRides(skip: number = 0, limit: number = 20): Promise<Ride[]> {
    return apiClient.get<Ride[]>('/rides/history/passenger', {
      params: { skip, limit },
    });
  }

  async getDriverRides(skip: number = 0, limit: number = 20): Promise<Ride[]> {
    return apiClient.get<Ride[]>('/rides/history/driver', {
      params: { skip, limit },
    });
  }

  async getPendingRides(limit: number = 50): Promise<Ride[]> {
    return apiClient.get<Ride[]>('/rides/available/pending', {
      params: { limit },
    });
  }

  async rateRide(rideId: number, data: RideRatingPayload): Promise<any> {
    return apiClient.post<any>(`/rides/${rideId}/rating`, data);
  }
}

export default new RideService();
