# ðŸš€ Driver App - Client Testing Deployment Checklist

**Goal:** Get Driver App running for client demo/testing  
**Timeline:** 2-3 hours to complete all steps  
**Current Status:** Code Complete âœ… | Assets & Build Pending â³

---

## âœ… STEP 1: Install Dependencies (5 minutes)

```powershell
# Navigate to Driver App folder
cd D:\Salman\Projects\fijicabconnect.com\cab-connect-platform-main\11-DRIVER-APP

# Install all packages
npm install

# Expected packages to install:
# - React Native, React, Expo
# - Redux Toolkit, React Redux
# - React Navigation (stack, bottom-tabs, native)
# - Axios
# - Socket.io-client
# - Expo Location, Constants, Status Bar
```

**Verification:**
```powershell
# Check if node_modules folder created
Get-ChildItem node_modules -Directory | Measure-Object | Select-Object Count

# Should show 500+ packages
```

---

## âœ… STEP 2: Copy Logo Assets (2 minutes)

The Driver App references logo files that need to be copied from Passenger App:

```powershell
# Create assets directory if not exists
New-Item -ItemType Directory -Force -Path "11-DRIVER-APP\src\assets\logo"

# Copy logo files from Passenger App
Copy-Item "10-PASSENGER-APP\src\assets\logo\*" -Destination "11-DRIVER-APP\src\assets\logo\" -Force

# Verify files copied
Get-ChildItem "11-DRIVER-APP\src\assets\logo\" | Select-Object Name, Length
```

**Required Files:**
- âœ… `logo-stacked.png` (used in SplashScreen)
- âœ… `logo-icon.png` (used in app.json adaptive icon)
- âœ… `logo-horizontal.png` (optional, for dashboard header)

**Alternative if files don't exist:**
Use placeholder images or create simple logo files. For demo purposes, you can temporarily comment out the Image components.

---

## âœ… STEP 3: Setup Environment Variables (3 minutes)

Create `.env.development` file:

```powershell
# Navigate to Driver App root
cd 11-DRIVER-APP

# Create .env.development file
@"
# Backend API Configuration
EXPO_PUBLIC_API_URL=https://cab-connect-api.onrender.com/api/v1

# Google Maps API Key (get from Google Cloud Console)
EXPO_PUBLIC_MAPS_API_KEY=your_google_maps_key_here

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_APP_VERSION=1.0.0
"@ | Out-File -FilePath ".env.development" -Encoding UTF8

# Verify file created
Get-Content .env.development
```

**Note:** For demo without backend, the API calls will fail gracefully with Alert messages. This is acceptable for UI/UX demonstration.

---

## âœ… STEP 4: Install Expo CLI Globally (if not installed)

```powershell
# Install Expo CLI
npm install -g expo-cli

# Verify installation
expo --version

# Install EAS CLI for building
npm install -g eas-cli

# Verify EAS installation
eas --version
```

---

## âœ… STEP 5: Configure Fonts (CRITICAL - 10 minutes)

The app uses **Plus Jakarta Sans** font family. You have 2 options:

### Option A: Use Expo Google Fonts (Recommended)

```powershell
# Install font package
cd 11-DRIVER-APP
npm install @expo-google-fonts/plus-jakarta-sans expo-font

# Update App.tsx to load fonts
```

Then update `App.tsx`:

```typescript
import React from 'react';
import { useFonts } from 'expo-font';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Medium': PlusJakartaSans_500Medium,
    'PlusJakartaSans-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // ... rest of App.tsx
}
```

### Option B: Use System Fonts (Quick Fix)

For immediate testing, replace all font families with system defaults:

Find and replace in all screen files:
- `PlusJakartaSans-Regular` â†’ `'System'`
- `PlusJakartaSans-Medium` â†’ `'System'`
- `PlusJakartaSans-SemiBold` â†’ `'System'`
- `PlusJakartaSans-Bold` â†’ `'System'`

---

## âœ… STEP 6: Fix Navigation Import Issue (2 minutes)

Update `11-DRIVER-APP\src\navigation\index.tsx` - move Text import to top:

```typescript
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// ... rest of imports
```

---

## âœ… STEP 7: Add Mock Data for Demo (10 minutes)

Create a mock data file to demonstrate ride flows without backend:

```powershell
# Create utils directory if not exists
New-Item -ItemType Directory -Force -Path "11-DRIVER-APP\src\utils"
```

Create `11-DRIVER-APP\src\utils\mockData.ts`:

```typescript
export const mockRideRequest = {
  id: 'ride_123456',
  passengerId: 'pass_001',
  passengerName: 'John Doe',
  passengerRating: 4.8,
  passengerPhone: '+6791234567',
  pickupAddress: 'Downtown Shopping Center, Suva',
  dropoffAddress: 'Nausori International Airport, Nausori',
  fare: 24.50,
  estimatedDuration: 18,
  distance: 12.3,
};

export const mockActiveRide = {
  ...mockRideRequest,
  status: 'accepted',
  startedAt: new Date().toISOString(),
};

export const mockRideHistory = [
  {
    id: 'ride_123',
    passengerName: 'Sarah Johnson',
    pickupAddress: 'Downtown Shopping Center, Suva',
    dropoffAddress: 'Nausori Airport, Nausori',
    fare: 24.50,
    distance: 12.3,
    duration: 18,
    completedAt: new Date().toISOString(),
    rating: 5,
    hasRated: true,
  },
  {
    id: 'ride_122',
    passengerName: 'Michael Wong',
    pickupAddress: 'Nausori Airport, Nausori',
    dropoffAddress: 'City Center, Suva',
    fare: 18.50,
    distance: 8.7,
    duration: 12,
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    rating: 4,
    hasRated: true,
  },
];
```

---

## âœ… STEP 8: Start Development Server (2 minutes)

```powershell
# Navigate to Driver App
cd 11-DRIVER-APP

# Start Expo development server
npm start

# Or with cache clear if issues:
npm start -- --clear
```

**Expected Output:**
```
Starting Metro Bundler...
Expo DevTools running at http://localhost:19002
```

**Options to View App:**
1. **Expo Go App** (fastest) - Scan QR code on Android device
2. **Android Emulator** - Press 'a' in terminal
3. **Build APK** (for client sharing) - Use EAS Build

---

## âœ… STEP 9: Test on Device with Expo Go (5 minutes)

### For Your Testing:

1. **Install Expo Go** on Android device from Play Store
2. **Connect to same WiFi** as your computer
3. **Scan QR code** from terminal with Expo Go app
4. **App will load** - wait 30-60 seconds first time

### For Client Demo:

Option A: **Share Expo Go Link**
```powershell
# In terminal where npm start is running
# Press 's' to create shareable link
# Share link with client (requires Expo account)
```

Option B: **Build APK** (recommended for client)
```powershell
# Login to Expo (create free account first)
eas login

# Configure project
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Will provide download link after 5-10 minutes
# Share APK link with client
```

---

## âœ… STEP 10: Enable Demo Mode in App (15 minutes)

To demonstrate all screens without backend, add demo button to Dashboard:

Update `11-DRIVER-APP\src\screens\Dashboard\DriverDashboard.tsx`:

Add this button in the dashboard (after support section):

```typescript
{/* Demo Mode - Remove after client review */}
<View style={styles.demoSection}>
  <Text style={styles.demoTitle}>ðŸŽ­ Demo Mode</Text>
  <TouchableOpacity
    style={styles.demoButton}
    onPress={() => {
      // Mock incoming ride request
      dispatch(setIncomingRequest(mockRideRequest));
      navigation.navigate('RidesTab', { screen: 'RideRequest' });
    }}
  >
    <Text style={styles.demoButtonText}>Show Ride Request</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={styles.demoButton}
    onPress={() => {
      // Mock active ride
      dispatch(setActiveRide(mockActiveRide));
      navigation.navigate('RidesTab', { screen: 'ActiveRide' });
    }}
  >
    <Text style={styles.demoButtonText}>Show Active Ride</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={styles.demoButton}
    onPress={() => {
      // Load mock history
      dispatch(setRideHistory(mockRideHistory));
      navigation.navigate('RidesTab', { screen: 'RideHistory' });
    }}
  >
    <Text style={styles.demoButtonText}>Show Ride History</Text>
  </TouchableOpacity>
</View>
```

Add styles:

```typescript
demoSection: {
  backgroundColor: '#fef3c7',
  borderRadius: 12,
  padding: 16,
  marginBottom: 20,
  borderWidth: 2,
  borderColor: '#fbbf24',
  borderStyle: 'dashed',
},
demoTitle: {
  fontSize: 14,
  fontWeight: '700',
  color: '#92400e',
  marginBottom: 12,
  textAlign: 'center',
},
demoButton: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: '#fbbf24',
},
demoButtonText: {
  fontSize: 13,
  fontWeight: '600',
  color: '#92400e',
  textAlign: 'center',
},
```

Import mock data at top:

```typescript
import { mockRideRequest, mockActiveRide, mockRideHistory } from '@/utils/mockData';
import { setIncomingRequest, setActiveRide, setRideHistory } from '@/redux/slices/rideSlice';
```

---

## âœ… STEP 11: Quick Fixes for Common Issues

### Issue 1: "Cannot find module" errors

```powershell
# Clear cache and reinstall
cd 11-DRIVER-APP
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm start -- --clear
```

### Issue 2: Metro bundler port conflict

```powershell
# Kill process on port 8081
netstat -ano | findstr :8081
taskkill /PID <PID_NUMBER> /F

# Or change port
npm start -- --port 8082
```

### Issue 3: Image assets not loading

Temporarily comment out Image components and replace with View + Text:

```typescript
// Instead of:
<Image source={require('@/assets/logo/logo-stacked.png')} />

// Use:
<View style={{ backgroundColor: '#10b981', width: 120, height: 120, borderRadius: 60 }}>
  <Text style={{ fontSize: 48, textAlign: 'center' }}>ðŸš–</Text>
</View>
```

### Issue 4: Font family errors

Replace all fontFamily styles with default:

```powershell
# Quick find/replace in all files
# Remove all fontFamily: 'PlusJakartaSans-*' lines
```

---

## âœ… STEP 12: Pre-Demo Checklist

Before showing to client, verify:

### Functionality Tests:
- [ ] App launches without crashes
- [ ] Splash screen displays (2.5 seconds)
- [ ] Onboarding flow works (4 screens â†’ Dashboard)
- [ ] Dashboard displays with online/offline toggle
- [ ] Demo buttons trigger ride screens
- [ ] RideRequestScreen shows with countdown
- [ ] ActiveRideScreen displays status correctly
- [ ] RideHistoryScreen shows mock rides
- [ ] RideCompletionScreen shows rating interface
- [ ] Bottom tabs switch correctly (4 tabs)
- [ ] Back buttons navigate properly
- [ ] No console errors in terminal

### Visual Tests:
- [ ] Colors match design (Emerald #10b981, Ocean #0891b2, Amber #f59e0b)
- [ ] Text is readable (not cut off)
- [ ] Buttons are tappable (good size)
- [ ] Spacing looks professional
- [ ] Animations are smooth
- [ ] No layout shifts or glitches

### Demo Flow:
1. âœ… Open app â†’ Splash â†’ Onboarding (skip through 4 screens)
2. âœ… Dashboard â†’ Tap "Show Ride Request" demo button
3. âœ… See incoming request â†’ Tap "Accept Ride"
4. âœ… Active ride screen â†’ Tap "Arrived at Pickup" â†’ "Start Ride" â†’ "End Ride"
5. âœ… Completion screen â†’ Rate 5 stars â†’ Submit
6. âœ… Back to Dashboard â†’ Navigate to Earnings tab
7. âœ… See ride history â†’ Tap ride card â†’ View details modal
8. âœ… Close modal â†’ Switch to Profile tab

---

## ðŸŽ¯ QUICK START (TL;DR - 15 minutes)

For fastest demo setup:

```powershell
# 1. Install dependencies
cd 11-DRIVER-APP
npm install

# 2. Copy assets (or skip if using emoji placeholders)
Copy-Item "10-PASSENGER-APP\src\assets\logo\*" -Destination "11-DRIVER-APP\src\assets\logo\" -Force

# 3. Create .env file
@"
EXPO_PUBLIC_API_URL=https://cab-connect-api.onrender.com/api/v1
"@ | Out-File -FilePath ".env.development" -Encoding UTF8

# 4. Fix fonts (quick method)
# Open each screen file and remove fontFamily lines OR install expo-google-fonts

# 5. Start server
npm start

# 6. Scan QR with Expo Go app on Android device
```

**If any errors:** Follow detailed steps above.

---

## ðŸ“¦ CLIENT SHARING OPTIONS

### Option 1: Expo Go (Easiest - 5 minutes)
- Client installs Expo Go from Play Store
- You share QR code or link
- âš ï¸ Requires same WiFi network OR Expo account tunnel

### Option 2: Build APK (Professional - 20 minutes)
```powershell
# Login to Expo (create free account)
eas login

# Configure EAS
eas build:configure

# Build preview APK
eas build --platform android --profile preview

# After build completes (5-10 min), get download link
# Share APK download link with client via email/WhatsApp
```

**Client installs:** Download APK â†’ Enable "Install from unknown sources" â†’ Install â†’ Open

### Option 3: Internal Testing (Production-like - 1 hour)
```powershell
# Build production APK
eas build --platform android --profile production

# Upload to Google Play Console â†’ Internal Testing
# Add client's email as tester
# Client gets email with install link
```

---

## ðŸ› Troubleshooting

### Error: "Unable to resolve module"
```powershell
npm install --legacy-peer-deps
npm start -- --clear
```

### Error: "Metro bundler crashed"
```powershell
watchman watch-del-all  # If watchman installed
npm start -- --reset-cache
```

### Error: "Network request failed"
- Check `.env.development` file exists
- Verify `EXPO_PUBLIC_API_URL` is set
- Accept that API calls will fail in demo mode (expected)

### Error: "Invariant Violation: requireNativeComponent"
- Ensure all @react-navigation packages are installed
- Check package.json has all navigation dependencies

---

## âœ… Success Criteria

**You're ready for client demo when:**

1. âœ… App launches on device without crashes
2. âœ… Can navigate through onboarding to dashboard
3. âœ… Demo buttons trigger all 4 ride screens
4. âœ… Visual design looks professional (colors, spacing)
5. âœ… No major console errors (warnings are okay)
6. âœ… Client can install and run the app independently

**Client should see:**
- Professional onboarding experience (4 screens)
- Clean driver dashboard with online/offline toggle
- Realistic ride request flow (countdown, accept/decline)
- Active ride tracking interface
- Ride history with filtering
- Completion screen with rating

**What client WON'T see (expected):**
- Real ride requests (no backend integration yet)
- Actual Google Maps (placeholder shown)
- Real-time location tracking
- Push notifications
- Actual payments processing

---

## ðŸ“ž Next Steps After Client Approval

Once client approves UI/UX:

1. **Backend Integration** (1 week)
   - Connect all API endpoints
   - Test with Render backend
   - Handle authentication flow

2. **Google Maps Integration** (3 days)
   - Replace map placeholders
   - Add live location tracking
   - Implement turn-by-turn navigation

3. **Push Notifications** (2 days)
   - Setup Firebase
   - Handle ride request notifications
   - Test on real devices

4. **Authentication Screens** (1 week)
   - Login with phone/OTP
   - Profile setup
   - Document upload
   - Verification pending screen

5. **Beta Testing** (2 weeks)
   - Deploy to 50 test drivers
   - Collect feedback
   - Fix bugs
   - Optimize performance

6. **Play Store Launch** (1 week)
   - Create store listing
   - Upload screenshots
   - Submit for review
   - Launch to public

---

## ðŸ“Š Estimated Timeline

```
Current Status:    â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–‘â–‘â–‘â–‘ 80% Complete

Remaining Tasks:
â”œâ”€ Assets & Setup:        2 hours  â³
â”œâ”€ Demo Mode:             1 hour   â³
â”œâ”€ Build APK:             20 min   â³
â”œâ”€ Client Testing:        1 day    â³
â”œâ”€ Backend Integration:   1 week   ðŸ“…
â”œâ”€ Maps Integration:      3 days   ðŸ“…
â”œâ”€ Authentication:        1 week   ðŸ“…
â”œâ”€ Beta Testing:          2 weeks  ðŸ“…
â””â”€ Play Store Launch:     1 week   ðŸ“…

Total to Production:      5-6 weeks
```

---

**Need Help?** Check error messages carefully and refer to this checklist step-by-step. Most issues are missing dependencies or asset files.

**Created:** January 15, 2026  
**Last Updated:** January 15, 2026  
**Status:** Ready for Implementation âœ…

