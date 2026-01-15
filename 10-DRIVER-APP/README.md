# 🚗 Cab Connect Driver App

**Cab Connect Driver Mobile Application** - A professional React Native (Expo) mobile app for drivers to accept rides, track earnings, and manage their driving schedule.

## 🌟 Overview

The Cab Connect Driver App is a production-ready mobile application built with:
- **React Native** (Expo) for cross-platform development
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Render.com** backend integration
- **Google Maps** for real-time tracking
- **Professional UI/UX** with Emerald Green design system

## 📋 Features

### Core Features
- ✅ **Phone-based Authentication** - SMS OTP verification
- ✅ **Professional Onboarding** - 4-step onboarding flow
- ✅ **Driver Dashboard** - Real-time earnings and ride status
- ✅ **Status Toggle** - Go online/offline with one tap
- ✅ **Ride Requests** - Accept/reject ride notifications
- ✅ **Live Location Tracking** - Real-time driver location
- ✅ **Earnings Tracking** - Daily and total earnings
- ✅ **Driver Profile** - Manage profile and documents

### Coming Soon
- 📍 Real-time ride requests
- 💬 In-app chat with passengers
- ⭐ Rating system
- 📊 Detailed earnings analytics
- 🎯 Performance badges

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Android Studio or a physical Android device with Expo Go app
- Git

### Installation

1. **Clone and navigate to Driver App:**
```bash
cd 10-DRIVER-APP
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env.development
```

Update `.env.development` with:
```
EXPO_PUBLIC_API_URL=https://cab-connect-api.onrender.com/api/v1
EXPO_PUBLIC_APP_NAME=Cab Connect Driver
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

4. **Start the app:**
```bash
npm start
```

5. **Run on Android:**
- Press `a` in terminal for Android emulator
- Or scan QR code with Expo Go app on physical device

## 📁 Project Structure

```
10-DRIVER-APP/
├── src/
│   ├── screens/
│   │   ├── Splash/
│   │   │   └── SplashScreen.tsx         # Splash screen with logo
│   │   ├── Onboarding/
│   │   │   ├── OnboardingScreen1.tsx    # Welcome hero (Emerald)
│   │   │   ├── OnboardingScreen2.tsx    # How it works (Ocean Blue)
│   │   │   ├── OnboardingScreen3.tsx    # Safety features (Amber)
│   │   │   ├── OnboardingScreen4.tsx    # Get verified CTA
│   │   │   └── OnboardingFlow.tsx       # Navigation container
│   │   ├── Dashboard/
│   │   │   └── DriverDashboard.tsx      # Main dashboard
│   │   └── RideManagement/
│   │       ├── RideRequestScreen.tsx    # Incoming requests
│   │       └── ActiveRideScreen.tsx     # Current ride
│   ├── components/
│   │   ├── RideCard.tsx
│   │   ├── EarningsWidget.tsx
│   │   └── StatusToggle.tsx
│   ├── navigation/
│   │   └── index.tsx                    # Navigation setup
│   ├── redux/
│   │   ├── store.ts                     # Redux store
│   │   ├── hooks.ts                     # Custom hooks
│   │   └── slices/
│   │       ├── driverSlice.ts           # Driver state
│   │       ├── rideSlice.ts             # Ride state
│   │       └── locationSlice.ts         # Location state
│   ├── services/
│   │   └── apiService.ts                # API calls
│   ├── types/
│   │   └── index.ts                     # TypeScript types
│   └── utils/
│       └── helpers.ts                   # Utility functions
├── assets/
│   ├── logo/                            # Official logos
│   └── images/                          # App images
├── app.json                             # Expo config
├── App.tsx                              # Root component
├── tsconfig.json                        # TypeScript config
├── babel.config.js                      # Babel config
├── package.json                         # Dependencies
└── .env.development                     # Environment variables
```

## 🎨 Design System

### Colors
- **Primary (Emerald Green):** `#10b981` - Main actions, status online
- **Secondary (Ocean Blue):** `#0891b2` - How it works section
- **Accent (Amber Gold):** `#f59e0b` - Safety section
- **Gray Scale:** `#111827` (text), `#6b7280` (secondary), `#f9fafb` (bg)

### Typography
- **Headers:** Plus Jakarta Sans, Bold, 24px+
- **Body:** Plus Jakarta Sans, Regular, 14-16px
- **Small Text:** Plus Jakarta Sans, Regular, 12-13px

### Spacing
- Section padding: 24px horizontal, 30px vertical
- Component gap: 12-16px
- Card padding: 16px

## 🔄 Redux State Management

### Driver State (`driverSlice`)
```typescript
{
  id: string | null,
  name: string | null,
  phone: string | null,
  isOnline: boolean,
  rating: number,
  todayEarnings: number,
  totalEarnings: number,
  isAuthenticated: boolean
}
```

### Ride State (`rideSlice`)
```typescript
{
  incomingRequest: RideRequest | null,
  activeRide: ActiveRide | null,
  rideHistory: ActiveRide[],
  isLoading: boolean
}
```

### Location State (`locationSlice`)
```typescript
{
  currentLat: number | null,
  currentLng: number | null,
  isTracking: boolean
}
```

## 🔌 API Integration

### Backend URL
```
Production: https://cab-connect-api.onrender.com/api/v1
```

### Key Endpoints (Driver-specific)

#### Authentication
- `POST /auth/send-otp` - Send OTP
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/login` - Login with credentials

#### Driver Management
- `GET /drivers/:id/profile` - Get driver profile
- `PUT /drivers/:id/profile` - Update profile
- `PUT /drivers/:id/status` - Update online status
- `GET /drivers/:id/earnings` - Get earnings data

#### Ride Management
- `GET /rides/available` - Get available ride requests
- `POST /rides/:id/accept` - Accept a ride
- `PUT /rides/:id/status` - Update ride status
- `GET /drivers/:id/rides` - Get ride history

#### Location
- `POST /location/update` - Update driver location

## 📱 Screens Overview

### 1. Splash Screen
- Duration: 2.5 seconds
- Shows official Cab Connect logo
- Animated fade-in effect
- Auto-transitions to onboarding

### 2. Onboarding Flow (4 Screens)

#### Screen 1: Welcome Hero
- Emerald Green (#10b981)
- "Be Your Own Boss" headline
- 3 key benefits (Earn Daily, Your Schedule, Protected)
- Next button

#### Screen 2: How It Works
- Ocean Blue (#0891b2)
- 4-step process visualization
- Feature grid (Live Tracking, Chat, Stats, Alerts)
- Back/Next buttons

#### Screen 3: Safety & Quality
- Amber Gold (#f59e0b)
- 4 safety features with emojis
- Driver protection program card
- Back/Next buttons

#### Screen 4: Get Verified
- Emerald Green (#10b981)
- Checklist of required steps
- Documents needed section
- Verification timeline
- Back/Get Started buttons

### 3. Driver Dashboard
- Status toggle (Online/Offline)
- Today's earnings display (FJD currency)
- Rides completed counter
- Driver rating display
- Quick action buttons
- Active ride section
- 24/7 support link

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

### Type Check
```bash
npm run type-check
```

## 🏗️ Building for Production

### Build Android APK
```bash
npm run build:android
```

### Build for Google Play Store
```bash
eas build --platform android
```

### Configuration
- Min SDK: 21 (Android 5.0+)
- Target SDK: 34 (Android 14)
- Package Name: `com.cabconnect.driver`
- Hermes Engine: Enabled
- New Architecture: Enabled

## 📚 Navigation Structure

```
App (Navigation Container)
├── Splash Screen
│   └── (Auto-transitions to next screen)
├── Onboarding Flow
│   ├── Onboarding Screen 1
│   ├── Onboarding Screen 2
│   ├── Onboarding Screen 3
│   └── Onboarding Screen 4
└── Main (Bottom Tab Navigator)
    ├── Dashboard Tab
    ├── Earnings Tab (Coming Soon)
    ├── Profile Tab (Coming Soon)
    └── Support Tab (Coming Soon)
```

## 🔐 Security

- SMS OTP verification for authentication
- JWT tokens for API calls
- Sensitive data not stored locally
- HTTPS only for API communication
- Environment variables for secrets
- No hardcoded credentials

## 🚨 Error Handling

- Network error recovery
- Offline mode detection
- OTP timeout handling
- Location permission requests
- API error messages
- Retry logic for failed requests

## 📊 State Flow Example

```
User Opens App
    ↓
Splash Screen (2.5s)
    ↓
Check if Authenticated
    ├─ No → Onboarding Flow
    │   ├ Welcome
    │   ├ How It Works
    │   ├ Safety
    │   └ Get Verified (Completes Onboarding)
    │       ↓
    │   setDriverData({ isAuthenticated: true })
    │
    └─ Yes → Driver Dashboard
        ├─ Show Status Toggle
        ├─ Display Today's Earnings
        ├─ Show Ride Statistics
        └─ Ready to Accept Rides
```

## 🔄 Next Steps

### Priority 1: Complete Infrastructure
- [x] Redux store setup
- [x] Navigation setup
- [x] Splash & onboarding screens
- [x] Dashboard screen
- [ ] Login/authentication screens
- [ ] API service integration

### Priority 2: Core Features
- [ ] Real-time ride requests
- [ ] Accept/reject rides
- [ ] Live location tracking
- [ ] Active ride management
- [ ] Earnings tracking

### Priority 3: Polish & Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E testing
- [ ] Performance optimization
- [ ] Accessibility audit

### Priority 4: Launch
- [ ] Google Play Store submission
- [ ] Beta testing with 50 drivers
- [ ] Analytics setup
- [ ] Error monitoring (Sentry)

## 📦 Dependencies

### Production
- `react-native` - Mobile framework
- `expo` - Development platform
- `@react-navigation` - Routing
- `@reduxjs/toolkit` - State management
- `axios` - HTTP client
- `react-native-maps` - Maps integration
- `expo-location` - Location services
- `socket.io-client` - Real-time updates

### Development
- `typescript` - Type safety
- `eslint` - Code linting
- `prettier` - Code formatting
- `jest` - Testing
- `@testing-library/react-native` - Component testing

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache
expo start --clear

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Emulator issues
- Ensure Android Studio is installed
- Run: `emulator -list-avds` to see available emulators
- Start emulator before running app

### API connection issues
- Verify `.env.development` has correct API URL
- Check Render backend status: https://dashboard.render.com
- Test API with Postman

### TypeScript errors
```bash
npm run type-check
```

## 📞 Support

- **Backend API:** https://cab-connect-api.onrender.com/docs
- **GitHub:** [Repository]
- **Issues:** Report in GitHub Issues

## 📄 License

Proprietary - Cab Connect Private Limited

---

**Last Updated:** January 15, 2026  
**Version:** 1.0.0-beta  
**Status:** 🚧 In Development (Beta)
