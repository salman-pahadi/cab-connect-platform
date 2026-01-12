# 🏗️ TECHNICAL ARCHITECTURE & CODE STANDARDS

**Cab Connect Platform - Complete Technical Reference**

*Version: 2.0 | Updated: January 12, 2026 | Production-Ready Architecture*

---

## 📋 TABLE OF CONTENTS

1. [Project Structure](#project-structure)
2. [Technology Stack](#technology-stack)
3. [Component Templates](#component-templates)
4. [API Endpoint Patterns](#api-endpoint-patterns)
5. [Database Patterns](#database-patterns)
6. [State Management](#state-management)
7. [Styling Conventions](#styling-conventions)
8. [Environment Configuration](#environment-configuration)
9. [Import Patterns](#import-patterns)
10. [Naming Conventions](#naming-conventions)

---

## 🗂️ PROJECT STRUCTURE

### **Complete Repository Layout**

```
cabconnect-platform/
├── 📄 START-HERE.md                          # Primary entry point
├── 📄 prefix.md                              # Master development framework
├── 📄 FOLDER-STRUCTURE.md                    # Structure definition
├── 📄 PROGRESS-TRACKER.md                    # Milestone tracking
├── 📄 .cursorrules                           # AI configuration
├── 📄 .gitignore                             # Version control
├── 📄 .gitrules                              # Git workflow rules
│
├── 📁 01-DOCUMENTATION/                      # CANONICAL SPECIFICATIONS
│   ├── PHASE-1-MASTER-DEVELOPMENT-PLAN.md    # Complete architecture
│   ├── REQUIREMENTS-MATRIX.md                # Feature specifications
│   └── REFERENCE/                            # 18 canonical documents
│       ├── 00_README.md
│       ├── 03_PHASE1_DECISIONS.md            # ⚠️ LOCKED DECISIONS
│       ├── 06_DATABASE_SCHEMA.md
│       ├── 07_API_CONTRACTS.md
│       └── ...
│
├── 📁 02-PROJECT-PLANNING/                   # PROJECT MANAGEMENT
│   ├── PROJECT-STATUS-DASHBOARD.md
│   └── ARCHIVE/                              # Historical planning
│
├── 📁 03-DEVELOPMENT-GUIDES/                 # DEVELOPMENT ROADMAPS
│   ├── WEEK-BY-WEEK-DEVELOPMENT-GUIDE.md
│   ├── implementation-strategy.md            # Code patterns
│   └── templates/                            # Reusable templates
│
├── 📁 04-CODING-STANDARDS/                   # CODE QUALITY
│   ├── .cursorrules                          # Phase 1 coding rules
│   ├── technical-architecture.md             # THIS FILE
│   └── templates/
│
├── 📁 05-CLIENT-REQUIREMENTS/                # CLIENT SPECS
│   ├── Client-Filled-Requirements.md
│   └── branding/
│
├── 📁 06-AI-ASSISTANT-SETUP/                 # AI CONFIGURATION
│   ├── SUPER-SENIOR-EXPERT-TEAM-PROMPT.md
│   └── HOW-TO-USE-CURSORRULES.md
│
├── 📁 07-ARCHIVED/                           # HISTORICAL
│   └── ...
│
├── 📁 08-BACKEND/ ⚙️                         # FASTAPI BACKEND
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                           # FastAPI app entry
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── deps.py                       # Dependencies
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── api.py                    # Router aggregation
│   │   │       └── endpoints/
│   │   │           ├── __init__.py
│   │   │           ├── auth.py
│   │   │           ├── users.py
│   │   │           ├── rides.py
│   │   │           ├── drivers.py
│   │   │           ├── payments.py
│   │   │           └── ratings.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py                     # Settings
│   │   │   ├── security.py                   # Auth utilities
│   │   │   └── errors.py                     # Error handlers
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                       # Base model
│   │   │   ├── session.py                    # DB session
│   │   │   └── init_db.py                    # DB initialization
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py                       # SQLAlchemy models
│   │   │   ├── ride.py
│   │   │   ├── driver.py
│   │   │   ├── payment.py
│   │   │   └── rating.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py                       # Pydantic schemas
│   │   │   ├── ride.py
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── user_service.py               # Business logic
│   │   │   ├── ride_service.py
│   │   │   ├── payment_service.py
│   │   │   └── ...
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── alembic/                              # Database migrations
│   │   ├── versions/
│   │   └── env.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py                       # Test fixtures
│   │   ├── test_auth.py
│   │   ├── test_users.py
│   │   └── ...
│   ├── .env                                  # Environment variables
│   ├── .env.example                          # Template
│   ├── alembic.ini                           # Alembic config
│   ├── docker-compose.yml                    # Docker services
│   ├── Dockerfile                            # Backend image
│   ├── pytest.ini                            # Pytest config
│   ├── pyproject.toml                        # Project metadata
│   ├── requirements.txt                      # Python dependencies
│   ├── requirements-dev.txt                  # Dev dependencies
│   └── README.md
│
├── 📁 09-FRONTEND-MOBILE/ 📱                 # REACT NATIVE APP
│   ├── android/                              # Android project
│   ├── ios/                                  # iOS project
│   ├── assets/                               # Images, fonts
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Input.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingCard.tsx
│   │   │   │   └── BookingList.tsx
│   │   │   ├── map/
│   │   │   │   └── LiveMap.tsx
│   │   │   └── payment/
│   │   │       └── CardInput.tsx
│   │   ├── constants/
│   │   │   ├── theme.ts                      # Colors, spacing, typography
│   │   │   └── config.ts                     # App config
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useBookings.ts
│   │   │   └── useWebSocket.ts
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── AuthNavigator.tsx
│   │   │   └── MainNavigator.tsx
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   └── RegisterScreen.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingScreen.tsx
│   │   │   │   └── ActiveRideScreen.tsx
│   │   │   ├── profile/
│   │   │   │   └── ProfileScreen.tsx
│   │   │   └── HomeScreen.tsx
│   │   ├── services/
│   │   │   ├── api.ts                        # API client
│   │   │   ├── auth.ts                       # Auth service
│   │   │   ├── storage.ts                    # AsyncStorage
│   │   │   └── notifications.ts              # FCM
│   │   ├── store/
│   │   │   ├── index.ts                      # Redux store
│   │   │   └── slices/
│   │   │       ├── authSlice.ts
│   │   │       ├── bookingSlice.ts
│   │   │       └── realtimeSlice.ts
│   │   ├── types/
│   │   │   ├── auth.ts
│   │   │   ├── booking.ts
│   │   │   ├── user.ts
│   │   │   └── navigation.ts
│   │   └── utils/
│   │       ├── formatting.ts
│   │       └── validation.ts
│   ├── App.tsx                               # Entry point
│   ├── app.json                              # Expo config
│   ├── babel.config.js
│   ├── jest.config.js
│   ├── metro.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── 📁 10-ADMIN-DASHBOARD/ 💼                 # NEXT.JS ADMIN
│   ├── public/
│   │   ├── images/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx                    # Root layout
│   │   │   ├── page.tsx                      # Dashboard home
│   │   │   ├── globals.css
│   │   │   ├── (auth)/
│   │   │   │   └── login/
│   │   │   │       └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── drivers/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── bookings/
│   │   │   │   ├── BookingsList.tsx
│   │   │   │   └── BookingFilters.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Table.tsx
│   │   │   └── charts/
│   │   │       └── RevenueChart.tsx
│   │   ├── lib/
│   │   │   ├── api.ts                        # API client
│   │   │   └── utils.ts
│   │   └── types/
│   │       ├── booking.ts
│   │       └── user.ts
│   ├── .env.local
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── README.md
│
└── 📁 fiji-cab-connect-marketing-website/ 🌐  # MARKETING SITE
    ├── app/
    ├── components/
    ├── public/
    ├── next.config.js
    ├── package.json
    └── README.md
```

---

## 💻 TECHNOLOGY STACK

### **Backend (08-BACKEND/)**

```yaml
Language: Python 3.13+
Framework: FastAPI 0.109+
Database: PostgreSQL 17
ORM: SQLAlchemy 2.0+
Migrations: Alembic 1.13+
Validation: Pydantic 2.5+
Authentication: python-jose, passlib, bcrypt
Testing: pytest, pytest-asyncio
Linting: ruff, black, isort
Type Checking: mypy
Containerization: Docker, docker-compose
Cache: Redis 7+
Background Jobs: Celery (future)

Port: 8000 (local), 8002 (Docker)
API Prefix: /api/v1
Documentation: /docs (Swagger UI), /redoc
```

### **Mobile App (09-FRONTEND-MOBILE/)**

```yaml
Language: TypeScript 5.3+
Framework: React Native 0.73+
Platform: Expo SDK 50+
Navigation: React Navigation 6+
State: Redux Toolkit 2.0+ with RTK Query
Forms: React Hook Form 7+ with Zod validation
Maps: react-native-maps
Icons: React Native Vector Icons
Testing: Jest 29+, React Native Testing Library
Linting: ESLint with TypeScript
Formatting: Prettier
Type Checking: TypeScript strict mode

Platforms: iOS 14+, Android 10+
```

### **Admin Dashboard (10-ADMIN-DASHBOARD/)**

```yaml
Language: TypeScript 5.3+
Framework: Next.js 14+ (App Router)
UI Library: React 18+
Styling: Tailwind CSS 3.4+
Components: shadcn/ui (headless UI)
Forms: React Hook Form 7+ with Zod
Charts: Recharts 2.8+
Icons: Heroicons
Testing: Jest 29+, Vitest
Linting: ESLint with TypeScript
Formatting: Prettier
Type Checking: TypeScript strict mode

Port: 3000
Build: Static export (SSG) or Server (SSR)
```

---

## 📦 COMPONENT TEMPLATES

### **1. Backend API Endpoint Template**

```python
# File: 08-BACKEND/app/api/v1/endpoints/resource_name.py

"""
Resource Name API endpoints.

Handles CRUD operations for ResourceName entity.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.user import User
from app.schemas.resource import (
    Resource,
    ResourceCreate,
    ResourceUpdate,
)
from app.services.resource_service import ResourceService

router = APIRouter()


@router.post("/", response_model=Resource, status_code=status.HTTP_201_CREATED)
async def create_resource(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    resource_in: ResourceCreate,
) -> Resource:
    """
    Create new resource.
    
    **Requires Authentication**
    
    **Parameters:**
    - resource_in: Resource creation data
    
    **Returns:**
    - Created resource
    
    **Raises:**
    - 400: Invalid input data
    - 401: Not authenticated
    - 409: Resource already exists
    """
    service = ResourceService(db)
    
    try:
        resource = await service.create(
            user_id=current_user.id,
            data=resource_in
        )
        return resource
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Resource creation failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create resource"
        )


@router.get("/", response_model=List[Resource])
async def get_resources(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> List[Resource]:
    """
    Get all resources for current user.
    
    **Parameters:**
    - skip: Number of records to skip (pagination)
    - limit: Maximum number of records to return
    
    **Returns:**
    - List of resources
    """
    service = ResourceService(db)
    resources = await service.get_many(
        user_id=current_user.id,
        skip=skip,
        limit=limit
    )
    return resources


@router.get("/{resource_id}", response_model=Resource)
async def get_resource(
    resource_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Resource:
    """
    Get resource by ID.
    
    **Raises:**
    - 404: Resource not found
    - 403: Not authorized to access resource
    """
    service = ResourceService(db)
    resource = await service.get(resource_id)
    
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Resource with id {resource_id} not found"
        )
    
    # Authorization check
    if resource.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this resource"
        )
    
    return resource


@router.put("/{resource_id}", response_model=Resource)
async def update_resource(
    resource_id: int,
    resource_in: ResourceUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Resource:
    """Update resource by ID."""
    service = ResourceService(db)
    resource = await service.get(resource_id)
    
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Resource with id {resource_id} not found"
        )
    
    # Authorization check
    if resource.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this resource"
        )
    
    updated_resource = await service.update(resource_id, resource_in)
    return updated_resource


@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource(
    resource_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> None:
    """Delete resource by ID."""
    service = ResourceService(db)
    resource = await service.get(resource_id)
    
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Resource with id {resource_id} not found"
        )
    
    # Authorization check
    if resource.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this resource"
        )
    
    await service.delete(resource_id)
```

**Key Elements:**
- ✅ Complete CRUD operations
- ✅ Type hints on all parameters
- ✅ Docstrings with requirements
- ✅ Authentication dependency
- ✅ Authorization checks
- ✅ Proper HTTP status codes
- ✅ Error handling
- ✅ Service layer pattern

---

### **2. React Native Screen Template**

```typescript
// File: 09-FRONTEND-MOBILE/src/screens/feature/FeatureScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, typography } from '@/constants/theme';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useFeature } from '@/hooks/useFeature';
import { showErrorAlert } from '@/utils/errorHandler';
import type { MainStackNavigationProp } from '@/types/navigation';

export const FeatureScreen: React.FC = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { items, isLoading, error, refetch } = useFeature();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (error) {
      showErrorAlert(error, 'Failed to Load');
    }
  }, [error]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleItemPress = (itemId: number) => {
    navigation.navigate('ItemDetail', { itemId });
  };

  const handleCreate = () => {
    navigation.navigate('CreateItem');
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Feature Title</Text>
        <TouchableOpacity
          onPress={handleCreate}
          style={styles.addButton}
          accessible={true}
          accessibilityLabel="Create new item"
          accessibilityRole="button"
        >
          <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color={colors.gray} />
            <Text style={styles.emptyText}>No items yet</Text>
            <Button
              title="Create First Item"
              onPress={handleCreate}
              variant="primary"
            />
          </View>
        ) : (
          items.map((item) => (
            <Card
              key={item.id}
              onPress={() => handleItemPress(item.id)}
              style={styles.card}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body,
    marginTop: spacing.md,
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  addButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  itemTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  itemDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  emptyText: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  },
});
```

**Key Elements:**
- ✅ TypeScript with proper typing
- ✅ Safe area handling
- ✅ Navigation integration
- ✅ Loading and error states
- ✅ Pull-to-refresh
- ✅ Empty state handling
- ✅ Accessibility labels
- ✅ Theme constants
- ✅ StyleSheet optimization
- ✅ Responsive design

---

### **3. Next.js Server Component Template**

```typescript
// File: 10-ADMIN-DASHBOARD/src/app/feature/page.tsx

import { Metadata } from 'next';
import { Suspense } from 'react';

import { FeatureList } from '@/components/feature/FeatureList';
import { FeatureFilters } from '@/components/feature/FeatureFilters';
import { FeatureStats } from '@/components/feature/FeatureStats';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'Feature Management | Cab Connect Admin',
  description: 'Manage and monitor platform features',
};

interface FeaturePageProps {
  searchParams: {
    status?: string;
    page?: string;
    search?: string;
    sort?: string;
  };
}

export default async function FeaturePage({ searchParams }: FeaturePageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const status = searchParams.status || 'all';
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'created_at';

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <PageHeader
        title="Feature Management"
        description="Manage and monitor all features"
        action={{
          label: 'Create Feature',
          href: '/feature/create',
        }}
      />

      {/* Stats Overview */}
      <Suspense fallback={<StatsSkeletons />}>
        <FeatureStats />
      </Suspense>

      {/* Filters */}
      <Card className="mt-6 p-6">
        <FeatureFilters
          defaultStatus={status}
          defaultSearch={search}
          defaultSort={sort}
        />
      </Card>

      {/* Feature List */}
      <Suspense fallback={<ListSkeleton />}>
        <FeatureList
          page={currentPage}
          status={status}
          search={search}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}

function StatsSkeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-lg" />
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <Card className="mt-6 p-6">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </Card>
  );
}
```

**Key Elements:**
- ✅ Server component by default
- ✅ Metadata export for SEO
- ✅ Type-safe searchParams
- ✅ Suspense boundaries
- ✅ Loading skeletons
- ✅ Proper component composition
- ✅ Tailwind responsive classes
- ✅ Clean folder structure

---

## 🔌 API ENDPOINT PATTERNS

### **Backend Endpoint Structure**

```yaml
Base URL: http://localhost:8000 (dev), https://api.fijicabconnect.com (prod)
API Prefix: /api/v1

Authentication:
  POST   /api/v1/auth/register        # User registration
  POST   /api/v1/auth/login           # User login
  POST   /api/v1/auth/refresh         # Refresh access token
  POST   /api/v1/auth/logout          # Logout
  GET    /api/v1/auth/me              # Get current user

Users:
  GET    /api/v1/users                # List users (admin)
  GET    /api/v1/users/{id}           # Get user by ID
  PUT    /api/v1/users/{id}           # Update user
  DELETE /api/v1/users/{id}           # Delete user
  POST   /api/v1/users/{id}/verify    # Verify user account

Rides:
  POST   /api/v1/rides                # Create ride booking
  GET    /api/v1/rides                # List rides
  GET    /api/v1/rides/{id}           # Get ride by ID
  PUT    /api/v1/rides/{id}           # Update ride
  DELETE /api/v1/rides/{id}           # Cancel ride
  POST   /api/v1/rides/{id}/accept    # Driver accepts ride
  POST   /api/v1/rides/{id}/start     # Start ride
  POST   /api/v1/rides/{id}/complete  # Complete ride

Drivers:
  POST   /api/v1/drivers              # Register as driver
  GET    /api/v1/drivers              # List drivers (admin)
  GET    /api/v1/drivers/{id}         # Get driver by ID
  PUT    /api/v1/drivers/{id}         # Update driver
  POST   /api/v1/drivers/{id}/verify  # Verify driver (admin)
  GET    /api/v1/drivers/nearby       # Get nearby drivers

Payments:
  POST   /api/v1/payments/intent      # Create payment intent
  POST   /api/v1/payments/confirm     # Confirm payment
  GET    /api/v1/payments             # List payments
  GET    /api/v1/payments/{id}        # Get payment by ID
  POST   /api/v1/payments/{id}/refund # Refund payment

Ratings:
  POST   /api/v1/ratings              # Create rating
  GET    /api/v1/ratings/user/{id}    # Get user ratings
  GET    /api/v1/ratings/driver/{id}  # Get driver ratings

WebSockets:
  WS     /ws/rides/{ride_id}          # Ride real-time updates
  WS     /ws/driver/{driver_id}       # Driver location updates

Webhooks:
  POST   /api/v1/webhooks/stripe      # Stripe webhook
  POST   /api/v1/webhooks/payments    # Payment webhook

Health & Monitoring:
  GET    /health                      # Health check
  GET    /api/v1/health               # API health
  GET    /docs                        # Swagger UI
  GET    /redoc                       # ReDoc UI
```

### **Request/Response Examples**

```json
# POST /api/v1/rides - Create Ride
{
  "pickup_location": "Nadi Airport",
  "pickup_latitude": -17.7554,
  "pickup_longitude": 177.4436,
  "dropoff_location": "Denarau Beach",
  "dropoff_latitude": -17.7869,
  "dropoff_longitude": 177.3492,
  "passenger_count": 2,
  "notes": "Please bring cold water"
}

# Response
{
  "id": 123,
  "status": "pending",
  "pickup_location": "Nadi Airport",
  "dropoff_location": "Denarau Beach",
  "estimated_price": 25.50,
  "estimated_duration": 15,
  "created_at": "2026-01-12T10:30:00Z",
  "user_id": 456,
  "driver_id": null
}
```

---

## 🗄️ DATABASE PATTERNS

### **SQLAlchemy Model Template**

```python
# File: 08-BACKEND/app/models/resource.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Resource(Base):
    """Resource model."""
    
    __tablename__ = "resources"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Fields
    title = Column(String(255), nullable=False, index=True)
    description = Column(String, nullable=True)
    status = Column(String(50), default="active", index=True)
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="resources")
    
    def __repr__(self):
        return f"<Resource(id={self.id}, title={self.title})>"
    
    @property
    def is_pending(self) -> bool:
        """Check if resource is pending."""
        return self.status == "pending"
```

### **Pydantic Schema Template**

```python
# File: 08-BACKEND/app/schemas/resource.py

from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional


class ResourceBase(BaseModel):
    """Base resource schema."""
    
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    status: str = Field(default="active")
    
    @validator('status')
    def validate_status(cls, v):
        allowed_statuses = ['active', 'inactive', 'pending']
        if v not in allowed_statuses:
            raise ValueError(f'Status must be one of: {allowed_statuses}')
        return v


class ResourceCreate(ResourceBase):
    """Schema for creating resource."""
    pass


class ResourceUpdate(BaseModel):
    """Schema for updating resource."""
    
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[str] = None


class Resource(ResourceBase):
    """Schema for resource response."""
    
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True  # Pydantic v2 (was orm_mode in v1)
```

---

## 🔄 STATE MANAGEMENT

### **Redux Toolkit Slice Template**

```typescript
// File: 09-FRONTEND-MOBILE/src/store/slices/featureSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { api } from '@/services/api';
import type { Feature } from '@/types/feature';

interface FeatureState {
  items: Feature[];
  currentItem: Feature | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeatureState = {
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchFeatures = createAsyncThunk(
  'feature/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Feature[]>('/api/v1/features');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch');
    }
  }
);

export const createFeature = createAsyncThunk(
  'feature/create',
  async (data: Partial<Feature>, { rejectWithValue }) => {
    try {
      const response = await api.post<Feature>('/api/v1/features', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create');
    }
  }
);

// Slice
const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    setCurrentFeature: (state, action: PayloadAction<Feature | null>) => {
      state.currentItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Features
      .addCase(fetchFeatures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Feature
      .addCase(createFeature.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFeature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { setCurrentFeature, clearError } = featureSlice.actions;

// Selectors
export const selectFeatures = (state: RootState) => state.feature.items;
export const selectCurrentFeature = (state: RootState) => state.feature.currentItem;
export const selectFeatureLoading = (state: RootState) => state.feature.isLoading;
export const selectFeatureError = (state: RootState) => state.feature.error;

export default featureSlice.reducer;
```

---

## 🎨 STYLING CONVENTIONS

### **Theme Constants (React Native)**

```typescript
// File: 09-FRONTEND-MOBILE/src/constants/theme.ts

export const colors = {
  // Brand Colors
  primary: '#10b981',      // Emerald Green
  primary50: '#ecfdf5',
  primary100: '#d1fae5',
  primary600: '#059669',
  primary700: '#047857',
  
  secondary: '#0891b2',    // Ocean Blue
  secondary50: '#ecfeff',
  secondary600: '#0e7490',
  
  accent: '#f59e0b',       // Amber Gold
  accent50: '#fffbeb',
  accent600: '#d97706',
  
  // Neutrals
  white: '#ffffff',
  black: '#000000',
  gray: '#6b7280',
  grayLight: '#f3f4f6',
  grayDark: '#374151',
  
  // Semantic Colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  // UI Colors
  background: '#f9fafb',
  surface: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  textSecondary: '#6b7280',
  placeholder: '#9ca3af',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;
```

---

## ⚙️ ENVIRONMENT CONFIGURATION

### **Backend Environment Variables**

```bash
# File: 08-BACKEND/.env

# Application
APP_NAME=Cab Connect API
APP_ENV=development
DEBUG=true
API_VERSION=v1

# Server
HOST=0.0.0.0
PORT=8000
WORKERS=4

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cabconnect
DB_ECHO=false

# Redis
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
CORS_ORIGINS=["http://localhost:3000","http://localhost:19006"]

# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Firebase
FIREBASE_PROJECT_ID=cabconnect-fiji
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=cabconnect-uploads
AWS_REGION=ap-southeast-2

# Sentry
SENTRY_DSN=https://...@sentry.io/...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@fijicabconnect.com
SMTP_PASSWORD=...
```

### **Mobile Environment Variables**

```bash
# File: 09-FRONTEND-MOBILE/.env

# API
API_URL=http://localhost:8000
API_TIMEOUT=30000

# WebSocket
WS_URL=ws://localhost:8000

# Google Maps
GOOGLE_MAPS_API_KEY=AIza...

# Firebase
FIREBASE_API_KEY=AIza...
FIREBASE_AUTH_DOMAIN=cabconnect-fiji.firebaseapp.com
FIREBASE_PROJECT_ID=cabconnect-fiji

# Sentry
SENTRY_DSN=https://...@sentry.io/...

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_PUSH_NOTIFICATIONS=true
```

---

## 📦 IMPORT PATTERNS

### **Backend Imports (Python)**

```python
# Standard library imports
import os
import logging
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

# Third-party imports
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, validator

# Local application imports
from app.api import deps
from app.core.config import settings
from app.core.security import create_access_token
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, User as UserSchema
from app.services.user_service import UserService
```

### **Frontend Imports (TypeScript)**

```typescript
// React & React Native imports
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Third-party library imports
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// Absolute imports (components)
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

// Absolute imports (hooks)
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';

// Absolute imports (services/utils)
import { api } from '@/services/api';
import { showErrorAlert } from '@/utils/errorHandler';

// Absolute imports (types)
import type { User } from '@/types/user';
import type { Booking } from '@/types/booking';
import type { RootState } from '@/store';

// Absolute imports (constants)
import { colors, spacing, typography } from '@/constants/theme';
```

---

## 📝 NAMING CONVENTIONS

### **General Rules**

```yaml
Files:
  Backend (Python): lowercase_with_underscores.py
  Frontend (TypeScript): PascalCase.tsx or camelCase.ts
  Tests: test_name.py or Name.test.tsx
  Config: lowercase.config.js

Folders:
  Backend: lowercase_with_underscores/
  Frontend: lowercase-with-hyphens/ or camelCase/

Classes:
  Python: PascalCase (UserService)
  TypeScript: PascalCase (BookingCard)

Functions:
  Python: snake_case (get_user_by_id)
  TypeScript: camelCase (getUserById)

Variables:
  Python: snake_case (user_id, total_price)
  TypeScript: camelCase (userId, totalPrice)

Constants:
  Python: UPPER_SNAKE_CASE (MAX_UPLOAD_SIZE)
  TypeScript: UPPER_SNAKE_CASE or camelCase (MAX_UPLOAD_SIZE, apiUrl)

Types/Interfaces:
  TypeScript: PascalCase (User, BookingCreate, ApiResponse)

Enums:
  Python: PascalCase (RideStatus)
  TypeScript: PascalCase (RideStatus)

Private:
  Python: _leading_underscore (_internal_helper)
  TypeScript: Private by convention or TypeScript private keyword
```

### **Specific Naming Examples**

```typescript
// Components
BookingCard.tsx
ActiveRideScreen.tsx
PaymentForm.tsx

// Hooks
useAuth.ts
useBookings.ts
useWebSocket.ts

// Services
api.ts
auth.ts
storage.ts

// Utils
formatting.ts
validation.ts
errorHandler.ts

// Types
user.ts (exports User, UserCreate, UserUpdate)
booking.ts (exports Booking, BookingCreate)
navigation.ts (exports navigation types)

// Constants
theme.ts (exports colors, spacing, typography)
config.ts (exports API_URL, etc.)

// Store
authSlice.ts
bookingSlice.ts
index.ts (store configuration)
```

---

## ✅ FINAL CHECKLIST

Before considering any component/feature complete:

```
Code Quality:
□ TypeScript strict mode (zero `any` types)
□ Absolute imports (@/) used throughout
□ Proper error handling implemented
□ Loading states handled
□ Empty states designed
□ Accessibility labels added
□ Tests written and passing
□ Zero lint errors
□ Zero TypeScript errors

Documentation:
□ Component/function documented
□ Complex logic commented
□ API endpoints documented (OpenAPI)
□ README updated if needed

Security:
□ Input validation implemented
□ Authentication required (if protected)
□ Authorization checked
□ CSRF protection (if form)
□ No secrets in code

Performance:
□ Images optimized
□ Lazy loading implemented
□ Memoization used (where needed)
□ No unnecessary re-renders

Responsive Design:
□ Tested on mobile (375px)
□ Tested on tablet (768px)
□ Tested on desktop (1024px+)
□ Touch-friendly (44px minimum)

Git:
□ Clear commit message
□ Branch up to date
□ No merge conflicts
□ Progress tracker updated
```

---

**END OF TECHNICAL ARCHITECTURE**

*Use this document as your comprehensive technical reference. Follow these patterns to maintain consistency, quality, and scalability across the entire Cab Connect Platform.*
