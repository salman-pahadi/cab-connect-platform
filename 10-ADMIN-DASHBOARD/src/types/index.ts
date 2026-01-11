export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: string;
}

export interface Ride {
  id: string;
  passenger: string;
  driver: string;
  status: string;
  fare: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
