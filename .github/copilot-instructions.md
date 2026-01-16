# GitHub Copilot Instructions - Cab Connect Platform

**Fiji's AI-First Ride-Hailing Platform | Phase 1 MVP Active Development**

## Quick Context Protocol

**Start EVERY session by reading these files in order:**
1. `prefix.md` → complete development framework & 16-expert team
2. `START-HERE.md` → project navigation & folder guide
3. `PROGRESS-TRACKER.md` → current status & next micro-tasks
4. `02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md` → milestone tracking

**Use canonical specs** in `01-DOCUMENTATION/REFERENCE/` (28 locked documents). Never modify `03_PHASE1_DECISIONS.md` (immutable).

## Project Structure (Canonical Paths)

```
08-BACKEND/               # FastAPI + PostgreSQL + SQLAlchemy
09-ADMIN-DASHBOARD/       # Next.js 14 + Redux Toolkit + Tailwind
10-PASSENGER-APP/         # React Native (Expo) + Redux + Maps
11-DRIVER-APP/            # React Native (Expo) + Redux + Location
fiji-cab-connect-marketing-website/  # Next.js marketing site (deployed)
```

## Phase 1 Architectural Constraints (Non-Negotiable)

These are LOCKED decisions documented in `01-DOCUMENTATION/REFERENCE/03_PHASE1_DECISIONS.md`:

- **Real-time:** REST polling only (no WebSockets/Socket.IO)
- **Payments:** Cash only (no Stripe/PayPal/payment gateways)
- **Data:** Real backend APIs only (zero mock data tolerance)
- **Assignment:** Broadcast to drivers, first accept wins
- **Auth:** Phone + SMS OTP (Firebase/Twilio)
- **Hosting:** AWS (RDS PostgreSQL, S3 for documents)

## Code Quality Zero-Tolerance Rules

**Frontend (React Native & Next.js):**
- ❌ No TypeScript `any` types (use proper types or `unknown`)
- ❌ No relative imports deeper than `../` (use `@/` alias exclusively)
- ❌ No lint errors or warnings (ESLint must pass)
- ✅ All API clients use axios interceptors for auth tokens
- ✅ Redux Toolkit for app state (avoid React Context for global state)

**Backend (FastAPI/Python):**
- ❌ No lint errors (Ruff must pass: `ruff check .`)
- ❌ No type errors (mypy must pass: `mypy .`)
- ✅ All endpoints return Pydantic response models
- ✅ Business logic in `app/services/`, not in route handlers
- ✅ Dependency injection via `Depends()` for DB sessions and auth

## Backend Patterns (FastAPI)

### File Organization
```
08-BACKEND/app/
├── api/v1/          # All routes under /api/v1/
│   ├── auth.py      # send-otp, verify-otp, register
│   ├── rides.py     # create, accept, complete, cancel
│   └── health.py    # /health endpoint
├── services/        # Business logic (AuthService, RideService)
├── schemas/         # Pydantic request/response models
├── models/          # SQLAlchemy ORM models
├── database/        # DB session, connection
└── utils/           # JWT, SMS, helpers
```

### Route Example Pattern
```python
# app/api/v1/auth.py
@router.post("/send-otp", response_model=SendOTPResponse)
async def send_otp(request: SendOTPRequest, db: Session = Depends(get_db)):
    success, message, expires_in = AuthService.send_otp(
        db, request.phone_number, request.user_type
    )
    return SendOTPResponse(success=success, message=message, expires_in=expires_in)
```

### Service Layer Pattern
All business logic lives in `app/services/`. Route handlers orchestrate, services execute.

## Frontend Patterns (React Native)

### Redux Store Structure
```
src/store/
├── index.ts          # Store configuration
├── authSlice.ts      # Auth state (token, user, isAuthenticated)
└── rideSlice.ts      # Active ride state
```

### API Client Pattern (10-PASSENGER-APP/src/services/api.ts)
```typescript
class ApiService {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({ baseURL: API_CONFIG.BASE_URL });
    this.setupInterceptors(); // Auth token injection
  }
}
```

### Import Pattern (MANDATORY)
```typescript
// ✅ CORRECT
import { apiService } from '@/services/api';
import { LoginScreen } from '@/screens/auth/LoginScreen';

// ❌ WRONG (will fail linting)
import { apiService } from '../../../services/api';
```

### Accessibility Pattern (React Native)
```typescript
// ✅ CORRECT - Accessible button with proper touch target
import { Pressable, Text } from 'react-native';

<Pressable
  accessible={true}
  accessibilityLabel="Accept ride request"
  accessibilityRole="button"
  accessibilityHint="Tap to accept this ride and start navigation"
  style={{ minHeight: 44, minWidth: 44, padding: 12 }}
  onPress={handleAcceptRide}
>
  <Text style={{ fontSize: 16 }}>Accept Ride</Text>
</Pressable>

// ✅ CORRECT - Accessible image
<Image
  source={{ uri: driver.photoUrl }}
  accessible={true}
  accessibilityLabel="Driver profile photo"
  style={{ width: 50, height: 50, borderRadius: 25 }}
/>

// ✅ CORRECT - Accessible input
<TextInput
  placeholder="Pickup location"
  accessible={true}
  accessibilityLabel="Enter pickup location"
  accessibilityHint="Type your starting address"
  style={{ minHeight: 44 }}
/>

// ❌ WRONG - No accessibility props, small touch target
<TouchableOpacity onPress={handlePress} style={{ padding: 4 }}>
  <Text>Accept</Text>
</TouchableOpacity>
```

## Admin Dashboard Patterns (Next.js)

- **State:** Redux Toolkit via `09-ADMIN-DASHBOARD/src/store/`
- **API:** Centralized client in `09-ADMIN-DASHBOARD/src/lib/api.ts`
- **Forms:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS (utility-first)
- **Testing:** Vitest + React Testing Library

## Local Development Workflows

### Backend Setup (Windows PowerShell)
```powershell
# Start local PostgreSQL + Redis (Docker)
.\start-local-db.ps1  # Uses docker-compose.local.yml

# From 08-BACKEND/
python -m venv venv
venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload  # http://localhost:8000

# Quality checks
ruff check .           # Linting (must pass)
mypy .                 # Type checking (must pass)
pytest                 # Tests (need DB connection)
```

### Frontend Setup
```powershell
# Passenger/Driver Apps
cd 10-PASSENGER-APP  # or 11-DRIVER-APP
npm install
npm start            # Opens Expo Dev Tools

# Quality gates
npm run type-check   # TypeScript validation
npm run lint         # ESLint (must pass)
npm test             # Jest tests

# Admin Dashboard
cd 09-ADMIN-DASHBOARD
npm install
npm run dev          # http://localhost:3000

# Quality gates
npm run type-check
npm run lint
npm run test
```

### Quality Gate Script (Root Level)
```powershell
.\run-frontend-quality-gates.ps1  # Runs all frontend checks
```

### Environment Variables (Required)
```bash
# Backend (08-BACKEND/.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/cabconnect
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=30
SMS_API_KEY=your-sms-api-key
SMS_PROVIDER=twilio  # or firebase
ENVIRONMENT=development
DEBUG=true

# Mobile Apps (.env or app.config.js)
GOOGLE_MAPS_API_KEY=your-google-maps-key
API_BASE_URL=http://localhost:8000/api/v1
# Production: https://cab-connect-backend.onrender.com/api/v1

# Admin Dashboard (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
# Production: https://cab-connect-backend.onrender.com/api/v1
```

### Database Migrations (Alembic)
```powershell
# After schema changes in models
cd 08-BACKEND
alembic revision --autogenerate -m "description"
alembic upgrade head

# Rollback if needed
alembic downgrade -1
```

### Docker Commands (Common Operations)
```powershell
docker ps                    # Check running containers
docker logs postgres-dev     # View PostgreSQL logs
docker exec -it postgres-dev psql -U postgres -d cabconnect  # Access DB
```

## Testing Requirements

**Backend (pytest):**
- Tests in `08-BACKEND/tests/`
- Requires local PostgreSQL connection
- Run: `pytest` (from 08-BACKEND/)
- Coverage: `pytest --cov=app --cov-report=html`

**Frontend (Jest/Vitest):**
- Passenger/Driver: Jest + React Testing Library
- Admin: Vitest + React Testing Library
- All components must have tests
- Mock API calls using axios-mock-adapter

## Database Patterns

**Schema Location:** `01-DOCUMENTATION/REFERENCE/06_DATABASE_SCHEMA.md`

**Key Tables:**
- `users` - Passengers (phone, name, created_at)
- `drivers` - Drivers (phone, vehicle_type, is_approved)
- `rides` - Bookings (passenger_id, driver_id, status, pickup/dropoff)
- `driver_locations` - Latest GPS coordinates (driver_id, lat, lng)
- `otp_logs` - OTP verification tracking

**Relationships:**
- One driver per ride (no ride-sharing in Phase 1)
- One active ride per driver at a time
- Polling for location updates (no real-time subscriptions)

## API Structure (RESTful Conventions)

**Base URL:** `http://localhost:8000/api/v1/`

**Auth Endpoints:**
- `POST /api/v1/auth/send-otp` - Send OTP to phone
- `POST /api/v1/auth/verify-otp` - Verify OTP, get JWT
- `POST /api/v1/auth/register` - Register new user

**Ride Endpoints:**
- `POST /api/v1/rides/` - Create booking (passenger)
- `POST /api/v1/rides/{ride_id}/accept` - Accept ride (driver)
- `POST /api/v1/rides/{ride_id}/complete` - Mark complete (driver)
- `GET /api/v1/rides/active` - Get active ride

**API Contract:** Full spec in `01-DOCUMENTATION/REFERENCE/07_API_CONTRACTS.md`

## Security Patterns

**Authentication:**
- JWT tokens via `Authorization: Bearer <token>` header
- Token generation in `08-BACKEND/app/utils/jwt.py`
- Frontend stores tokens in AsyncStorage (React Native) or localStorage (Next.js)

**Protected Routes:**
```python
# Backend
from app.utils.jwt import get_user_from_token

@router.get("/profile")
async def get_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    user = get_user_from_token(credentials.credentials, db)
    # ... logic
```

**Rate Limiting (Critical for SMS Costs):**
```python
# Prevent SMS abuse - limit OTP requests
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/send-otp")
@limiter.limit("3/minute")  # Max 3 OTP per minute per IP
async def send_otp(request: SendOTPRequest):
    # ... implementation
```

## Performance Patterns (Phase 1)

**Polling Intervals (Balance real-time feel with server load):**
```typescript
// Optimal intervals for Phase 1
const POLLING_INTERVALS = {
  driverLocation: 5000,      // 5s during active ride
  rideStatus: 3000,          // 3s when waiting for driver
  availableRides: 10000,     // 10s when driver is online
  rideHistory: 30000,        // 30s for history updates
};

// Implementation example
useEffect(() => {
  const interval = setInterval(() => {
    if (activeRide) {
      fetchDriverLocation();
    }
  }, POLLING_INTERVALS.driverLocation);
  
  return () => clearInterval(interval);
}, [activeRide]);
```

## Debugging & Troubleshooting

**Common Issues:**

1. **Backend tests fail with "connection refused"**
   - Solution: Run `.\start-local-db.ps1` to start PostgreSQL Docker container
   - Verify: `docker ps` should show postgres container running on port 5432

2. **Frontend lint errors: "must use import alias"**
   - Solution: Replace `../../../module` with `@/module`
   - Check: `10-PASSENGER-APP/tsconfig.json` has `"@/*": ["src/*"]` path mapping

3. **TypeScript `any` type violations**
   - Solution: Use proper types from `@/types/` or `unknown` with type guards
   - Check: `npm run type-check` must show 0 errors

## Where to Find Information

**Architecture & Decisions:**
- System design: `01-DOCUMENTATION/REFERENCE/05_SYSTEM_ARCHITECTURE.md`
- Locked decisions: `01-DOCUMENTATION/REFERENCE/03_PHASE1_DECISIONS.md` (READ-ONLY)
- Database: `01-DOCUMENTATION/REFERENCE/06_DATABASE_SCHEMA.md`

**Code Standards:**
- Project structure: `04-CODING-STANDARDS/technical-architecture.md`
- AI rules: `.cursorrules` (auto-loaded by Cursor IDE)

**Development Guides:**
- Week-by-week plan: `03-DEVELOPMENT-GUIDES/WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md`
- Implementation patterns: `03-DEVELOPMENT-GUIDES/implementation-strategy.md`

**Current Status:**
- Session log: `PROGRESS-TRACKER.md` (updated daily)
- Milestone tracking: `02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md`

## Definition of Done (Phase 1 Features)

Before marking any feature as complete, verify:

**Backend Feature:**
- [ ] SQLAlchemy model created with proper relationships
- [ ] Pydantic schemas for request/response validation
- [ ] Service layer implements business logic (not in routes)
- [ ] API endpoint under `/api/v1/` with proper HTTP methods
- [ ] Unit tests written with >80% coverage (`pytest --cov`)
- [ ] Ruff linting passes (`ruff check .`)
- [ ] Type checking passes (`mypy app/`)
- [ ] Tested via Swagger UI at `/docs`
- [ ] Error handling with appropriate status codes
- [ ] Database migration created if schema changed

**Mobile Feature:**
- [ ] TypeScript strict mode (zero `any` types)
- [ ] Redux slice created for state management
- [ ] API integration with axios interceptors
- [ ] Accessibility props on all interactive elements (44px touch targets)
- [ ] Error handling with user-friendly messages
- [ ] Loading states implemented
- [ ] Tested on real iOS and Android devices
- [ ] `npm run type-check` passes (0 errors)
- [ ] `npm run lint` passes (0 errors/warnings)
- [ ] `npm test` passes (Jest tests)

**Admin Feature:**
- [ ] Next.js page component with proper routing
- [ ] TypeScript types defined (no `any`)
- [ ] API integration tested
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Form validation with React Hook Form + Zod
- [ ] Error handling and loading states
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes (Vitest)

**All Features:**
- [ ] No console.log statements (use proper logging)
- [ ] PROGRESS-TRACKER.md updated with changes
- [ ] Screenshots/demo recorded if UI change
- [ ] Peer reviewed (if team development)

## Anti-Patterns to Avoid

❌ **Never use mock data** - All API calls must hit real backend  
❌ **Never use WebSockets** - Polling only (Phase 1 constraint)  
❌ **Never skip quality gates** - Lint/type-check must pass before commit  
❌ **Never use relative imports** - Always use `@/` path alias  
❌ **Never put business logic in routes** - Use service layer (`app/services/`)  
❌ **Never commit without updating PROGRESS-TRACKER.md** - Document all changes

## Session Closing Checklist

Before ending a development session, verify:
1. ✅ All lint errors resolved (`npm run lint` or `ruff check .`)
2. ✅ All type errors resolved (`npm run type-check` or `mypy .`)
3. ✅ Tests pass (`npm test` or `pytest`)
4. ✅ No `console.log` statements (use proper logging)
5. ✅ `PROGRESS-TRACKER.md` updated with changes
6. ✅ No `any` types in TypeScript code
