# 📋 Client Requirements

This folder contains all client requirements, specifications, and project scope documentation.

## 📄 Documents

### **Client-Filled-Requirements.md**
**Original requirements directly from client**

**Contains:**
- Complete feature specifications
- User types and roles (Passenger, Driver, Admin)
- Functional requirements for each user type
- Non-functional requirements (Performance, Security, Scalability)
- Technical preferences
- Budget constraints
- Timeline expectations
- Success metrics

**When to read:** First thing when understanding project scope
**Use for:** Feature validation and scope confirmation

---

## 🎯 Project Overview

**Client:** Mohammed Ifraad Hussain  
**Project:** First cab-hailing platform in Fiji  
**Location:** Viti Levu, Fiji Islands  
**Market:** Tourists + Local residents  
**Phase 1:** Android MVP (Passenger + Driver apps + Admin dashboard)  
**Budget:** ₹95,000  
**Timeline:** 5-6 weeks (Jan 11 - Feb 28, 2026)  
**Launch Target:** March 1, 2026  
**Test Users:** 50 drivers + 50 passengers  

---

## 📱 User Types & Roles

### **1. Passenger**
**Mobile App (React Native)**
- Download and install app
- Register with phone number + SMS OTP
- View available drivers on map
- Request a ride
- See driver details and track in real-time
- Chat with driver
- Make payment (cash or online)
- Rate driver
- View ride history

### **2. Driver**
**Mobile App (React Native)**
- Download and install app
- Register with phone number + SMS OTP
- Upload documents (license, vehicle registration)
- Go online/offline
- Accept ride requests
- Navigate to pickup location
- Pickup passenger
- Navigate to destination
- Confirm ride completion
- Rate passenger
- View earnings and statistics

### **3. Admin**
**Web Dashboard (React + Vite)**
- Login with email/password
- View all users and drivers
- View all rides and statistics
- Manage drivers (approve, block, etc.)
- Manage rides (monitor, resolve issues)
- View financial reports
- View ratings and reviews
- System monitoring and alerts

---

## ✨ Key Features

### **Phase 1 Deliverables**

#### **Authentication & User Management**
- ✅ Phone-based signup with SMS OTP
- ✅ User profile management
- ✅ Driver document verification
- ✅ Role-based access control

#### **Ride Management**
- ✅ Real-time ride requests
- ✅ Driver acceptance/rejection
- ✅ Real-time location tracking
- ✅ Estimated arrival time (ETA)
- ✅ Ride history
- ✅ Ride cancellation

#### **Payments**
- ✅ Multiple payment methods (Cash + Online)
- ✅ Razorpay integration
- ✅ Payment tracking
- ✅ Invoice generation
- ✅ Cash settlement for drivers

#### **Ratings & Reviews**
- ✅ Passenger ratings driver (1-5 stars)
- ✅ Driver rates passenger (1-5 stars)
- ✅ Review comments
- ✅ Average rating display

#### **Notifications**
- ✅ Push notifications (Firebase)
- ✅ SMS notifications (OTP, ride updates)
- ✅ In-app notifications

#### **Admin Features**
- ✅ User management
- ✅ Driver management
- ✅ Ride monitoring
- ✅ Financial reporting
- ✅ System analytics

---

## 💰 Fare Structure

**Formula:** Base + Distance + Time

```
Base Fare: ₹50
Distance Charge: ₹0.10 per 100 meters
Time Charge: ₹0.18 per minute

Example (5 km, 20 min):
Base: ₹50
Distance: (5000m / 100) × ₹0.10 = ₹5
Time: 20 × ₹0.18 = ₹3.60
Total: ₹58.60
```

---

## 🎨 Brand Guidelines

**Primary Colors:**
- Emerald Green: #10b981
- Ocean Blue: #0891b2
- Amber Gold: #f59e0b

**Typography:**
- Font: Plus Jakarta Sans (or system fonts)
- Main tagline: "Ride Anywhere in Fiji"

**Brand Assets:**
- Logo
- Icon set
- Color palette
- Typography scale
- Component library

---

## 📊 Success Metrics

### **Launch Metrics**
- ✅ 50 drivers onboarded
- ✅ 50 passengers signed up
- ✅ 10+ rides/day minimum
- ✅ 99.5% uptime
- ✅ < 2s API response time

### **Quality Metrics**
- ✅ 80%+ test coverage
- ✅ 4.5+ star rating (avg)
- ✅ Zero critical bugs
- ✅ 0 security vulnerabilities

### **Business Metrics**
- ✅ Positive user feedback
- ✅ Drivers earning ₹500-1000/day
- ✅ Passengers satisfied with service
- ✅ Ready for public launch

---

## 📈 Technology Preferences

**Backend:** Python (FastAPI) - Recommended ✅
**Frontend:** React Native - Recommended ✅
**Database:** PostgreSQL - Recommended ✅
**Deployment:** AWS - Recommended ✅

---

## 🔐 Security Requirements

### **Must Have**
- ✅ HTTPS for all communication
- ✅ Authentication required for all APIs
- ✅ Password hashing (bcrypt)
- ✅ Input validation on all endpoints
- ✅ Rate limiting to prevent abuse
- ✅ Secure storage of sensitive data
- ✅ Regular security audits
- ✅ GDPR compliance (data privacy)

### **Optional (Phase 2+)**
- Biometric authentication
- Advanced fraud detection
- Encryption of ride data
- Two-factor authentication

---

## 🌍 Geographic Scope

**Primary Service Area:** Viti Levu, Fiji Islands
**Initial Launch:** Suva (capital) + Nadi (airport area)
**Future Expansion:** Other Fiji islands

---

## 👥 Team Structure

**Recommended for 4-5 developers:**
- 1 Backend lead (FastAPI)
- 1 Mobile lead (React Native)
- 1 Frontend lead (Admin dashboard)
- 1 DevOps engineer
- 1 QA engineer

---

## 📅 Timeline

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1 | 5-6 weeks | Android apps + Admin dashboard |
| Phase 2 | 4-6 weeks | iOS support |
| Phase 3 | 8-10 weeks | Web platform |
| Phase 4+ | TBD | Advanced features |

---

## 💵 Budget Allocation

| Component | Budget |
|-----------|--------|
| Backend Development | ₹30,000 |
| Mobile Apps | ₹40,000 |
| Admin Dashboard | ₹15,000 |
| Deployment & DevOps | ₹10,000 |
| **Total Phase 1** | **₹95,000** |

---

## 🚀 Launch Checklist

### **Pre-Launch (Week 6)**
- [ ] All features implemented
- [ ] 80%+ test coverage
- [ ] Documentation complete
- [ ] 50 drivers registered
- [ ] 50 passengers registered
- [ ] Payment system tested
- [ ] Notifications tested
- [ ] Performance optimized

### **Launch Day**
- [ ] All systems running
- [ ] Monitoring active
- [ ] Support team ready
- [ ] Announce to test users
- [ ] Monitor for issues
- [ ] Ready to scale

---

## 📞 Contact & Support

**Client:** Mohammed Ifraad Hussain  
**Project Manager:** [Assigned]  
**Development Lead:** [Assigned]  

---

## 📚 Related Documentation

| Document | Location |
|----------|----------|
| Full requirements | Client-Filled-Requirements.md |
| Architecture | 01-DOCUMENTATION/ |
| Development guide | 03-DEVELOPMENT-GUIDES/ |
| API specifications | 01-DOCUMENTATION/REQUIREMENTS-MATRIX.md |

---

**Last Updated:** January 11, 2026  
**Status:** ✅ Requirements Verified & Ready for Development  
**Compliance:** 100% of client requirements addressed
