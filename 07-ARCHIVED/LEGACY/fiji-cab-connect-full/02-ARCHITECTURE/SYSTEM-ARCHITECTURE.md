# 🏗️ FIJI CAB CONNECT - SYSTEM ARCHITECTURE
## Technical Specifications & Infrastructure Design

**Version:** 1.0  
**Date:** January 2, 2026  
**Status:** Architecture Planning Phase

---

## 📋 TABLE OF CONTENTS

1. [High-Level Architecture](#high-level-architecture)
2. [Technology Stack](#technology-stack)
3. [Database Design](#database-design)
4. [API Specifications](#api-specifications)
5. [Third-Party Integrations](#third-party-integrations)
6. [Security Architecture](#security-architecture)
7. [Deployment Architecture](#deployment-architecture)
8. [Scalability & Performance](#scalability--performance)

---

## 🎯 HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT APPLICATIONS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Marketing  │  │   Passenger  │  │    Driver    │        │
│  │    Website   │  │   Web App    │  │  Web Portal  │        │
│  │  (Next.js)   │  │  (React)     │  │  (React)     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Passenger  │  │    Driver    │  │    Admin     │        │
│  │  Mobile App  │  │  Mobile App  │  │   Dashboard  │        │
│  │  (Phase 2)   │  │  (Phase 2)   │  │  (React)     │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                              │
│                    (Load Balancer + SSL)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Auth API   │  │   Ride API   │  │   Admin API  │        │
│  │  (Node.js)   │  │  (Node.js)   │  │  (Node.js)   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  Notification│  │    Payment   │  │   Analytics  │        │
│  │   Service    │  │   Service    │  │   Service    │        │
│  │  (Node.js)   │  │  (Phase 3)   │  │  (Node.js)   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐         │
│  │          WebSocket Server (Real-time)            │         │
│  │              (Socket.io / Node.js)               │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  PostgreSQL  │  │     Redis    │  │   AWS S3 /   │        │
│  │  (Primary    │  │   (Cache +   │  │  DigitalOcean│        │
│  │   Database)  │  │   Sessions)  │  │    Spaces    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   THIRD-PARTY SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  Google Maps │  │   SMS/OTP    │  │    Email     │        │
│  │     API      │  │   Service    │  │   Service    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 TECHNOLOGY STACK

### Frontend Stack:

#### Marketing Website (Phase 0)
```yaml
Framework: Next.js 14+ (React)
Language: TypeScript
Styling: Tailwind CSS
Deployment: Static export (SSG)
Hosting: Netlify / Vercel / Cloudflare Pages
```

#### Web Applications (Phase 1)
```yaml
Framework: React 18+ with Vite / Next.js
Language: TypeScript
Styling: Tailwind CSS
State Management: React Context API / Zustand
Real-time: Socket.io-client
Maps: @react-google-maps/api
HTTP Client: Axios
Form Handling: React Hook Form
Validation: Zod / Yup
```

#### Mobile Apps (Phase 2)
```yaml
Framework: React Native / Flutter
Language: TypeScript / Dart
Navigation: React Navigation / Flutter Navigator
Maps: react-native-maps / google_maps_flutter
Push Notifications: Firebase Cloud Messaging
```

### Backend Stack:

```yaml
Runtime: Node.js 18+ LTS
Framework: Express.js
Language: TypeScript
API Style: RESTful + WebSocket
Authentication: JWT + Refresh Tokens
ORM: Prisma / TypeORM
Validation: Joi / Zod
File Upload: Multer
Real-time: Socket.io
Cron Jobs: node-cron
Email: Nodemailer
SMS: Twilio / MSG91
```

### Database Stack:

```yaml
Primary Database: PostgreSQL 15+
Cache/Session Store: Redis 7+
Search Engine: PostgreSQL Full-Text Search
File Storage: AWS S3 / DigitalOcean Spaces
Backup: Automated daily backups
```

### DevOps & Infrastructure:

```yaml
Cloud Provider: AWS / DigitalOcean / Hetzner
Container: Docker
Orchestration: Docker Compose (MVP), Kubernetes (Scale)
CI/CD: GitHub Actions / GitLab CI
Monitoring: Sentry (errors), LogRocket (sessions)
Analytics: Google Analytics, Custom dashboard
CDN: Cloudflare
SSL: Let's Encrypt (automated)
```

---

## 🗄️ DATABASE DESIGN

### Entity Relationship Diagram:

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Users    │         │   Drivers   │         │    Rides    │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id          │         │ id          │         │ id          │
│ phone       │◄───┐    │ user_id     │◄───┐    │ passenger_id│
│ name        │    │    │ license_no  │    │    │ driver_id   │
│ email       │    │    │ vehicle_*   │    │    │ pickup_*    │
│ role        │    │    │ documents   │    │    │ drop_*      │
│ status      │    │    │ status      │    │    │ fare        │
│ created_at  │    │    │ rating      │    │    │ status      │
└─────────────┘    │    │ created_at  │    │    │ created_at  │
       │           │    └─────────────┘    │    └─────────────┘
       │           │           │           │           │
       │           └───────────┘           └───────────┘
       │
       ↓
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Ratings   │         │   Payments  │         │ Notifications│
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id          │         │ id          │         │ id          │
│ ride_id     │         │ ride_id     │         │ user_id     │
│ from_user   │         │ amount      │         │ type        │
│ to_user     │         │ method      │         │ message     │
│ rating      │         │ status      │         │ read        │
│ comment     │         │ created_at  │         │ created_at  │
└─────────────┘         └─────────────┘         └─────────────┘
```

### Database Tables (Detailed):

#### 1. **users** (Passengers, Drivers, Admins)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(100),
    profile_picture TEXT,
    role VARCHAR(20) NOT NULL, -- 'passenger', 'driver', 'admin'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'blocked', 'pending'
    otp_code VARCHAR(6),
    otp_expires_at TIMESTAMP,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

#### 2. **drivers** (Driver-specific data)
```sql
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_photo TEXT,
    license_expiry DATE,
    vehicle_make VARCHAR(50),
    vehicle_model VARCHAR(50),
    vehicle_year INTEGER,
    vehicle_color VARCHAR(30),
    vehicle_plate VARCHAR(20) UNIQUE NOT NULL,
    vehicle_registration_photo TEXT,
    vehicle_insurance_photo TEXT,
    profile_photo TEXT,
    is_online BOOLEAN DEFAULT false,
    approval_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    rejection_reason TEXT,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_rides INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    cash_collected DECIMAL(10,2) DEFAULT 0.00,
    commission_owed DECIMAL(10,2) DEFAULT 0.00,
    current_latitude DECIMAL(10,8),
    current_longitude DECIMAL(11,8),
    last_location_update TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_drivers_user_id ON drivers(user_id);
CREATE INDEX idx_drivers_status ON drivers(approval_status);
CREATE INDEX idx_drivers_online ON drivers(is_online);
CREATE INDEX idx_drivers_location ON drivers(current_latitude, current_longitude);
```

#### 3. **rides**
```sql
CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passenger_id UUID REFERENCES users(id),
    driver_id UUID REFERENCES drivers(id),
    
    -- Location details
    pickup_address TEXT NOT NULL,
    pickup_latitude DECIMAL(10,8) NOT NULL,
    pickup_longitude DECIMAL(11,8) NOT NULL,
    
    drop_address TEXT NOT NULL,
    drop_latitude DECIMAL(10,8) NOT NULL,
    drop_longitude DECIMAL(11,8) NOT NULL,
    
    -- Ride details
    distance_km DECIMAL(8,2), -- calculated
    duration_minutes INTEGER, -- estimated/actual
    fare_estimate DECIMAL(10,2),
    fare_final DECIMAL(10,2),
    fare_breakdown JSONB, -- base, distance, time, surge
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending', 
    -- 'pending', 'accepted', 'arrived', 'started', 'completed', 'cancelled'
    
    cancelled_by UUID REFERENCES users(id),
    cancellation_reason TEXT,
    
    -- Timestamps
    requested_at TIMESTAMP DEFAULT NOW(),
    accepted_at TIMESTAMP,
    arrived_at TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    
    -- Additional
    passenger_notes TEXT,
    driver_notes TEXT,
    scheduled_for TIMESTAMP, -- for scheduled rides
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rides_passenger ON rides(passenger_id);
CREATE INDEX idx_rides_driver ON rides(driver_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_created_at ON rides(created_at);
```

#### 4. **ratings**
```sql
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID UNIQUE REFERENCES rides(id),
    from_user_id UUID REFERENCES users(id),
    to_user_id UUID REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ratings_to_user ON ratings(to_user_id);
CREATE INDEX idx_ratings_ride ON ratings(ride_id);
```

#### 5. **payments** (For Phase 3)
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID REFERENCES rides(id),
    passenger_id UUID REFERENCES users(id),
    driver_id UUID REFERENCES drivers(id),
    
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'cash', -- 'cash', 'card', 'wallet'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    
    transaction_id VARCHAR(100), -- external payment gateway
    gateway_response JSONB,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_ride ON payments(ride_id);
CREATE INDEX idx_payments_passenger ON payments(passenger_id);
CREATE INDEX idx_payments_driver ON payments(driver_id);
```

#### 6. **notifications**
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL, -- 'ride_request', 'ride_accepted', etc.
    title VARCHAR(255),
    message TEXT NOT NULL,
    data JSONB, -- additional context
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
```

#### 7. **settings** (System configuration)
```sql
CREATE TABLE settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- Example settings:
-- 'fare_config' => { base_fare: 5.00, per_km: 2.50, per_minute: 0.50 }
-- 'service_areas' => { viti_levu: true, vanua_levu: false }
-- 'commission_rate' => { rate: 0.15 }
```

---

## 🔌 API SPECIFICATIONS

### API Base URL:
```
Development: http://localhost:3000/api/v1
Production: https://api.fijicabconnect.com/v1
```

### Authentication:
All protected endpoints require JWT token in header:
```http
Authorization: Bearer <jwt_token>
```

### API Endpoints:

#### **Auth API**

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/verify-otp
POST /api/v1/auth/resend-otp
POST /api/v1/auth/logout
POST /api/v1/auth/refresh-token
```

#### **User API**

```http
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
POST   /api/v1/users/upload-photo
GET    /api/v1/users/:id
DELETE /api/v1/users/account
```

#### **Driver API**

```http
POST   /api/v1/drivers/register
PUT    /api/v1/drivers/documents
GET    /api/v1/drivers/profile
PUT    /api/v1/drivers/profile
POST   /api/v1/drivers/online
POST   /api/v1/drivers/offline
PUT    /api/v1/drivers/location
GET    /api/v1/drivers/earnings
GET    /api/v1/drivers/rides/history
```

#### **Ride API**

```http
POST   /api/v1/rides/estimate
POST   /api/v1/rides/request
GET    /api/v1/rides/:id
PUT    /api/v1/rides/:id/accept
PUT    /api/v1/rides/:id/reject
PUT    /api/v1/rides/:id/arrive
PUT    /api/v1/rides/:id/start
PUT    /api/v1/rides/:id/complete
PUT    /api/v1/rides/:id/cancel
GET    /api/v1/rides/active
GET    /api/v1/rides/history
POST   /api/v1/rides/:id/rate
```

#### **Admin API**

```http
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/users
GET    /api/v1/admin/drivers
PUT    /api/v1/admin/drivers/:id/approve
PUT    /api/v1/admin/drivers/:id/reject
GET    /api/v1/admin/rides
GET    /api/v1/admin/reports/revenue
GET    /api/v1/admin/reports/rides
PUT    /api/v1/admin/settings
GET    /api/v1/admin/live-map
```

### WebSocket Events:

```javascript
// Client → Server
socket.emit('driver:location', { latitude, longitude });
socket.emit('ride:accept', { rideId });

// Server → Client
socket.on('ride:new', (rideData) => {});
socket.on('ride:accepted', (rideData) => {});
socket.on('ride:status', (status) => {});
socket.on('driver:location', (location) => {});
```

---

## 🔗 THIRD-PARTY INTEGRATIONS

### 1. Google Maps API

**APIs Used:**
- Maps JavaScript API
- Geocoding API
- Directions API
- Distance Matrix API
- Places API

**Estimated Cost:**
- Free tier: 28,000 dynamic map loads/month
- After free tier: $7 per 1,000 loads
- Expected: $50-200/month initially

### 2. SMS Service (OTP)

**Provider Options:**
- Twilio (~$0.05/SMS)
- MSG91 (~$0.02/SMS)
- Amazon SNS (~$0.00645/SMS)

**Estimated Volume:**
- Registration OTP: ~500/month
- Login OTP: ~2,000/month
- Total: ~2,500 SMS/month
- **Cost:** $50-125/month

### 3. Email Service

**Provider:** SendGrid / Amazon SES
**Usage:**
- Welcome emails
- Password resets
- Ride confirmations
- Weekly reports

**Cost:** Free tier (100 emails/day) or $15/month

### 4. File Storage

**Provider:** AWS S3 / DigitalOcean Spaces
**Usage:**
- Profile photos
- Driver documents
- Vehicle photos

**Cost:** $5-20/month (50-200 GB)

---

## 🔒 SECURITY ARCHITECTURE

### Authentication Flow:

```
1. User enters phone number
2. Backend generates 6-digit OTP
3. OTP sent via SMS
4. User enters OTP
5. Backend verifies OTP
6. Backend generates JWT + Refresh Token
7. Client stores tokens securely
8. Subsequent requests use JWT
9. JWT expires in 24h
10. Refresh token used to get new JWT
```

### Security Measures:

✅ **Implemented:**
- HTTPS everywhere (SSL/TLS)
- JWT authentication
- Password hashing (bcrypt)
- OTP verification
- Rate limiting (prevent brute force)
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention
- CORS configuration
- Helmet.js (security headers)

✅ **Data Protection:**
- Encrypted database backups
- Secure file upload validation
- No sensitive data in logs
- GDPR-compliant data handling
- Regular security audits

---

## 🚀 DEPLOYMENT ARCHITECTURE

### Environment Setup:

```
┌──────────────────┐
│   Development    │
│  (Local Machine) │
└──────────────────┘
         ↓
┌──────────────────┐
│     Staging      │
│  (Test Server)   │
└──────────────────┘
         ↓
┌──────────────────┐
│    Production    │
│  (Live Server)   │
└──────────────────┘
```

### Server Specifications:

**Phase 1 (MVP):**
```yaml
Server: 1x VPS
CPU: 2-4 cores
RAM: 4-8 GB
Storage: 50-100 GB SSD
Bandwidth: 2-5 TB/month
Cost: $40-80/month
Provider: DigitalOcean / Hetzner / AWS
```

**Phase 2-3 (Scale):**
```yaml
Load Balancer: 1x
App Servers: 2-3x
Database Server: 1x (with replica)
Redis Server: 1x
Total Cost: $200-400/month
```

### Deployment Process:

```bash
# 1. Build
npm run build

# 2. Test
npm run test

# 3. Deploy via CI/CD
git push origin main
# → GitHub Actions triggers
# → Runs tests
# → Builds Docker image
# → Pushes to registry
# → Deploys to server
# → Health check
# → Success notification
```

---

## 📈 SCALABILITY & PERFORMANCE

### Performance Targets:

| Metric | Target | Monitoring |
|--------|--------|------------|
| **API Response Time** | < 200ms (avg) | Sentry APM |
| **Page Load Time** | < 3 seconds | Lighthouse |
| **WebSocket Latency** | < 100ms | Custom metrics |
| **Database Queries** | < 50ms (avg) | pg_stat_statements |
| **Uptime** | 99.9% | UptimeRobot |

### Caching Strategy:

```javascript
// Level 1: Browser Cache
// Static assets: 1 year
// API responses: none (or short-lived)

// Level 2: CDN Cache (Cloudflare)
// Static files, images
// Cache duration: 1 month

// Level 3: Redis Cache
// Session data: 24 hours
// User profiles: 1 hour
// Driver locations: 30 seconds
// Ride data: 5 minutes
```

### Horizontal Scaling Plan:

```
Phase 1 (0-500 rides/day):
→ 1 server handles everything

Phase 2 (500-2,000 rides/day):
→ 1 load balancer
→ 2 app servers
→ 1 database with replica

Phase 3 (2,000+ rides/day):
→ 1 load balancer
→ 3-5 app servers (auto-scaling)
→ Database cluster
→ Separate Redis cluster
→ CDN for all static assets
```

---

## 📊 MONITORING & LOGGING

### Tools:

```yaml
Error Tracking: Sentry
Performance: LogRocket / DataDog
Uptime: UptimeRobot
Server Metrics: Grafana + Prometheus
Logs: Winston (Node.js) → CloudWatch
Analytics: Google Analytics + Custom dashboard
```

### Alerts:

- ⚠️ API errors > 5% → Immediate
- ⚠️ Response time > 1s → Warning
- ⚠️ Server CPU > 80% → Warning
- ⚠️ Database connections > 90% → Critical
- ⚠️ Disk space < 10% → Critical
- ⚠️ Uptime < 99.9% → Immediate

---

## ✅ ARCHITECTURE CHECKLIST

Before deployment:

- [ ] All API endpoints documented
- [ ] Database schema reviewed and optimized
- [ ] Security measures implemented
- [ ] Third-party services configured
- [ ] Monitoring tools setup
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Disaster recovery plan documented
- [ ] SSL certificates configured
- [ ] Environment variables secured

---

## 🎯 NEXT STEPS

1. ✅ Architecture approved
2. ⏳ Database schema implementation
3. ⏳ API development (Phase 1)
4. ⏳ Integration testing
5. ⏳ Performance optimization
6. ⏳ Security audit
7. ⏳ Deployment to staging
8. ⏳ Load testing
9. ⏳ Production deployment

---

**This architecture is designed to scale from 50 drivers to 500+ drivers without major changes. It's cost-effective for MVP while allowing growth.** 🚀

---

**END OF SYSTEM ARCHITECTURE**
