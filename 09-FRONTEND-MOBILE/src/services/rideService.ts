import { apiClient } from './apiClient';

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
    const response = await apiClient.post('/rides/request', data);
    return response.data;
  }

  async estimateFare(data: RideEstimatePayload): Promise<RideEstimate> {
    const response = await apiClient.post('/rides/estimate', data);
    return response.data;
  }

  async getRide(rideId: number): Promise<Ride> {
    const response = await apiClient.get(`/rides/${rideId}`);
    return response.data;
  }

  async acceptRide(rideId: number): Promise<Ride> {
    const response = await apiClient.post(`/rides/${rideId}/accept`);
    return response.data;
  }

  async startRide(rideId: number, otpCode: string): Promise<Ride> {
    const response = await apiClient.post(`/rides/${rideId}/start`, {
      otp_code: otpCode,
    });
    return response.data;
  }

  async completeRide(rideId: number, data: RideCompletedPayload): Promise<Ride> {
    const response = await apiClient.post(`/rides/${rideId}/complete`, data);
    return response.data;
  }

  async cancelRide(rideId: number, reason?: string): Promise<Ride> {
    const response = await apiClient.post(`/rides/${rideId}/cancel`, {
      cancellation_reason: reason,
    });
    return response.data;
  }

  async getPassengerRides(skip: number = 0, limit: number = 20): Promise<Ride[]> {
    const response = await apiClient.get('/rides/history/passenger', {
      params: { skip, limit },
    });
    return response.data;
  }

  async getDriverRides(skip: number = 0, limit: number = 20): Promise<Ride[]> {
    const response = await apiClient.get('/rides/history/driver', {
      params: { skip, limit },
    });
    return response.data;
  }

  async getPendingRides(limit: number = 50): Promise<Ride[]> {
    const response = await apiClient.get('/rides/available/pending', {
      params: { limit },
    });
    return response.data;
  }

  async rateRide(rideId: number, data: RideRatingPayload): Promise<any> {
    const response = await apiClient.post(`/rides/${rideId}/rating`, data);
    return response.data;
  }
}

export default new RideService();
