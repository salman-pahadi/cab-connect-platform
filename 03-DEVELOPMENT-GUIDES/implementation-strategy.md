# 🛠️ IMPLEMENTATION STRATEGY & DEVELOPMENT PATTERNS

**Cab Connect Platform - Comprehensive Development Workflow**

*Version: 1.0 | Updated: January 12, 2026 | Session Management System*

---

## 📋 TABLE OF CONTENTS

1. [Session Workflow](#session-workflow)
2. [Code Patterns & Templates](#code-patterns--templates)
3. [File Naming Conventions](#file-naming-conventions)
4. [Testing Strategy](#testing-strategy)
5. [Deployment Workflow](#deployment-workflow)
6. [Error Handling Patterns](#error-handling-patterns)
7. [Common Pitfalls](#common-pitfalls)

---

## 🔄 SESSION WORKFLOW

### **Every Session Initialization (MANDATORY)**

```bash
# Step 1: Read Documentation (5 minutes)
@prefix.md                              # Complete framework
@START-HERE.md                          # Project navigation
@PROGRESS-TRACKER.md                    # Current status
@02-PROJECT-PLANNING/PROJECT-STATUS-DASHBOARD.md

# Step 2: Check Relevant Canonical Docs (3 minutes)
# Based on your task area:
Backend → @01-DOCUMENTATION/REFERENCE/06_DATABASE_SCHEMA.md
Backend → @01-DOCUMENTATION/REFERENCE/07_API_CONTRACTS.md
Frontend → @01-DOCUMENTATION/REFERENCE/02_BRAND_GUIDELINES.md
Security → @01-DOCUMENTATION/REFERENCE/10_SECURITY_GUIDELINES.md
Decisions → @01-DOCUMENTATION/REFERENCE/03_PHASE1_DECISIONS.md

# Step 3: Identify Next Task (2 minutes)
# From PROGRESS-TRACKER.md, find:
# - Current phase
# - Next priority micro-task
# - Any blocked dependencies
# - Last completed task
```

### **Session Execution Checklist**

```
□ Documentation read
□ Current task identified
□ Dependencies checked (no blockers)
□ Environment running (Docker, servers)
□ Git branch created (feature/task-name)
□ One micro-task focus
□ Code with types, tests, comments
□ Lint errors = 0
□ TypeScript errors = 0
□ Security warnings = 0
□ Tested on mobile/tablet/desktop
□ Progress tracker updated
□ Git commit with clear message
□ Session summary added to tracker
```

### **Session Completion Template**

```markdown
## Session: [Date] - [Task Name]

**Completed:**
- ✅ [Specific subtask 1]
- ✅ [Specific subtask 2]

**Files Modified:**
- `path/to/file1.ts` - [What changed]
- `path/to/file2.tsx` - [What changed]

**Tests Added:**
- `path/to/test.spec.ts` - [What tests]

**Next Session:**
- 🎯 [Next priority task]
- ⚠️ Blockers: [Any dependencies or issues]

**Notes:**
- [Any important context for next session]
```

---

## 💻 CODE PATTERNS & TEMPLATES

### **1. Backend API Endpoint (FastAPI)**

```python
# File: 08-BACKEND/app/api/v1/endpoints/bookings.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.schemas.booking import Booking, BookingCreate, BookingUpdate
from app.services.booking_service import BookingService
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Booking, status_code=status.HTTP_201_CREATED)
async def create_booking(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    booking_in: BookingCreate,
) -> Booking:
    """
    Create new booking.
    
    Requires:
    - Authentication
    - Valid pickup/dropoff locations
    - Available drivers in area
    
    Returns:
    - Created booking with assigned driver
    
    Raises:
    - 400: Invalid request data
    - 404: No available drivers
    - 401: Unauthorized
    """
    try:
        # Input validation
        if not booking_in.pickup_location or not booking_in.dropoff_location:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Pickup and dropoff locations are required"
            )
        
        # Business logic in service layer
        booking_service = BookingService(db)
        booking = await booking_service.create_booking(
            user_id=current_user.id,
            booking_data=booking_in
        )
        
        return booking
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        # Log error for monitoring
        logger.error(f"Booking creation failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create booking"
        )

@router.get("/{booking_id}", response_model=Booking)
async def get_booking(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Booking:
    """Get booking by ID (user can only access own bookings)."""
    booking_service = BookingService(db)
    booking = await booking_service.get_booking(booking_id)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Authorization check
    if booking.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this booking"
        )
    
    return booking
```

**Key Pattern Elements:**
- ✅ Dependency injection for db and auth
- ✅ Type hints on all parameters/returns
- ✅ Docstrings with requirements/raises
- ✅ Input validation before business logic
- ✅ Service layer for complex operations
- ✅ Proper HTTP status codes
- ✅ Authorization checks
- ✅ Error logging for monitoring
- ✅ User-friendly error messages

---

### **2. React Native Component (Mobile)**

```typescript
// File: 09-FRONTEND-MOBILE/src/components/booking/BookingCard.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

import { Booking } from '@/types/booking';
import { colors, spacing, typography } from '@/constants/theme';

interface BookingCardProps {
  booking: Booking;
  onPress: (bookingId: number) => void;
  testID?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  testID = 'booking-card',
}) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return colors.primary;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: string): keyof typeof Ionicons.glyphMap => {
    switch (status) {
      case 'active':
        return 'car-outline';
      case 'completed':
        return 'checkmark-circle-outline';
      case 'cancelled':
        return 'close-circle-outline';
      default:
        return 'time-outline';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(booking.id)}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`Booking to ${booking.dropoff_location}, status: ${booking.status}`}
      accessibilityRole="button"
      accessibilityHint="Tap to view booking details"
      testID={testID}
    >
      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
        <Ionicons
          name={getStatusIcon(booking.status)}
          size={16}
          color={colors.white}
        />
        <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
      </View>

      {/* Booking Info */}
      <View style={styles.content}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {booking.dropoff_location}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Ionicons name="calendar-outline" size={16} color={colors.gray} />
          <Text style={styles.detailText}>
            {format(new Date(booking.created_at), 'MMM dd, yyyy • h:mm a')}
          </Text>
        </View>

        {booking.driver_name && (
          <View style={styles.detailsRow}>
            <Ionicons name="person-outline" size={16} color={colors.gray} />
            <Text style={styles.detailText}>{booking.driver_name}</Text>
          </View>
        )}

        {/* Price */}
        <Text style={styles.price}>FJD ${booking.price.toFixed(2)}</Text>
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={24} color={colors.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    ...typography.bodyLarge,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  price: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
});
```

**Key Pattern Elements:**
- ✅ TypeScript interfaces for props
- ✅ Proper React.FC typing
- ✅ Accessibility labels and roles
- ✅ Test IDs for testing
- ✅ StyleSheet for performance
- ✅ Theme constants (no hardcoded values)
- ✅ Touch feedback (activeOpacity)
- ✅ Responsive layout (flex)
- ✅ Icon integration
- ✅ Proper null checks

---

### **3. Next.js Page Component (Admin Dashboard)**

```typescript
// File: 10-ADMIN-DASHBOARD/src/app/bookings/page.tsx

import { Metadata } from 'next';
import { Suspense } from 'react';

import { BookingsList } from '@/components/bookings/BookingsList';
import { BookingsFilters } from '@/components/bookings/BookingsFilters';
import { BookingsStats } from '@/components/bookings/BookingsStats';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Bookings Management | Cab Connect Admin',
  description: 'Manage and monitor all ride bookings across the platform',
};

interface BookingsPageProps {
  searchParams: {
    status?: string;
    page?: string;
    search?: string;
  };
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const status = searchParams.status || 'all';
  const search = searchParams.search || '';

  return (
    <div className="container mx-auto px-6 py-8">
      <PageHeader
        title="Bookings Management"
        description="Monitor and manage all ride bookings"
        action={{
          label: 'Export Data',
          onClick: () => {
            // Export logic
          },
        }}
      />

      {/* Stats Overview */}
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <BookingsStats />
      </Suspense>

      {/* Filters */}
      <Card className="mt-6">
        <BookingsFilters
          defaultStatus={status}
          defaultSearch={search}
        />
      </Card>

      {/* Bookings List */}
      <Suspense fallback={<BookingsListSkeleton />}>
        <BookingsList
          page={currentPage}
          status={status}
          search={search}
        />
      </Suspense>
    </div>
  );
}

function BookingsListSkeleton() {
  return (
    <Card className="mt-6">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </Card>
  );
}
```

**Key Pattern Elements:**
- ✅ Server component by default
- ✅ Metadata export for SEO
- ✅ Type-safe searchParams
- ✅ Suspense boundaries with fallbacks
- ✅ Proper component composition
- ✅ Tailwind className utility
- ✅ Responsive container classes
- ✅ Loading states (Skeleton)

---

### **4. API Client Hook (React Native)**

```typescript
// File: 09-FRONTEND-MOBILE/src/hooks/useBookings.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { api } from '@/services/api';
import { Booking, BookingCreate } from '@/types/booking';
import { ApiError } from '@/types/error';

export function useBookings(userId?: number) {
  const queryClient = useQueryClient();

  // Fetch all bookings
  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = useQuery<Booking[], ApiError>({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      const response = await api.get<Booking[]>(
        userId ? `/api/v1/bookings/user/${userId}` : '/api/v1/bookings'
      );
      return response.data;
    },
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
  });

  // Create booking mutation
  const createBooking = useMutation<Booking, ApiError, BookingCreate>({
    mutationFn: async (bookingData) => {
      const response = await api.post<Booking>('/api/v1/bookings', bookingData);
      return response.data;
    },
    onSuccess: (newBooking) => {
      // Update cache
      queryClient.setQueryData<Booking[]>(['bookings', userId], (old) => {
        return old ? [newBooking, ...old] : [newBooking];
      });

      // Show success message
      Alert.alert(
        'Booking Created',
        'Your ride has been booked successfully!',
        [{ text: 'OK' }]
      );
    },
    onError: (error) => {
      Alert.alert(
        'Booking Failed',
        error.message || 'Failed to create booking. Please try again.',
        [{ text: 'OK' }]
      );
    },
  });

  // Cancel booking mutation
  const cancelBooking = useMutation<void, ApiError, number>({
    mutationFn: async (bookingId) => {
      await api.delete(`/api/v1/bookings/${bookingId}`);
    },
    onSuccess: (_, bookingId) => {
      // Update cache
      queryClient.setQueryData<Booking[]>(['bookings', userId], (old) => {
        return old?.filter((booking) => booking.id !== bookingId) || [];
      });

      Alert.alert('Booking Cancelled', 'Your booking has been cancelled.', [
        { text: 'OK' },
      ]);
    },
    onError: (error) => {
      Alert.alert(
        'Cancellation Failed',
        error.message || 'Failed to cancel booking. Please try again.',
        [{ text: 'OK' }]
      );
    },
  });

  return {
    bookings: bookings || [],
    isLoading,
    error,
    refetch,
    createBooking: createBooking.mutate,
    isCreating: createBooking.isPending,
    cancelBooking: cancelBooking.mutate,
    isCancelling: cancelBooking.isPending,
  };
}
```

**Key Pattern Elements:**
- ✅ React Query for caching
- ✅ Type-safe with generics
- ✅ Optimistic updates
- ✅ Error handling with user feedback
- ✅ Cache invalidation
- ✅ Loading states
- ✅ Query key management
- ✅ Stale time configuration

---

## 📁 FILE NAMING CONVENTIONS

### **Backend (Python/FastAPI)**

```yaml
Structure:
  08-BACKEND/
    app/
      api/
        v1/
          endpoints/
            users.py          # Endpoint handlers
            bookings.py
            drivers.py
      models/
        user.py              # SQLAlchemy models
        booking.py
      schemas/
        user.py              # Pydantic schemas
        booking.py
      services/
        user_service.py      # Business logic
        booking_service.py
      core/
        config.py            # Configuration
        security.py          # Auth utilities
      tests/
        test_users.py        # Pytest tests
        test_bookings.py

Naming Rules:
  - Files: lowercase_with_underscores.py
  - Classes: PascalCase (UserService)
  - Functions: snake_case (get_user_by_id)
  - Constants: UPPER_SNAKE_CASE (MAX_UPLOAD_SIZE)
  - Private: _leading_underscore (_internal_helper)
```

### **Frontend Mobile (React Native/TypeScript)**

```yaml
Structure:
  09-FRONTEND-MOBILE/
    src/
      components/
        booking/
          BookingCard.tsx        # Component
          BookingCard.test.tsx   # Tests
          index.ts               # Barrel export
      screens/
        BookingsScreen.tsx       # Screen component
      hooks/
        useBookings.ts           # Custom hook
      services/
        api.ts                   # API client
      types/
        booking.ts               # TypeScript types
      constants/
        theme.ts                 # Theme constants
      utils/
        formatting.ts            # Utility functions

Naming Rules:
  - Components: PascalCase.tsx
  - Hooks: camelCase starting with 'use'
  - Types/Interfaces: PascalCase
  - Constants: UPPER_SNAKE_CASE or camelCase
  - Functions: camelCase
  - Files: PascalCase for components, camelCase for utilities
```

### **Admin Dashboard (Next.js/TypeScript)**

```yaml
Structure:
  10-ADMIN-DASHBOARD/
    src/
      app/
        bookings/
          page.tsx            # Route page
          loading.tsx         # Loading UI
          error.tsx           # Error UI
        layout.tsx            # Root layout
      components/
        bookings/
          BookingsList.tsx    # Feature component
        ui/
          Button.tsx          # UI component
      lib/
        api.ts                # API utilities
      types/
        booking.ts            # TypeScript types

Naming Rules:
  - Pages: page.tsx, layout.tsx, error.tsx, loading.tsx
  - Components: PascalCase.tsx
  - Utilities: camelCase.ts
  - Types: PascalCase or camelCase
  - Folders: lowercase-with-hyphens
```

---

## 🧪 TESTING STRATEGY

### **Backend Testing (Pytest)**

```python
# File: 08-BACKEND/tests/test_bookings.py

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.models.booking import Booking
from app.models.user import User
from app.core.security import create_access_token

client = TestClient(app)

@pytest.fixture
def auth_headers(db_session: Session) -> dict:
    """Create authenticated user and return auth headers."""
    user = User(
        email="test@example.com",
        hashed_password="hashed_password",
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    
    token = create_access_token(user.id)
    return {"Authorization": f"Bearer {token}"}

def test_create_booking_success(auth_headers: dict):
    """Test successful booking creation."""
    booking_data = {
        "pickup_location": "Nadi Airport",
        "dropoff_location": "Denarau Beach",
        "pickup_time": "2026-01-15T10:00:00Z"
    }
    
    response = client.post(
        "/api/v1/bookings/",
        json=booking_data,
        headers=auth_headers
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["pickup_location"] == booking_data["pickup_location"]
    assert data["status"] == "pending"
    assert "id" in data

def test_create_booking_missing_location(auth_headers: dict):
    """Test booking creation fails with missing location."""
    booking_data = {
        "pickup_location": "Nadi Airport",
        # Missing dropoff_location
    }
    
    response = client.post(
        "/api/v1/bookings/",
        json=booking_data,
        headers=auth_headers
    )
    
    assert response.status_code == 422  # Validation error

def test_create_booking_unauthorized():
    """Test booking creation fails without authentication."""
    booking_data = {
        "pickup_location": "Nadi Airport",
        "dropoff_location": "Denarau Beach",
    }
    
    response = client.post("/api/v1/bookings/", json=booking_data)
    
    assert response.status_code == 401

def test_get_booking_not_found(auth_headers: dict):
    """Test getting non-existent booking returns 404."""
    response = client.get("/api/v1/bookings/99999", headers=auth_headers)
    
    assert response.status_code == 404
```

### **Mobile Testing (Jest + React Native Testing Library)**

```typescript
// File: 09-FRONTEND-MOBILE/src/components/booking/BookingCard.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { BookingCard } from './BookingCard';
import { Booking } from '@/types/booking';

const mockBooking: Booking = {
  id: 1,
  pickup_location: 'Nadi Airport',
  dropoff_location: 'Denarau Beach',
  status: 'active',
  price: 25.50,
  created_at: '2026-01-12T10:00:00Z',
  driver_name: 'John Doe',
};

describe('BookingCard', () => {
  it('renders booking information correctly', () => {
    const { getByText } = render(
      <BookingCard booking={mockBooking} onPress={jest.fn()} />
    );

    expect(getByText('Denarau Beach')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('FJD $25.50')).toBeTruthy();
    expect(getByText('ACTIVE')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <BookingCard booking={mockBooking} onPress={onPressMock} />
    );

    fireEvent.press(getByTestId('booking-card'));

    expect(onPressMock).toHaveBeenCalledWith(1);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('displays correct status color for active booking', () => {
    const { getByText } = render(
      <BookingCard booking={mockBooking} onPress={jest.fn()} />
    );

    const statusBadge = getByText('ACTIVE').parent;
    expect(statusBadge?.props.style).toMatchObject(
      expect.objectContaining({ backgroundColor: expect.any(String) })
    );
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(
      <BookingCard booking={mockBooking} onPress={jest.fn()} />
    );

    expect(
      getByLabelText('Booking to Denarau Beach, status: active')
    ).toBeTruthy();
  });
});
```

### **Testing Checklist**

```
Backend Tests:
□ Happy path (success cases)
□ Edge cases (empty, null, invalid)
□ Error cases (404, 400, 500)
□ Authentication (unauthorized, forbidden)
□ Authorization (user can only access own data)
□ Validation (schema validation)
□ Database constraints (unique, foreign keys)

Frontend Tests:
□ Component renders correctly
□ User interactions work (press, input)
□ Conditional rendering (loading, error states)
□ Accessibility (labels, roles)
□ Props are passed correctly
□ Callbacks are called
□ Navigation works

Integration Tests:
□ API endpoint responds correctly
□ Database transactions work
□ Real-time updates work (WebSockets)
□ File uploads work
□ Payment processing works
```

---

## 🚀 DEPLOYMENT WORKFLOW

### **Development → Staging → Production**

```yaml
# Step 1: Development (Local)
Environment: Local Docker containers
Branch: feature/task-name
Testing: Unit tests + manual testing
Database: Local PostgreSQL
URL: http://localhost:3000 (frontend), http://localhost:8000 (backend)

Commands:
  docker-compose up -d
  npm run dev                    # Frontend
  python manage.py runserver     # Backend

# Step 2: Staging (Pre-Production)
Environment: Render/AWS staging
Branch: develop
Testing: Integration tests + E2E tests
Database: Managed PostgreSQL (staging)
URL: https://staging.fijicabconnect.com

Commands:
  git checkout develop
  git merge feature/task-name
  git push origin develop
  # CI/CD auto-deploys to staging

# Step 3: Production
Environment: Render/AWS production
Branch: main
Testing: Smoke tests + monitoring
Database: Managed PostgreSQL (production)
URL: https://fijicabconnect.com

Commands:
  git checkout main
  git merge develop
  git tag v1.0.0
  git push origin main --tags
  # CI/CD auto-deploys to production
```

### **Pre-Deployment Checklist**

```
Code Quality:
□ All tests passing (npm test, pytest)
□ Zero TypeScript errors (tsc --noEmit)
□ Zero ESLint errors (npm run lint)
□ Zero security vulnerabilities (npm audit)
□ Code reviewed by team member
□ Git commit messages follow convention

Configuration:
□ Environment variables set (.env)
□ Database migrations created and tested
□ API endpoints documented (OpenAPI)
□ CORS configured correctly
□ Rate limiting configured
□ Error tracking enabled (Sentry)

Performance:
□ Lighthouse score > 90
□ Core Web Vitals passing
□ Database queries optimized
□ Images optimized (<200KB)
□ Bundle size checked

Security:
□ Authentication working
□ Authorization enforced
□ Input validation enabled
□ CSRF protection enabled
□ Rate limiting tested
□ SSL certificate valid

Documentation:
□ README updated
□ API docs updated
□ Changelog updated
□ PROGRESS-TRACKER updated
```

---

## ⚠️ ERROR HANDLING PATTERNS

### **Backend Error Handling**

```python
# File: 08-BACKEND/app/core/errors.py

from fastapi import HTTPException, status
from typing import Any, Dict, Optional

class AppException(Exception):
    """Base exception for application errors."""
    
    def __init__(
        self,
        message: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        details: Optional[Dict[str, Any]] = None
    ):
        self.message = message
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)

class ValidationException(AppException):
    """Raised when input validation fails."""
    
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_400_BAD_REQUEST,
            details=details
        )

class NotFoundException(AppException):
    """Raised when resource is not found."""
    
    def __init__(self, resource: str, identifier: Any):
        super().__init__(
            message=f"{resource} with id {identifier} not found",
            status_code=status.HTTP_404_NOT_FOUND,
            details={"resource": resource, "id": identifier}
        )

class UnauthorizedException(AppException):
    """Raised when user is not authenticated."""
    
    def __init__(self, message: str = "Authentication required"):
        super().__init__(
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED
        )

# Usage in endpoint:
from app.core.errors import NotFoundException, ValidationException

@router.get("/{booking_id}")
async def get_booking(booking_id: int, db: Session):
    booking = await booking_service.get_booking(db, booking_id)
    if not booking:
        raise NotFoundException("Booking", booking_id)
    return booking
```

### **Frontend Error Handling**

```typescript
// File: 09-FRONTEND-MOBILE/src/utils/errorHandler.ts

import { Alert } from 'react-native';
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || 500;
    const message =
      error.response?.data?.message || 
      error.response?.data?.detail ||
      'An unexpected error occurred';
    const details = error.response?.data?.details;

    return { message, statusCode, details };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
}

export function showErrorAlert(error: unknown, title: string = 'Error'): void {
  const apiError = handleApiError(error);
  
  let message = apiError.message;
  
  // User-friendly messages for common errors
  if (apiError.statusCode === 401) {
    message = 'Please log in to continue';
  } else if (apiError.statusCode === 403) {
    message = 'You do not have permission to perform this action';
  } else if (apiError.statusCode === 404) {
    message = 'The requested resource was not found';
  } else if (apiError.statusCode === 500) {
    message = 'Something went wrong on our end. Please try again later.';
  }

  Alert.alert(title, message, [{ text: 'OK' }]);
}

// Usage:
import { showErrorAlert } from '@/utils/errorHandler';

try {
  await createBooking(bookingData);
} catch (error) {
  showErrorAlert(error, 'Booking Failed');
}
```

---

## 🚨 COMMON PITFALLS

### **1. Import Path Issues**

```typescript
// ❌ BAD: Relative imports
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

// ✅ GOOD: Absolute imports
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
```

### **2. Missing Type Safety**

```typescript
// ❌ BAD: Using 'any' types
const handleSubmit = (data: any) => {
  // No type safety
};

// ✅ GOOD: Explicit types
interface FormData {
  pickup: string;
  dropoff: string;
}

const handleSubmit = (data: FormData) => {
  // Type-safe
};
```

### **3. Unhandled Promises**

```typescript
// ❌ BAD: No error handling
const loadData = () => {
  api.get('/bookings'); // Promise not handled
};

// ✅ GOOD: Proper async/await with error handling
const loadData = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
```

### **4. Missing Authentication**

```python
# ❌ BAD: No authentication
@router.delete("/{booking_id}")
async def delete_booking(booking_id: int):
    # Anyone can delete any booking!
    pass

# ✅ GOOD: Authentication required
@router.delete("/{booking_id}")
async def delete_booking(
    booking_id: int,
    current_user: User = Depends(get_current_user)
):
    # Only authenticated users can delete
    pass
```

### **5. Hardcoded Values**

```typescript
// ❌ BAD: Hardcoded values
<View style={{ backgroundColor: '#10b981', padding: 16 }}>

// ✅ GOOD: Use constants
import { colors, spacing } from '@/constants/theme';

<View style={{ backgroundColor: colors.primary, padding: spacing.md }}>
```

### **6. Missing Input Validation**

```python
# ❌ BAD: No validation
@router.post("/")
async def create_user(email: str, password: str):
    # No validation!
    user = User(email=email, password=password)
    db.add(user)

# ✅ GOOD: Validation with Pydantic
from pydantic import EmailStr, validator

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v

@router.post("/")
async def create_user(user_in: UserCreate):
    # Validated automatically
    pass
```

### **7. Not Updating Progress Tracker**

```bash
# ❌ BAD: Work on multiple tasks, forget to document
# ... implement feature A, B, C ...
# ... commit code ...
# PROGRESS-TRACKER.md never updated!

# ✅ GOOD: Update after each micro-task
# 1. Complete micro-task
# 2. Test thoroughly
# 3. Update PROGRESS-TRACKER.md with completion status
# 4. Commit with clear message
# 5. Move to next micro-task
```

---

## 📊 SESSION METRICS

Track these metrics for each session:

```yaml
Time Management:
  - Documentation reading: ~10 minutes
  - Coding: ~40 minutes
  - Testing: ~20 minutes
  - Documentation update: ~5 minutes
  - Total session: ~75 minutes

Quality Metrics:
  - Lines of code: Tracked but not goal
  - Tests added: Minimum 1 per feature
  - Lint errors: 0 (mandatory)
  - TypeScript errors: 0 (mandatory)
  - Security warnings: 0 (mandatory)

Progress Metrics:
  - Micro-tasks completed: 1 per session
  - Subtasks completed: 2-3 per session
  - Files modified: 2-5 per session
  - Documentation updated: Always
```

---

## ✅ FINAL CHECKLIST TEMPLATE

```markdown
## Session Completion Checklist

### Code Quality
- [ ] Zero TypeScript errors (tsc --noEmit)
- [ ] Zero ESLint errors (npm run lint)
- [ ] Zero security warnings
- [ ] All tests passing
- [ ] Code reviewed (self-review)

### Functionality
- [ ] Feature works as expected
- [ ] Tested on mobile (375px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1024px+)
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Accessibility tested (keyboard, screen reader)

### Documentation
- [ ] PROGRESS-TRACKER.md updated
- [ ] Code comments added where needed
- [ ] API docs updated (if API changed)
- [ ] README updated (if setup changed)

### Security
- [ ] Input validation implemented
- [ ] Authentication enforced
- [ ] Authorization checked
- [ ] CSRF protection enabled (if form)
- [ ] No secrets in code

### Git
- [ ] Clear commit message
- [ ] Branch up to date with main
- [ ] No merge conflicts
- [ ] Pushed to remote

### Next Session
- [ ] Next priority identified
- [ ] Blockers documented
- [ ] Context preserved for next session
```

---

**END OF IMPLEMENTATION STRATEGY**

*Use this document as your session-by-session guide. Follow these patterns religiously to maintain code quality, consistency, and project momentum.*
