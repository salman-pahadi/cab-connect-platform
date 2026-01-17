# SMS OTP Testing Guide - Development Mode

## Overview

The authentication system has been enhanced with a **development testing mode** that allows you to test the SMS OTP login flow without requiring actual SMS integration or backend API availability.

## Test Configuration

### Static Test Credentials

- **Test OTP Code**: `123456`
- **Works with**: Any valid Fiji phone number (format: +679XXXXXXX)
- **User Types**: Both Passenger and Driver
- **Mode**: Automatically enabled in development (`__DEV__` = true)

## How It Works

### 1. Send OTP (Login Screen)

**Development Mode Behavior:**
- ✅ Always succeeds regardless of phone number
- ✅ No actual SMS sent
- ✅ Console logs display the test OTP code
- ✅ Simulates 500ms network delay for realistic UX

**Console Output Example:**
```
==============================================
📱 TEST MODE: SMS OTP SENDING BYPASSED
==============================================
Phone: +6791234567
User Type: passenger
Test OTP Code: 123456
==============================================
```

**User Experience:**
- User enters phone number (any valid format)
- Taps "Send Code"
- Sees success alert: "OTP Sent"
- Navigates to OTP Verification screen
- **Check the console for the test OTP code!**

### 2. Verify OTP (Verification Screen)

**Development Mode Behavior:**
- ✅ Accepts test OTP `123456` immediately
- ✅ Returns mock access token
- ✅ Returns mock user data
- ✅ Bypasses backend API completely
- ⚠️ Any other OTP will attempt real API call (will fail if backend unavailable)

**Console Output Example:**
```
==============================================
✅ TEST MODE: OTP VERIFIED SUCCESSFULLY
==============================================
Phone: +6791234567
OTP: 123456
User Type: passenger
Mock Token: test_access_token_1234567890
==============================================
```

**User Experience:**
- User enters `123456` in the 6-digit OTP input
- Auto-verifies when 6th digit is entered
- Receives mock authentication token
- Navigates to Home screen (or Registration if `isNewUser: true`)

### 3. Get Current User

**Development Mode Behavior:**
- ✅ Returns mock user data when test token detected
- ✅ Simulates 200ms network delay
- ✅ No backend API required

**Mock User Data:**
```json
{
  "id": 1,
  "full_name": "Test User",
  "phone_number": "+6791234567",
  "email": "test@example.com",
  "user_type": "passenger",
  "is_verified": true,
  "is_active": true,
  "profile_picture_url": null
}
```

## Testing Instructions

### Quick Test (Passenger App)

1. **Launch Passenger App**
   ```bash
   cd 09-FRONTEND-MOBILE
   npm start
   # Press 'a' for Android or 'i' for iOS
   ```

2. **Login Flow**
   - Open app → Navigate to Login
   - Enter phone: `+6791234567` (or any number)
   - Tap "Send Code"
   - **Check console** - you'll see: `Test OTP Code: 123456`
   - Enter OTP: `123456`
   - ✅ Successfully logged in!

3. **Verify Success**
   - Should navigate to Home screen
   - Check Redux state for auth token
   - Check AsyncStorage for saved token

### Quick Test (Driver App)

**Note**: Driver app authentication screens not yet implemented. Will be added in next phase.

## Production Mode

### Switching to Production

To test with real backend SMS integration:

1. **Open**: `09-FRONTEND-MOBILE/src/services/authService.ts`

2. **Change Line 11:**
   ```typescript
   // Development mode (test OTP)
   const DEV_MODE = __DEV__; 
   
   // Production mode (real SMS)
   const DEV_MODE = false;
   ```

3. **Restart app** - will now use real backend API for all auth calls

### Production Behavior

- Calls `/auth/send-otp` endpoint
- Sends actual SMS via Twilio/AWS SNS
- Requires backend server running
- Validates OTP against backend
- Returns real user data from database

## Code Location

**Modified Files:**

1. **Auth Service** (Test logic implemented)
   - `09-FRONTEND-MOBILE/src/services/authService.ts`
   - Lines 11-13: Test configuration
   - Lines 89-122: Test OTP send logic
   - Lines 133-165: Test OTP verification logic
   - Lines 213-238: Test user data logic

2. **Login Screen** (No changes needed)
   - `09-FRONTEND-MOBILE/src/screens/auth/LoginScreen.tsx`
   - Works seamlessly with test mode

3. **OTP Verification Screen** (No changes needed)
   - `09-FRONTEND-MOBILE/src/screens/auth/OTPVerificationScreen.tsx`
   - Auto-detects test mode responses

## Troubleshooting

### Issue: OTP verification fails

**Solution**: Make sure you're entering exactly `123456` (no spaces)

### Issue: Console doesn't show test OTP

**Solution**: 
1. Check that `DEV_MODE = __DEV__` in authService.ts
2. Ensure Metro bundler is running with dev mode enabled
3. Check terminal where Expo/Metro is running

### Issue: "Failed to send OTP" error

**Possible Causes**:
1. DEV_MODE is set to `false` (production mode)
2. Backend API is not running (if in production mode)
3. Network connectivity issue

**Solution**: Verify `DEV_MODE = __DEV__` in authService.ts

### Issue: App navigates to Registration instead of Home

**Solution**: This is controlled by `isNewUser` flag in verify OTP response
- Line 149 in authService.ts: `isNewUser: false`
- Change to `true` to test registration flow

## Testing Different Scenarios

### Test Registration Flow (New User)

In `authService.ts`, line 149, change:
```typescript
isNewUser: true  // Will navigate to Registration screen
```

### Test Different User Types

Both work identically:
- `passenger` - Passenger app login
- `driver` - Driver app login

### Test Error Handling

Enter any OTP OTHER than `123456`:
- Will attempt real API call
- Will fail gracefully if backend unavailable
- Error message displayed to user

## Security Notes

⚠️ **IMPORTANT**: 
- Test mode ONLY works in development (`__DEV__ = true`)
- Production builds automatically disable test mode
- Test tokens are prefixed with `test_access_token_`
- Backend should NEVER accept test tokens

## Next Steps

1. ✅ **Test SMS Integration** - When backend is ready
2. ✅ **Implement Driver Auth** - Add auth screens to Driver app
3. ✅ **Add Biometric** - Face ID / Fingerprint for returning users
4. ✅ **Add Social Auth** - Google / Apple Sign In options
5. ✅ **Improve Error Messages** - User-friendly error states

## Questions?

Contact development team or check:
- Backend API docs: `/08-BACKEND/docs/`
- Auth slice: `09-FRONTEND-MOBILE/src/redux/slices/authSlice.ts`
- API client: `09-FRONTEND-MOBILE/src/services/api.ts`

---

**Last Updated**: January 2026  
**Status**: ✅ Implemented & Working  
**Test Coverage**: Login flow, OTP verification, Mock user data
