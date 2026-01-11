# 🎯 CAB CONNECT - PHASE 1 REQUIREMENTS MATRIX

**Project:** Cab Connect - Fiji's Cab-Hailing Platform  
**Phase:** Phase 1 (MVP Android)  
**Client:** Mohammed Ifraad Hussain  
**Date:** January 11, 2026  

---

## ✅ PASSENGER APP REQUIREMENTS

### **Authentication Features**
- [x] Phone number registration
- [x] SMS OTP verification
- [x] Email optional
- [x] Password setup
- [x] Login/Logout
- [x] Profile update
- [x] Social media login (future)

### **Booking Features**
- [x] Find nearby drivers (map)
- [x] Select pickup & destination
- [x] Fare estimation
- [x] Book ride now
- [x] Schedule ride for later (future)
- [x] Favorite locations (Home, Work)
- [x] Multiple stops in one trip (future)
- [x] Book for someone else (future)

### **Ride Features**
- [x] Real-time driver tracking
- [x] Driver details (photo, name, rating, vehicle)
- [x] Call driver (future - Phase 2)
- [x] Message driver (future - Phase 2)
- [x] ETA updates
- [x] Share ride details with contacts
- [x] Cancel ride
- [x] View ride progress on map

### **Payment Features**
- [x] Cash payment option
- [x] Online payment (Razorpay)
- [x] Payment receipt
- [x] Download invoice
- [x] Split payment with friends (future)
- [x] Tip driver (future - Phase 2)

### **Post-Ride Features**
- [x] Rate driver (1-5 stars)
- [x] Rate driver experience
- [x] View ride history
- [x] View receipt
- [x] Download invoice
- [x] Report issue (future)

### **Profile Features**
- [x] View profile
- [x] Update name, email, phone
- [x] View saved addresses
- [x] Add/delete favorite locations
- [x] View payment methods
- [x] Account settings
- [x] Privacy settings (future)
- [x] Help & support
- [x] Emergency contacts (future)

---

## ✅ DRIVER APP REQUIREMENTS

### **Authentication & Verification**
- [x] Phone number registration
- [x] Email (optional)
- [x] Name & personal details
- [x] Upload driver's license
- [x] Upload vehicle registration
- [x] Verification pending notification
- [x] Verification approval/rejection notification
- [x] Login/Logout

### **Status Management**
- [x] Toggle online/offline
- [x] Current location tracking
- [x] Show availability status
- [x] Set availability schedule (future)
- [x] Pause accepting rides (future)

### **Ride Management**
- [x] Receive ride requests (notifications)
- [x] View passenger details
- [x] View pickup & destination
- [x] View estimated fare
- [x] Accept/reject ride (10-second timeout)
- [x] Cancel accepted ride (with penalty - future)
- [x] Navigate to pickup
- [x] Confirm passenger arrived at pickup
- [x] Start ride
- [x] Navigate to destination
- [x] Complete ride
- [x] View completed ride details

### **Earnings & History**
- [x] View current earnings (today)
- [x] View daily earnings
- [x] View weekly earnings
- [x] View monthly earnings
- [x] View earnings breakdown (base + tips)
- [x] View trip history
- [x] View trip details
- [x] Cash collected tracking
- [x] Fuel expense tracking (future)

### **Safety & Documents**
- [x] Document upload (license, registration)
- [x] Document verification status
- [x] Reupload documents if rejected
- [x] Emergency button (future - Phase 2)
- [x] Ride recording (future - Phase 2)
- [x] Share location with emergency contact (future)

### **Profile & Support**
- [x] View profile
- [x] Update profile information
- [x] View performance rating
- [x] View passenger ratings
- [x] Help & support
- [x] Report issue
- [x] Contact support (future - Phase 2)

---

## ✅ ADMIN PANEL REQUIREMENTS

### **Dashboard**
- [x] Active rides count
- [x] Online drivers count
- [x] Registered passengers
- [x] Daily revenue
- [x] Average rating
- [x] System health status
- [x] Charts (rides/day, revenue/day, user growth)
- [x] Recent activities log

### **Driver Management**
- [x] View all drivers
- [x] Filter by status (pending, approved, rejected, blocked)
- [x] View driver details
- [x] View driver ratings
- [x] View driver documents
- [x] Approve/reject driver
- [x] Block/unblock driver
- [x] Delete driver
- [x] View driver earnings
- [x] Driver statistics

### **User (Passenger) Management**
- [x] View all passengers
- [x] View passenger details
- [x] View passenger ratings
- [x] Block/unblock passenger
- [x] Delete passenger
- [x] Passenger statistics

### **Ride Management**
- [x] View live active rides
- [x] View completed rides
- [x] View cancelled rides
- [x] Track specific ride
- [x] View ride details
- [x] View ride fare breakdown
- [x] Cancel ride (with reason)

### **Finance & Analytics**
- [x] View revenue reports
- [x] Revenue by date range
- [x] Revenue by driver
- [x] Commission breakdown
- [x] Payment tracking
- [x] Analytics dashboard
- [x] User growth charts
- [x] Ride trend charts

### **Configuration**
- [x] Update base fare
- [x] Update per-km rate
- [x] Update per-minute rate
- [x] Define service areas
- [x] Set commission percentage
- [x] Manage payment settings
- [x] Enable/disable features
- [x] System settings

### **Support & Moderation**
- [x] View support tickets
- [x] Respond to tickets
- [x] View complaints
- [x] View ratings & reviews
- [x] Send push notifications
- [x] Send SMS notifications
- [x] Manage admin users
- [x] Set admin roles & permissions

### **Reporting**
- [x] Daily report (rides, revenue, users)
- [x] Weekly report
- [x] Monthly report
- [x] Custom report generator
- [x] Export to CSV/PDF
- [x] Email reports

---

## 🗄️ DATABASE TABLES

### **Users Table**
```sql
users (
  id UUID PRIMARY KEY,
  phone VARCHAR(15) UNIQUE,
  email VARCHAR(255),
  name VARCHAR(255),
  profile_picture_url VARCHAR(500),
  user_type VARCHAR(20),  -- passenger, driver
  status VARCHAR(20),     -- active, blocked, deleted
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### **Authentication Table**
```sql
authentication (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE,
  password_hash VARCHAR(255),
  otp_code VARCHAR(6),
  otp_expires_at TIMESTAMP,
  failed_attempts INT,
  last_login TIMESTAMP,
  created_at TIMESTAMP
)
```

### **Drivers Table**
```sql
drivers (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE,
  license_number VARCHAR(50),
  license_expiry DATE,
  vehicle_registration VARCHAR(50),
  vehicle_name VARCHAR(100),
  vehicle_number VARCHAR(50),
  vehicle_color VARCHAR(50),
  rating DECIMAL(3,2),
  total_rides INT,
  status VARCHAR(20),     -- pending, approved, rejected, blocked
  verified_at TIMESTAMP,
  created_at TIMESTAMP
)
```

### **Rides Table**
```sql
rides (
  id UUID PRIMARY KEY,
  passenger_id UUID,
  driver_id UUID,
  status VARCHAR(20),     -- pending, accepted, started, completed, cancelled
  pickup_address VARCHAR(500),
  pickup_latitude DECIMAL(10,8),
  pickup_longitude DECIMAL(11,8),
  destination_address VARCHAR(500),
  destination_latitude DECIMAL(10,8),
  destination_longitude DECIMAL(11,8),
  distance_km DECIMAL(10,2),
  duration_minutes INT,
  base_fare DECIMAL(10,2),
  distance_fare DECIMAL(10,2),
  time_fare DECIMAL(10,2),
  total_fare DECIMAL(10,2),
  payment_method VARCHAR(20),  -- cash, online
  payment_status VARCHAR(20),
  created_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP
)
```

### **Payments Table**
```sql
payments (
  id UUID PRIMARY KEY,
  ride_id UUID,
  amount DECIMAL(10,2),
  payment_method VARCHAR(20),
  payment_gateway_id VARCHAR(100),
  status VARCHAR(20),     -- pending, completed, failed, refunded
  created_at TIMESTAMP
)
```

### **Ratings Table**
```sql
ratings (
  id UUID PRIMARY KEY,
  ride_id UUID,
  rater_id UUID,         -- who gave rating
  ratee_id UUID,         -- who received rating
  rating INT,            -- 1-5
  comment VARCHAR(500),
  created_at TIMESTAMP
)
```

### **Locations Table**
```sql
favorite_locations (
  id UUID PRIMARY KEY,
  user_id UUID,
  label VARCHAR(50),     -- Home, Work, etc
  address VARCHAR(500),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP
)
```

### **Admin Logs Table**
```sql
admin_logs (
  id UUID PRIMARY KEY,
  admin_id UUID,
  action VARCHAR(100),
  details TEXT,
  created_at TIMESTAMP
)
```

### **Settings Table**
```sql
settings (
  key VARCHAR(100) PRIMARY KEY,
  value VARCHAR(500),
  updated_at TIMESTAMP
)
```

---

## 🔌 API ENDPOINTS (50+)

### **Authentication (6 endpoints)**
```
POST   /api/v1/auth/send-otp
POST   /api/v1/auth/verify-otp
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/password-reset
```

### **Users (5 endpoints)**
```
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
GET    /api/v1/users/favorites
POST   /api/v1/users/favorites
DELETE /api/v1/users/favorites/:id
```

### **Drivers (8 endpoints)**
```
POST   /api/v1/drivers/register
GET    /api/v1/drivers/profile
PUT    /api/v1/drivers/profile
POST   /api/v1/drivers/documents
GET    /api/v1/drivers/earnings
PUT    /api/v1/drivers/status
GET    /api/v1/drivers/documents
DELETE /api/v1/drivers/documents/:id
```

### **Rides (7 endpoints)**
```
POST   /api/v1/rides/request
GET    /api/v1/rides/estimate
GET    /api/v1/rides/active
PUT    /api/v1/rides/:id/status
PUT    /api/v1/rides/:id/cancel
GET    /api/v1/rides/history
GET    /api/v1/rides/:id
```

### **Locations (4 endpoints)**
```
GET    /api/v1/location/nearby-drivers
POST   /api/v1/location/update
GET    /api/v1/location/directions
GET    /api/v1/location/geocode
```

### **Payments (4 endpoints)**
```
POST   /api/v1/payments/initiate
POST   /api/v1/payments/verify
GET    /api/v1/payments/history
POST   /api/v1/payments/refund
```

### **Ratings (3 endpoints)**
```
POST   /api/v1/ratings/submit
GET    /api/v1/ratings/my-ratings
GET    /api/v1/ratings/:user_id
```

### **Admin (12+ endpoints)**
```
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/drivers
PUT    /api/v1/admin/drivers/:id
DELETE /api/v1/admin/drivers/:id
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/:id
DELETE /api/v1/admin/users/:id
GET    /api/v1/admin/rides
GET    /api/v1/admin/analytics
PUT    /api/v1/admin/settings
POST   /api/v1/admin/notifications
GET    /api/v1/admin/reports
```

---

## 🎯 SUCCESS CRITERIA

### **Phase 1 Completion**
- ✅ All 50+ API endpoints working
- ✅ Passenger app fully functional
- ✅ Driver app fully functional
- ✅ Admin dashboard operational
- ✅ Real-time features working
- ✅ Payment integration complete
- ✅ Push notifications working
- ✅ 80%+ test coverage
- ✅ Zero critical bugs
- ✅ 99.5% uptime in testing

### **Launch Readiness**
- ✅ 50 drivers onboarded
- ✅ 50 passengers recruited
- ✅ Test launch successful (10+ rides/day)
- ✅ 95%+ driver acceptance rate
- ✅ 95%+ passenger satisfaction
- ✅ All documentation complete
- ✅ Monitoring setup
- ✅ Support process defined

---

## 📋 REQUIREMENT STATUS LEGEND

```
[x] Confirmed - Final requirement
[o] In Progress - Being refined
[ ] Not Started - Backlog
[~] Not Included Phase 1 - Future phase
```

---

**Last Updated:** January 11, 2026  
**Status:** Ready for Development  
**Next Review:** End of Week 1  

---
