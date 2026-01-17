# Legacy Milestone 4 (Archived): Real-time & Payments

> **Archived On:** January 15, 2026
>
> This document is preserved for historical reference only.
>
> **Phase 1 (MVP) Guardrails:**
> - No WebSockets / Socket.IO (polling only)
> - Cash payments only (no Stripe/PayPal/Razorpay in Phase 1)
>
> The content below was removed from the active tracker (`PROGRESS-TRACKER.md`) to prevent confusion.

---

## ðŸŽ¯ ACTIVE MILESTONE - MILESTONE 4

**Focus:** Real-time Features & Payment Integration  
**Status:** ðŸš§ IN PROGRESS (0% Complete)  
**Timeline:** 5-7 days (estimated)  
**Current Sprint:** Week 1 of 2

### **Milestone 4 Objectives**

1. **Real-time Tracking** - WebSocket infrastructure for live location updates
2. **Payment Integration** - Stripe/PayPal gateway implementation
3. **Notifications** - Push notifications for ride status
4. **Rating System** - Driver/passenger rating functionality
5. **Testing** - Comprehensive E2E tests for real-time features

---

## ðŸ“Š MILESTONE 4 MICRO-TASKS

### **ðŸŽ¯ NEXT PRIORITY: Micro-Task 4.1**

---

### **Micro-Task 4.1: WebSocket Infrastructure Setup** âš¡ NEXT

**Status:** ðŸ”² NOT STARTED  
**Priority:** HIGH  
**Estimated Time:** 3-4 hours  
**Dependencies:** Milestone 3 complete âœ…  
**Assigned Expert(s):** Robert Chen, Michael Thompson, Preet Kapoor

**Description:**
Implement WebSocket infrastructure for real-time communication between passengers, drivers, and admin dashboard. Enable live location tracking, ride status updates, and instant notifications.

**Subtasks:**
- [ ] 4.1.1 - Install and configure FastAPI WebSocket support
- [ ] 4.1.2 - Create WebSocket connection manager (handle multiple clients)
- [ ] 4.1.3 - Implement authentication for WebSocket connections
- [ ] 4.1.4 - Create WebSocket endpoints (/ws/rides/{ride_id}, /ws/driver/{driver_id})
- [ ] 4.1.5 - Add Redis pub/sub for multi-instance support
- [ ] 4.1.6 - Write WebSocket connection tests (pytest)
- [ ] 4.1.7 - Update API documentation with WebSocket specs

**Acceptance Criteria:**
- [ ] WebSocket connections established and maintained
- [ ] Authentication working on WebSocket handshake
- [ ] Multiple clients can connect simultaneously
- [ ] Messages broadcast correctly to connected clients
- [ ] Connection recovery handled gracefully
- [ ] Redis pub/sub working for horizontal scaling
- [ ] Tests passing (connection, auth, broadcast)
- [ ] Zero lint errors, zero TypeScript errors
- [ ] Documentation updated

**Files to Create/Modify:**
- `08-BACKEND/app/api/v1/websockets/rides.py` (NEW)
- `08-BACKEND/app/core/websocket_manager.py` (NEW)
- `08-BACKEND/app/tests/test_websockets.py` (NEW)
- `01-DOCUMENTATION/REFERENCE/07_API_CONTRACTS.md` (UPDATE)

**Reference Documents:**
- `@01-DOCUMENTATION/REFERENCE/05_SYSTEM_ARCHITECTURE.md` (WebSocket design)
- `@prefix.md` (Zero tolerance rules)
- `@implementation-strategy.md` (Code patterns)

**Blockers:** None

**Last Updated:** January 12, 2026  
**Notes:** This enables real-time tracking foundation for entire platform

---

### **Micro-Task 4.2: Mobile WebSocket Client**

**Status:** ðŸ”² NOT STARTED  
**Priority:** HIGH  
**Estimated Time:** 3 hours  
**Dependencies:** Micro-Task 4.1 complete  
**Assigned Expert(s):** Robert Chen, Sarah Martinez

**Description:**
Implement WebSocket client in React Native mobile app for receiving real-time updates about ride status, driver location, and notifications.

**Subtasks:**
- [ ] 4.2.1 - Install Socket.IO client or native WebSocket library
- [ ] 4.2.2 - Create WebSocket service hook (useWebSocket)
- [ ] 4.2.3 - Implement connection management (connect, disconnect, reconnect)
- [ ] 4.2.4 - Add authentication to WebSocket connection
- [ ] 4.2.5 - Create event listeners (ride updates, location updates)
- [ ] 4.2.6 - Integrate with Redux store (real-time state updates)
- [ ] 4.2.7 - Add offline handling and reconnection logic
- [ ] 4.2.8 - Write unit tests for WebSocket hook

**Acceptance Criteria:**
- [ ] WebSocket connects successfully to backend
- [ ] Authentication token passed in connection
- [ ] Real-time messages received and processed
- [ ] Redux state updates on incoming messages
- [ ] Reconnection works after network loss
- [ ] Loading states handled gracefully
- [ ] Tests passing (connection, messages, reconnect)
- [ ] Zero TypeScript errors
- [ ] Mobile responsive (tested on devices)

**Files to Create/Modify:**
- `10-PASSENGER-APP/src/services/websocket.ts` (NEW)
- `10-PASSENGER-APP/src/hooks/useWebSocket.ts` (NEW)
- `10-PASSENGER-APP/src/store/slices/realtimeSlice.ts` (NEW)
- `10-PASSENGER-APP/src/hooks/useWebSocket.test.ts` (NEW)

**Blockers:** Depends on Micro-Task 4.1 completion

**Last Updated:** January 12, 2026

---

### **Micro-Task 4.3: Live Location Tracking**

**Status:** ðŸ”² NOT STARTED  
**Priority:** HIGH  
**Estimated Time:** 4 hours  
**Dependencies:** Micro-Tasks 4.1, 4.2 complete  
**Assigned Expert(s):** Robert Chen, Rachel Kumar

**Description:**
Implement real-time location tracking for drivers during active rides. Driver app broadcasts location every 5 seconds, passenger app receives and displays location on map.

**Subtasks:**
- [ ] 4.3.1 - Add React Native geolocation permissions
- [ ] 4.3.2 - Implement background location tracking (driver app)
- [ ] 4.3.3 - Create location broadcast service (emit every 5s via WebSocket)
- [ ] 4.3.4 - Add location update endpoint (fallback for HTTP polling)
- [ ] 4.3.5 - Implement map component with live driver marker
- [ ] 4.3.6 - Add route polyline from driver to passenger
- [ ] 4.3.7 - Optimize location updates (throttle, debounce)
- [ ] 4.3.8 - Test on real devices (Android & iOS)

**Acceptance Criteria:**
- [ ] Driver location updates every 5 seconds during ride
- [ ] Passenger sees driver location in real-time on map
- [ ] Route displayed from driver to pickup/dropoff
- [ ] Battery optimization (location updates stop when ride ends)
- [ ] Works in background (Android & iOS)
- [ ] Map performance smooth (60fps)
- [ ] HTTP fallback works if WebSocket unavailable
- [ ] Tests passing
- [ ] Zero memory leaks

**Files to Create/Modify:**
- `10-PASSENGER-APP/src/services/location.ts` (NEW)
- `10-PASSENGER-APP/src/components/map/LiveMap.tsx` (NEW)
- `10-PASSENGER-APP/src/screens/ActiveRideScreen.tsx` (MODIFY)
- `08-BACKEND/app/api/v1/endpoints/location.py` (NEW)

**Blockers:** Depends on Micro-Tasks 4.1, 4.2

**Last Updated:** January 12, 2026

---

### **Micro-Task 4.4: Payment Gateway Integration (Stripe)**

**Status:** ðŸ”² NOT STARTED  
**Priority:** HIGH  
**Estimated Time:** 5-6 hours  
**Dependencies:** Milestone 3 complete âœ…  
**Assigned Expert(s):** Nina Sharma, Alex Morgan, Robert Chen

**Description:**
Integrate Stripe payment gateway for ride payments. Support credit/debit cards, saved payment methods, and automatic charging after ride completion.

**Subtasks:**
- [ ] 4.4.1 - Setup Stripe account and get API keys
- [ ] 4.4.2 - Install Stripe SDK (Python backend, React Native mobile)
- [ ] 4.4.3 - Create payment intent endpoint (POST /api/v1/payments/intent)
- [ ] 4.4.4 - Implement payment confirmation endpoint
- [ ] 4.4.5 - Add saved payment methods (CRUD endpoints)
- [ ] 4.4.6 - Create mobile payment screen (card input form)
- [ ] 4.4.7 - Implement automatic charging on ride completion
- [ ] 4.4.8 - Add webhook handling for Stripe events
- [ ] 4.4.9 - Write payment tests (mock Stripe in tests)
- [ ] 4.4.10 - Add payment logging and fraud detection

**Acceptance Criteria:**
- [ ] Stripe integration working (test mode)
- [ ] Payment intent created successfully
- [ ] Card input form validated (Stripe Elements)
- [ ] Payment confirmation returns success/failure
- [ ] Saved payment methods CRUD working
- [ ] Automatic charging on ride end successful
- [ ] Webhook endpoint secured (signature verification)
- [ ] PCI compliance followed (no card storage on server)
- [ ] Error handling for failed payments
- [ ] Tests passing (mock Stripe API)
- [ ] Zero security vulnerabilities
- [ ] Refund endpoint implemented

**Files to Create/Modify:**
- `08-BACKEND/app/api/v1/endpoints/payments.py` (NEW)
- `08-BACKEND/app/services/payment_service.py` (NEW)
- `08-BACKEND/app/api/v1/webhooks/stripe.py` (NEW)
- `10-PASSENGER-APP/src/screens/PaymentScreen.tsx` (NEW)
- `10-PASSENGER-APP/src/components/payment/CardInput.tsx` (NEW)
- `01-DOCUMENTATION/REFERENCE/10_SECURITY_GUIDELINES.md` (UPDATE)

**Blockers:** None (can work in parallel with WebSocket tasks)

**Last Updated:** January 12, 2026  
**Notes:** Use Stripe test mode with test cards during development

---

### **Micro-Task 4.5: Push Notifications (Firebase)**

**Status:** ðŸ”² NOT STARTED  
**Priority:** MEDIUM  
**Estimated Time:** 3-4 hours  
**Dependencies:** None  
**Assigned Expert(s):** Robert Chen, Michael Thompson

**Description:**
Implement push notifications using Firebase Cloud Messaging (FCM) for ride status updates, driver arrival, payment confirmations, and promotional messages.

**Subtasks:**
- [ ] 4.5.1 - Setup Firebase project and get credentials
- [ ] 4.5.2 - Install Firebase Admin SDK (backend)
- [ ] 4.5.3 - Install Firebase messaging (mobile app)
- [ ] 4.5.4 - Implement FCM token registration endpoint
- [ ] 4.5.5 - Create notification service (send_notification function)
- [ ] 4.5.6 - Add notification triggers (ride status changes)
- [ ] 4.5.7 - Implement foreground notification handling (mobile)
- [ ] 4.5.8 - Test notifications on Android & iOS

**Acceptance Criteria:**
- [ ] Firebase project configured
- [ ] FCM tokens stored in database
- [ ] Notifications sent successfully from backend
- [ ] Foreground notifications displayed in app
- [ ] Background notifications work (app closed)
- [ ] Notification tap opens relevant screen
- [ ] Notification permissions requested on app start
- [ ] Tests passing
- [ ] iOS push certificate configured

**Files to Create/Modify:**
- `08-BACKEND/app/services/notification_service.py` (NEW)
- `10-PASSENGER-APP/src/services/notifications.ts` (NEW)
- `10-PASSENGER-APP/app.json` (MODIFY - Firebase config)

**Blockers:** None

**Last Updated:** January 12, 2026

---

### **Micro-Task 4.6: Rating & Review System**

**Status:** ðŸ”² NOT STARTED  
**Priority:** MEDIUM  
**Estimated Time:** 3 hours  
**Dependencies:** Milestone 3 complete âœ…  
**Assigned Expert(s):** Robert Chen, David Wilson

**Description:**
Implement driver and passenger rating system. After ride completion, both parties can rate each other (1-5 stars) and leave optional comments.

**Subtasks:**
- [ ] 4.6.1 - Create rating API endpoints (POST /api/v1/ratings)
- [ ] 4.6.2 - Add rating validation (1-5 stars, optional comment)
- [ ] 4.6.3 - Implement rating screen (modal after ride completion)
- [ ] 4.6.4 - Calculate and display average ratings (driver profile)
- [ ] 4.6.5 - Add rating history endpoint (GET /api/v1/ratings/user/{id})
- [ ] 4.6.6 - Implement rating notifications (driver rated)
- [ ] 4.6.7 - Write rating tests

**Acceptance Criteria:**
- [ ] Rating API working (create, read)
- [ ] Validation enforced (1-5 stars)
- [ ] Rating modal appears after ride completion
- [ ] Average rating calculated correctly
- [ ] Rating history displayed in profile
- [ ] Both driver and passenger can rate
- [ ] Comments optional and sanitized
- [ ] Tests passing

**Files to Create/Modify:**
- `08-BACKEND/app/api/v1/endpoints/ratings.py` (ENHANCE - from Milestone 3)
- `10-PASSENGER-APP/src/screens/RatingScreen.tsx` (NEW)
- `10-PASSENGER-APP/src/components/rating/StarRating.tsx` (NEW)

**Blockers:** None

**Last Updated:** January 12, 2026
