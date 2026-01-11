# 📅 CAB CONNECT PHASE 1 - WEEK-BY-WEEK DEVELOPMENT GUIDE

**Duration:** 5-6 weeks  
**Status:** Ready to Start  
**Team:** 4-5 developers  
**Last Updated:** January 11, 2026  

---

## ⚡ QUICK REFERENCE

| Week | Focus | Deliverables | Status |
|------|-------|--------------|--------|
| 1 | Foundation Setup | Project structure, Database, Auth APIs | ⏳ Not Started |
| 2 | Passenger App | Booking flow, Maps, Ride request | ⏳ Not Started |
| 3 | Driver App + Real-time | Driver features, WebSocket, Notifications | ⏳ Not Started |
| 4 | Payments & Integration | Razorpay, SMS, Push notifications | ⏳ Not Started |
| 5 | Admin + Testing | Dashboard, QA, Performance | ⏳ Not Started |
| 6 | Deployment & Launch | Server setup, App Store, Monitor | ⏳ Not Started |

---

# 🏗️ WEEK 1: FOUNDATION & SETUP (Days 1-5)

## DAY 1-2: Project Initialization

### **Backend Setup (FastAPI)**

**Tasks:**
```
☐ Initialize FastAPI project
☐ Setup virtual environment (Python 3.10+)
☐ Create project structure
☐ Configure environment variables
☐ Setup database connection (PostgreSQL)
☐ Create Docker configuration
☐ Setup logging & error handling
☐ Configure CORS & security headers
```

**Commands:**
```bash
# Create project
mkdir cab-connect-backend && cd cab-connect-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pydantic jwt bcrypt

# Project structure
mkdir -p app/{api,models,services,utils,schemas,database}
touch app/__init__.py app/main.py app/config.py
```

**Project Structure:**
```
cab-connect-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Entry point
│   ├── config.py               # Configuration
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py        # Auth routes
│   │   │   ├── users.py       # User routes
│   │   │   ├── drivers.py     # Driver routes
│   │   │   ├── rides.py       # Ride routes
│   │   │   ├── locations.py   # Location routes
│   │   │   ├── payments.py    # Payment routes
│   │   │   ├── admin.py       # Admin routes
│   │   │   └── health.py      # Health check
│   │   └── dependencies.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User model
│   │   ├── driver.py          # Driver model
│   │   ├── ride.py            # Ride model
│   │   └── payment.py         # Payment model
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── driver_service.py
│   │   ├── ride_service.py
│   │   ├── location_service.py
│   │   ├── payment_service.py
│   │   └── notification_service.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py            # Pydantic schemas
│   │   ├── driver.py
│   │   ├── ride.py
│   │   └── payment.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── jwt_utils.py       # JWT handling
│   │   ├── password_utils.py  # Password hashing
│   │   ├── sms_utils.py       # SMS OTP
│   │   ├── email_utils.py     # Email sending
│   │   └── validators.py      # Data validation
│   ├── database/
│   │   ├── __init__.py
│   │   └── db.py              # Database setup
│   ├── websocket/
│   │   ├── __init__.py
│   │   └── manager.py         # WebSocket manager
│   └── migrations/             # Alembic migrations
├── tests/
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_rides.py
│   └── test_users.py
├── requirements.txt
├── .env.example
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

**Key Files to Create:**

**`app/main.py`**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, users, drivers, rides, admin
from app.database.db import create_tables

app = FastAPI(
    title="Cab Connect API",
    version="1.0.0",
    description="API for Cab Connect ride-hailing platform"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure with actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
create_tables()

# Include routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(drivers.router, prefix="/api/v1/drivers", tags=["drivers"])
app.include_router(rides.router, prefix="/api/v1/rides", tags=["rides"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**`app/config.py`**
```python
from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/cabconnect")
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # SMS
    SMS_API_KEY: str = os.getenv("SMS_API_KEY")
    SMS_SENDER: str = "CABCONNECT"
    
    # Google Maps
    GOOGLE_MAPS_API_KEY: str = os.getenv("GOOGLE_MAPS_API_KEY")
    
    # Razorpay
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET")
    
    # Firebase
    FIREBASE_SERVICE_ACCOUNT: str = os.getenv("FIREBASE_SERVICE_ACCOUNT")
    
    class Config:
        env_file = ".env"

settings = Settings()
```

---

### **Frontend Setup (React Native)**

**Tasks:**
```
☐ Initialize Expo project
☐ Setup TypeScript
☐ Configure navigation
☐ Setup Redux store
☐ Configure API client (Axios)
☐ Setup environment variables
☐ Create app structure
```

**Commands:**
```bash
# Create React Native project
npx create-expo-app CabConnect --template
cd CabConnect

# Install dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install redux @reduxjs/toolkit react-redux
npm install axios
npm install react-native-maps react-native-geolocation-service
npm install socket.io-client
npm install react-hook-form zod
npm install typescript @types/react @types/react-native

# Create project structure
mkdir -p src/{screens,components,navigation,redux,services,utils}
```

**Project Structure:**
```
CabConnect/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── OTPScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── BookingScreen.tsx
│   │   │   └── RideScreen.tsx
│   │   ├── ride/
│   │   │   ├── ActiveRideScreen.tsx
│   │   │   ├── RideHistoryScreen.tsx
│   │   │   └── RideDetailsScreen.tsx
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── maps/
│   │   │   └── MapView.tsx
│   │   ├── forms/
│   │   │   └── LocationInput.tsx
│   │   └── ride/
│   │       ├── RideCard.tsx
│   │       └── DriverInfo.tsx
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   ├── authSlice.ts
│   │   ├── rideSlice.ts
│   │   ├── userSlice.ts
│   │   └── locationSlice.ts
│   ├── services/
│   │   ├── api.ts             # Axios instance
│   │   ├── authService.ts
│   │   ├── rideService.ts
│   │   └── locationService.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── api.ts
│   ├── App.tsx                # Root component
│   └── index.ts
├── app.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── package.json
```

---

### **Database Setup (PostgreSQL)**

**Tasks:**
```
☐ Create PostgreSQL database
☐ Create user tables schema
☐ Create driver tables schema
☐ Create ride tables schema
☐ Create payment tables schema
☐ Setup indexes
☐ Setup constraints
☐ Create migration files
```

**SQL Schema:**
```sql
-- Create database
CREATE DATABASE cabconnect;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    profile_picture_url VARCHAR(500),
    user_type VARCHAR(20) CHECK (user_type IN ('passenger', 'driver')),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authentication table
CREATE TABLE authentication (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    password_hash VARCHAR(255),
    otp_code VARCHAR(6),
    otp_expires_at TIMESTAMP,
    failed_attempts INT DEFAULT 0,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_expiry DATE NOT NULL,
    vehicle_registration VARCHAR(50) UNIQUE NOT NULL,
    vehicle_name VARCHAR(100),
    vehicle_number VARCHAR(50),
    vehicle_color VARCHAR(50),
    rating DECIMAL(3, 2) DEFAULT 5.0,
    total_rides INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',  -- pending, approved, rejected, blocked
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Driver documents
CREATE TABLE driver_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
    document_type VARCHAR(50),  -- license, registration, insurance
    document_url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rides table
CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passenger_id UUID REFERENCES users(id),
    driver_id UUID REFERENCES drivers(id),
    status VARCHAR(20) DEFAULT 'pending',  -- pending, accepted, started, completed, cancelled
    pickup_address VARCHAR(500),
    pickup_latitude DECIMAL(10, 8),
    pickup_longitude DECIMAL(11, 8),
    destination_address VARCHAR(500),
    destination_latitude DECIMAL(10, 8),
    destination_longitude DECIMAL(11, 8),
    distance_km DECIMAL(10, 2),
    duration_minutes INT,
    base_fare DECIMAL(10, 2),
    distance_fare DECIMAL(10, 2),
    time_fare DECIMAL(10, 2),
    total_fare DECIMAL(10, 2),
    payment_method VARCHAR(20),  -- cash, online
    payment_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_drivers_user_id ON drivers(user_id);
CREATE INDEX idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_created_at ON rides(created_at);
```

---

## DAY 3-5: Core APIs & Testing

### **Authentication Service Implementation**

**Create:** `app/services/auth_service.py`

```python
from app.models.user import User
from app.utils.password_utils import hash_password, verify_password
from app.utils.jwt_utils import create_access_token, create_refresh_token
from app.utils.sms_utils import send_otp

class AuthService:
    
    async def send_otp(self, phone: str) -> bool:
        """Send OTP to user's phone"""
        otp = generate_otp()
        # Store OTP in database with expiry (10 minutes)
        # Send via SMS
        return await send_otp(phone, otp)
    
    async def verify_otp(self, phone: str, otp: str) -> dict:
        """Verify OTP and return tokens"""
        # Verify OTP from database
        # Check if user exists, if not create
        # Return access & refresh tokens
        pass
    
    async def register(self, user_data: dict) -> dict:
        """Register new user"""
        # Hash password
        # Create user in database
        # Return tokens
        pass
    
    async def login(self, phone: str, password: str) -> dict:
        """Login user"""
        # Verify password
        # Update last_login
        # Return tokens
        pass
    
    async def refresh_token(self, refresh_token: str) -> str:
        """Get new access token using refresh token"""
        # Verify refresh token
        # Create new access token
        pass
```

### **API Endpoint Implementation**

**Create:** `app/api/v1/auth.py`

```python
from fastapi import APIRouter, HTTPException, status
from app.services.auth_service import AuthService
from app.schemas.user import SendOTPRequest, VerifyOTPRequest, LoginRequest

router = APIRouter()
auth_service = AuthService()

@router.post("/send-otp")
async def send_otp(request: SendOTPRequest):
    """Send OTP to phone number"""
    success = await auth_service.send_otp(request.phone)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to send OTP"
        )
    return {"message": "OTP sent successfully"}

@router.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest):
    """Verify OTP and register/login user"""
    result = await auth_service.verify_otp(request.phone, request.otp)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid OTP"
        )
    return result

@router.post("/login")
async def login(request: LoginRequest):
    """Login with phone and password"""
    result = await auth_service.login(request.phone, request.password)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return result

@router.post("/refresh")
async def refresh(refresh_token: str):
    """Get new access token"""
    new_token = await auth_service.refresh_token(refresh_token)
    return {"access_token": new_token}
```

### **Testing**

**Create:** `tests/test_auth.py`

```python
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_send_otp():
    response = client.post("/api/v1/auth/send-otp", json={"phone": "+679123456"})
    assert response.status_code == 200
    assert "message" in response.json()

def test_verify_otp():
    # Send OTP first
    client.post("/api/v1/auth/send-otp", json={"phone": "+679123456"})
    # Verify OTP
    response = client.post("/api/v1/auth/verify-otp", json={"phone": "+679123456", "otp": "123456"})
    # Should return tokens

def test_invalid_otp():
    response = client.post("/api/v1/auth/verify-otp", json={"phone": "+679123456", "otp": "000000"})
    assert response.status_code == 401
```

---

## DELIVERABLES (END OF WEEK 1)

✅ **Backend:**
- FastAPI project initialized
- Database schema created (PostgreSQL)
- Authentication APIs working (send-otp, verify-otp, login, refresh)
- JWT token system implemented
- CORS configured
- Error handling setup
- API documentation (Swagger UI)
- Unit tests passing (80%+ auth routes)

✅ **Frontend:**
- React Native project initialized
- TypeScript configured
- Redux store setup
- Navigation structure created
- API client configured
- Environment variables setup
- Project structure ready for screens

✅ **Documentation:**
- API documentation (Swagger)
- Database schema diagram
- Development setup guide
- Git repository created

---

# 🏃 WEEK 2: PASSENGER APP - CORE FEATURES (Days 6-10)

## DAY 6-7: App Setup & Auth Screens

### **Passenger App - Auth Screens**

**Create:** `src/screens/auth/LoginScreen.tsx`

```typescript
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import * as authService from '@/services/authService';

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await authService.sendOTP(phone);
      navigation.navigate('OTP', { phone });
    } catch (error) {
      // Show error
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cab Connect</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSendOTP}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8 },
  button: { backgroundColor: '#10b981', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
```

**Create:** `src/screens/auth/OTPScreen.tsx`

```typescript
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import * as authService from '@/services/authService';

export default function OTPScreen({ route, navigation }: Props) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const response = await authService.verifyOTP(phone, otp);
      dispatch(setUser(response.user));
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      // Show error
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter OTP sent to {phone}</Text>
      <TextInput
        style={styles.input}
        placeholder="000000"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleVerifyOTP}
        disabled={loading || otp.length !== 6}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## DAY 8-10: Home & Booking Features

### **Home Screen with Map**

**Create:** `src/screens/home/HomeScreen.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'react-native-geolocation-service';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }: Props) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Location.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      await fetchNearbyDrivers(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyDrivers = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/v1/location/nearby-drivers?lat=${lat}&lng=${lng}&radius=5`);
      const data = await response.json();
      setNearbyDrivers(data.drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Passenger marker */}
          <Marker
            coordinate={currentLocation}
            title="You"
            pinColor="#10b981"
          />
          {/* Driver markers */}
          {nearbyDrivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
              title={driver.name}
              pinColor="#0891b2"
            />
          ))}
        </MapView>
      )}
      
      <View style={styles.bookingSheet}>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={styles.bookingButtonText}>Book a Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bookingSheet: { padding: 20, backgroundColor: 'white', borderTopRadius: 20 },
  bookingButton: { backgroundColor: '#10b981', padding: 15, borderRadius: 8, alignItems: 'center' },
  bookingButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
```

### **Booking Screen**

**Create:** `src/screens/home/BookingScreen.tsx`

```typescript
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setRide } from '@/redux/rideSlice';
import * as rideService from '@/services/rideService';

export default function BookingScreen({ navigation }: Props) {
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [fareEstimate, setFareEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleEstimateFare = async () => {
    if (!pickupAddress || !destinationAddress) return;
    
    setLoading(true);
    try {
      const estimate = await rideService.getFareEstimate({
        pickup: pickupAddress,
        destination: destinationAddress,
      });
      setFareEstimate(estimate);
    } catch (error) {
      console.error('Error estimating fare:', error);
    }
    setLoading(false);
  };

  const handleBookRide = async () => {
    setLoading(true);
    try {
      const rideData = {
        passenger_id: user.id,
        pickup_address: pickupAddress,
        destination_address: destinationAddress,
        fare: fareEstimate.total_fare,
      };
      const response = await rideService.requestRide(rideData);
      dispatch(setRide(response));
      navigation.navigate('RideWaiting', { rideId: response.id });
    } catch (error) {
      console.error('Error booking ride:', error);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book a Ride</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Pickup location"
        value={pickupAddress}
        onChangeText={setPickupAddress}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destinationAddress}
        onChangeText={setDestinationAddress}
      />
      
      <TouchableOpacity 
        style={styles.estimateButton}
        onPress={handleEstimateFare}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Estimate Fare</Text>
      </TouchableOpacity>
      
      {fareEstimate && (
        <View style={styles.fareEstimate}>
          <Text style={styles.fareText}>Estimated Fare: ₹{fareEstimate.total_fare}</Text>
          <Text style={styles.detailText}>Distance: {fareEstimate.distance_km} km</Text>
          <Text style={styles.detailText}>Duration: {fareEstimate.duration_minutes} min</Text>
        </View>
      )}
      
      {fareEstimate && (
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookRide}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Book Ride - ₹{fareEstimate.total_fare}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8 },
  estimateButton: { backgroundColor: '#0891b2', padding: 15, borderRadius: 8, marginBottom: 15 },
  bookButton: { backgroundColor: '#10b981', padding: 15, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  fareEstimate: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 20 },
  fareText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  detailText: { fontSize: 14, color: '#666', marginBottom: 5 },
});
```

---

## DELIVERABLES (END OF WEEK 2)

✅ **Passenger App:**
- Login & OTP screens working
- Home screen with map
- Nearby drivers display
- Booking screen with fare estimation
- Real-time location tracking
- Ride booking flow (without driver match yet)
- Redux state management
- API integration

✅ **Backend Support:**
- `/api/v1/location/nearby-drivers` endpoint
- `/api/v1/rides/estimate` endpoint
- `/api/v1/rides/request` endpoint
- Fare calculation logic
- Location caching

✅ **Testing:**
- App screens tested on Android devices
- API endpoints tested
- Map functionality verified
- Booking flow validated

---

# 🚗 WEEK 3: DRIVER APP & REAL-TIME (Days 11-15)

**Similar structure to Week 2, but building:**
- Driver authentication & setup
- Online/offline toggle
- Ride request notifications
- Accept/reject flow
- WebSocket integration for real-time

**Key Components:**
- Driver Home Screen
- Ride Request Modal
- Active Ride Screen
- Navigation integration
- WebSocket Manager (Backend + Frontend)

---

# 💳 WEEK 4: PAYMENTS & NOTIFICATIONS (Days 16-20)

**Key Implementations:**
- Razorpay integration (online payments)
- Cash payment tracking
- SMS OTP via MSG91/Twilio
- Firebase Cloud Messaging setup
- Push notification system

---

# 📊 WEEK 5: ADMIN DASHBOARD & TESTING (Days 21-27)

**Admin Dashboard Features:**
- Dashboard overview
- Driver management
- User management
- Ride tracking
- Revenue reports
- Comprehensive QA testing

---

# 🚀 WEEK 6: DEPLOYMENT & LAUNCH (Days 28-30+)

**Deployment Steps:**
- AWS EC2 setup
- PostgreSQL RDS configuration
- Redis setup
- Google Play Store submission
- Monitoring setup
- Beta testing with 50 users

---

## 📋 DAILY CHECKLIST TEMPLATE

Use this for each day:

```
DAY [X]:
├─ [ ] Morning standup (15 min)
├─ [ ] Code review of Day [X-1]
├─ [ ] Task 1: [Description]
│  ├─ [ ] Subtask 1a
│  ├─ [ ] Subtask 1b
│  └─ [ ] Testing
├─ [ ] Task 2: [Description]
├─ [ ] Evening: Commit code
├─ [ ] Update progress
└─ [ ] Document blockers

NOTES:
- Blocker 1: [Description]
- Question 1: [Description]
```

---

## 🔧 USEFUL COMMANDS

```bash
# Backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pytest -v --cov=app
black app/  # Format code
flake8 app/  # Lint

# Frontend (React Native)
npm start
npm run ios  # Simulator
npm run android  # Android emulator
npm test

# Git
git checkout -b feature/feature-name
git add .
git commit -m "feat: description"
git push origin feature/feature-name
# Create PR on GitHub
```

---

**Next Step:** Start with WEEK 1, DAY 1. Begin setting up the backend project!

---
