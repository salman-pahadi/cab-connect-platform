# 🚀 Render Deployment Guide

## ✅ DEPLOYMENT READY STATUS

### Backend API
- ✅ Dockerfile configured (Python 3.14)
- ✅ Requirements.txt complete
- ✅ Health check endpoint `/health`
- ✅ CORS configured
- ✅ render.yaml created

### Mobile App
- ✅ Assets created (icon, splash, adaptive-icon)
- ✅ app.json configured
- ✅ 14/14 tests passing
- ⚠️ 1 lint error fixed, 26 warnings remaining (non-blocking)

---

## 📋 DEPLOYMENT STEPS

### STEP 1: Deploy Backend to Render

#### Option A: Blueprint (Automated - Recommended)
1. Go to https://dashboard.render.com
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Select `render.yaml` from root
5. Click "Apply"
6. **Done!** Render creates:
   - Web Service (cab-connect-api)
   - PostgreSQL Database (cab-connect-db)
   - Redis Cache (cab-connect-redis)

#### Option B: Manual Setup
1. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Name: `cab-connect-db`
   - Plan: Free
   - Create Database
   - **Copy** Internal Database URL

2. **Create Redis:**
   - New → Redis
   - Name: `cab-connect-redis`
   - Plan: Free
   - Create
   - **Copy** Internal Redis URL

3. **Create Web Service:**
   - New → Web Service
   - Connect repository
   - Name: `cab-connect-api`
   - Environment: Python 3
   - Build Command: `pip install -r 08-BACKEND/requirements.txt`
   - Start Command: `cd 08-BACKEND && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Plan: Free

4. **Set Environment Variables:**
   ```
   DATABASE_URL = [Paste PostgreSQL Internal URL]
   REDIS_URL = [Paste Redis Internal URL]
   SECRET_KEY = [Generate random 32-char string]
   JWT_SECRET_KEY = [Generate random 32-char string]
   ENVIRONMENT = production
   DEBUG = false
   CORS_ORIGINS = *
   JWT_ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 1440
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first build
   - Check logs for "🚀 Starting Cab Connect Backend..."

### STEP 2: Run Database Migrations

After backend deploys successfully:

1. Go to your web service → "Shell"
2. Run:
   ```bash
   cd 08-BACKEND
   alembic upgrade head
   ```

### STEP 3: Test Backend API

**Your backend URL:** `https://cab-connect-api.onrender.com`

Test endpoints:
```bash
# Health check
curl https://cab-connect-api.onrender.com/health

# Root
curl https://cab-connect-api.onrender.com/

# API Docs
# Visit: https://cab-connect-api.onrender.com/docs
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### STEP 4: Configure Mobile App

Update API URL in mobile app:

**File:** `09-FRONTEND-MOBILE/src/services/api.ts`

```typescript
// Find this line:
const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:8000'  // Local development
  : 'https://your-backend-url.com';  // Production

// Replace with:
const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:8000'
  : 'https://cab-connect-api.onrender.com';  // Your Render URL
```

### STEP 5: Build Android APK

**Option A: EAS Build (Recommended)**
```bash
cd 09-FRONTEND-MOBILE

# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build APK
eas build --platform android --profile preview

# Wait 10-15 minutes
# Download APK when ready
```

**Option B: Local Build**
```bash
cd 09-FRONTEND-MOBILE

# Prebuild native code
npx expo prebuild --platform android

# Build APK
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### STEP 6: Test Deployed System

1. **Install APK on Android device/emulator**
2. **Test passenger flow:**
   - ✅ Register new account
   - ✅ Login with OTP
   - ✅ View home screen
   - ✅ Create booking
   - ⚠️ **Cannot complete ride** (no driver app yet)

---

## ⚠️ CURRENT LIMITATIONS

### What Works:
- ✅ Passenger registration & login
- ✅ OTP verification
- ✅ Create booking request
- ✅ View ride history
- ✅ Profile management

### What Doesn't Work:
- ❌ **Driver app** (not built yet)
- ❌ **Real-time tracking** (WebSocket not implemented)
- ❌ **Google Maps** (not integrated)
- ❌ **Complete rides** (no drivers to accept)

### Technical Debt:
- ⚠️ 26 ESLint warnings (`any` types)
- ⚠️ Missing driver endpoints
- ⚠️ No WebSocket implementation

---

## 📊 NEXT STEPS TO COMPLETE

To have a **fully functional system**, complete these:

### Priority 1: Driver App (2-3 days)
- Build 6 driver screens
- Connect to existing backend APIs
- Enable ride acceptance

### Priority 2: WebSocket (1 day)
- Implement real-time location tracking
- Add ride status updates
- Enable driver-passenger communication

### Priority 3: Google Maps (1 day)
- Integrate Google Maps SDK
- Add route visualization
- Enable location picking

### Priority 4: Fix Quality (1 hour)
- Remove all `any` types
- Fix ESLint warnings
- Pass zero-tolerance checks

**Total Time:** 5-7 days for complete system

---

## 🎯 DEPLOYMENT CHECKLIST

### Backend
- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Blueprint deployed (render.yaml)
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Health check returns 200
- [ ] API docs accessible

### Mobile
- [ ] API URL updated to Render
- [ ] EAS CLI installed
- [ ] EAS build configured
- [ ] APK built successfully
- [ ] APK tested on device
- [ ] Basic flows working

### Post-Deployment
- [ ] Test user registration
- [ ] Test OTP login
- [ ] Test booking creation
- [ ] Check backend logs (no errors)
- [ ] Monitor performance
- [ ] Document known limitations

---

## 💡 RENDER FREE TIER LIMITS

**Web Service:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Auto-sleep after 15 min inactivity
- ⚠️ First request after sleep: 30-60 sec delay

**PostgreSQL:**
- ✅ 1 GB storage
- ✅ 10 GB bandwidth/month
- ✅ 100 connections max

**Redis:**
- ✅ 25 MB storage
- ✅ 250 MB bandwidth/month

**Recommendation:** Upgrade to paid ($7/month) when you launch to avoid sleep delays.

---

## 🆘 TROUBLESHOOTING

### Backend won't start
- Check logs in Render dashboard
- Verify environment variables set
- Ensure DATABASE_URL is Internal URL
- Check requirements.txt has all deps

### Database connection error
- Use Internal Database URL (not External)
- Format: `postgresql://user:pass@host/db`
- Verify database is running

### Mobile can't connect to backend
- Check API URL in api.ts
- Verify backend health check works
- Check CORS_ORIGINS includes mobile domain

### APK build fails
- Check Node.js version (16+)
- Run `npm install` again
- Clear cache: `npx expo start -c`
- Check app.json syntax

---

**Created:** January 14, 2026
**Status:** Ready for deployment (partial system)
**Next Review:** After driver app completion
