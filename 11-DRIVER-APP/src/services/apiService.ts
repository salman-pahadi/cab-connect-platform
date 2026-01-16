import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://cab-connect-api.onrender.com/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Auth endpoints
  async sendOtp(phone: string) {
    return this.api.post('/auth/send-otp', { phone, userType: 'driver' });
  }

  async verifyOtp(phone: string, otp: string) {
    return this.api.post('/auth/verify-otp', { phone, otp, userType: 'driver' });
  }

  async login(phone: string, password: string) {
    return this.api.post('/auth/login', { phone, password });
  }

  // Driver endpoints
  async getDriverProfile(driverId: string, token: string) {
    return this.api.get(`/drivers/${driverId}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateDriverProfile(driverId: string, data: any, token: string) {
    return this.api.put(`/drivers/${driverId}/profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateDriverStatus(driverId: string, isOnline: boolean, token: string) {
    return this.api.put(
      `/drivers/${driverId}/status`,
      { isOnline },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Ride endpoints
  async getAvailableRides(token: string) {
    return this.api.get('/rides/available', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async acceptRide(rideId: string, driverId: string, token: string) {
    return this.api.post(
      `/rides/${rideId}/accept`,
      { driverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async updateRideStatus(rideId: string, status: string, token: string) {
    return this.api.put(
      `/rides/${rideId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async getRideHistory(driverId: string, token: string) {
    return this.api.get(`/drivers/${driverId}/rides`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Location endpoint
  async updateLocation(driverId: string, lat: number, lng: number, token: string) {
    return this.api.post(
      `/location/update`,
      { driverId, latitude: lat, longitude: lng },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Earnings endpoint
  async getEarnings(driverId: string, token: string) {
    return this.api.get(`/drivers/${driverId}/earnings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Rate passenger endpoint
  async ratePassenger(rideId: string, rating: number, feedback?: string, token?: string) {
    return this.api.post(`/rides/${rideId}/rate`, 
      { rating, feedback },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
  }
}

export const apiService = new ApiService();
export default apiService;
