# 💻 Coding Standards & Guidelines

This folder contains coding standards, best practices, and AI assistant rules for maintaining consistency across the project.

## 📋 Documents

### **.cursorrules** (3,000+ words)
**Comprehensive coding standards and AI assistant guidelines**

**Covers:**
- TypeScript/JavaScript patterns
- Python/FastAPI patterns
- SQL conventions
- Testing standards
- Security requirements
- Documentation requirements
- Git workflow
- Code review process
- Error handling
- Performance optimization
- Architecture patterns

**When to use:** Reference during every code review
**Use for:** Consistency, quality, security

---

## 🎯 Coding Principles

### **1. Code Quality**
✅ Write clean, readable code
✅ Follow consistent naming conventions
✅ Keep functions small and focused
✅ DRY (Don't Repeat Yourself)
✅ SOLID principles

### **2. Security**
✅ Validate all inputs
✅ Use environment variables for secrets
✅ Hash passwords properly
✅ Implement proper authentication
✅ Use HTTPS always
✅ Sanitize database queries
✅ Implement rate limiting

### **3. Testing**
✅ Write tests alongside code
✅ Aim for 80%+ coverage
✅ Test happy path and error cases
✅ Use descriptive test names
✅ Keep tests fast

### **4. Documentation**
✅ Document public APIs
✅ Write docstrings for functions
✅ Include inline comments for complex logic
✅ Keep README updated
✅ Document new dependencies

### **5. Performance**
✅ Optimize database queries
✅ Use caching appropriately
✅ Monitor API response times
✅ Lazy load components
✅ Minimize bundle size

---

## 🏗️ Architecture Patterns

### **Backend (FastAPI)**

```python
# Standard FastAPI route structure
@router.post("/endpoint")
async def endpoint_name(request: RequestModel, db: Session = Depends(get_db)):
    """
    Docstring describing the endpoint.
    
    Args:
        request: Request data model
        db: Database session
        
    Returns:
        Response data model
    """
    # Input validation
    validate_request(request)
    
    # Business logic
    result = process_logic(request, db)
    
    # Error handling
    if not result:
        raise HTTPException(status_code=400, detail="Error message")
    
    # Return response
    return ResponseModel(**result)
```

### **Frontend (React Native)**

```typescript
// Standard React component structure
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  // Props definition
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // State management
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [local, setLocal] = useState('');

  // Effects
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Event handlers
  const handlePress = () => {
    // Handle event
  };

  // Render
  return (
    <View style={styles.container}>
      <Text>{data}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### **Database (PostgreSQL)**

```sql
-- Standard table creation
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  role VARCHAR(20) NOT NULL DEFAULT 'passenger',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT valid_role CHECK (role IN ('passenger', 'driver', 'admin'))
);

-- Index for performance
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_role ON users(role) WHERE is_active = true;
```

---

## 🧪 Testing Standards

### **Unit Tests (Python)**
```python
import pytest
from app.services import user_service

class TestUserService:
    def test_create_user_success(self):
        # Arrange
        user_data = {"name": "John", "phone": "1234567890"}
        
        # Act
        result = user_service.create_user(user_data)
        
        # Assert
        assert result.id is not None
        assert result.name == "John"
    
    def test_create_user_invalid_phone(self):
        # Arrange
        user_data = {"name": "John", "phone": "invalid"}
        
        # Act & Assert
        with pytest.raises(ValidationError):
            user_service.create_user(user_data)
```

### **Component Tests (TypeScript)**
```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from './LoginScreen';

describe('LoginScreen', () => {
  test('renders login form', () => {
    render(<LoginScreen />);
    expect(screen.getByTestId('phone-input')).toBeOnTheScreen();
    expect(screen.getByTestId('submit-button')).toBeOnTheScreen();
  });

  test('submits form with valid phone', async () => {
    render(<LoginScreen />);
    const input = screen.getByTestId('phone-input');
    const button = screen.getByTestId('submit-button');
    
    fireEvent.changeText(input, '1234567890');
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeOnTheScreen();
    });
  });
});
```

---

## 🔒 Security Guidelines

### **Authentication**
- ✅ Use JWT with access + refresh tokens
- ✅ Set token expiry: Access (15 min), Refresh (7 days)
- ✅ Store tokens securely on mobile (AsyncStorage for development, Keychain/Keystore for production)
- ✅ Hash passwords with bcrypt (rounds: 10+)
- ✅ Implement SMS OTP for phone verification

### **API Security**
- ✅ Use HTTPS only
- ✅ Implement rate limiting (100 req/min per IP)
- ✅ Validate all inputs (type, length, format)
- ✅ Sanitize database queries (use parameterized queries)
- ✅ Add CORS headers correctly
- ✅ Implement request logging and monitoring

### **Data Protection**
- ✅ Encrypt sensitive data (passwords, OTPs)
- ✅ Use environment variables for secrets
- ✅ Implement data encryption at rest
- ✅ Regular backups of database
- ✅ Implement access controls (RBAC)

### **Client Security**
- ✅ Don't store sensitive data in AsyncStorage
- ✅ Use HTTPS for all API calls
- ✅ Implement certificate pinning for production
- ✅ Validate SSL certificates
- ✅ Use secure WebSocket (WSS)

---

## 📝 API Documentation

### **Standard Endpoint Format**
```
Method: [GET/POST/PUT/DELETE]
Path: /api/v1/resource
Authentication: Bearer token
Rate Limit: 100 req/min

Request Body:
{
  "field1": "type (required/optional)",
  "field2": "type (required/optional)"
}

Response (200):
{
  "success": true,
  "data": {
    "id": "resource_id",
    "field1": "value"
  }
}

Error Responses:
400: { "success": false, "message": "Bad request" }
401: { "success": false, "message": "Unauthorized" }
429: { "success": false, "message": "Rate limit exceeded" }
500: { "success": false, "message": "Internal server error" }
```

---

## 🔄 Git Workflow

### **Branch Naming**
- Feature: `feature/feature-name`
- Bug: `bugfix/bug-name`
- Hotfix: `hotfix/hotfix-name`
- Release: `release/version-number`

### **Commit Messages**
```
[TYPE] Brief description (50 chars max)

Longer description explaining why and what.
Line length: 72 characters max.

Types: feat, fix, docs, style, refactor, test, chore
Example: feat: Add user authentication endpoint
```

### **Pull Request Process**
1. Create feature branch from `develop`
2. Implement feature with tests
3. Ensure all tests pass (100% success)
4. Create PR with description
5. Code review (minimum 1 approval)
6. Merge to `develop`
7. Delete feature branch

---

## 📦 Dependency Management

### **Python (requirements.txt)**
```
FastAPI==0.104.1
SQLAlchemy==2.0.23
Pydantic==2.5.0
python-jose==3.3.0
pytest==7.4.3
```

### **Node.js (package.json)**
```json
{
  "dependencies": {
    "react-native": "0.73.0",
    "expo": "^50.0.0",
    "@react-navigation/native": "^6.1.0",
    "redux": "^4.2.1"
  }
}
```

### **Rules**
- ✅ Pin exact versions for production
- ✅ Update dependencies regularly
- ✅ Test after updates
- ✅ Document why specific versions are needed
- ✅ Keep dev and prod dependencies separate

---

## 🎨 Naming Conventions

### **Python**
- Functions/variables: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private: `_leading_underscore`

### **TypeScript/JavaScript**
- Functions/variables: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- React components: `PascalCase`
- Interfaces: `IPascalCase` or `PascalCase`

### **Database**
- Tables: `plural_snake_case` (users, rides, payments)
- Columns: `snake_case` (user_id, created_at)
- Primary Keys: `id`
- Foreign Keys: `[table_name]_id`

---

## 🚀 Performance Guidelines

### **Backend**
- Query optimization (use indexes, limit results)
- Implement caching (Redis)
- Lazy load relationships
- Use pagination (default: 20 items/page)
- Monitor response times (target: < 200ms)

### **Frontend**
- Minimize bundle size (target: < 50MB for APK)
- Lazy load screens
- Implement virtual lists for large lists
- Optimize images
- Use React.memo for expensive components

### **Database**
- Create indexes for frequently queried columns
- Implement connection pooling
- Archive old data
- Regular VACUUM and ANALYZE
- Monitor query performance

---

## 📚 Documentation Guidelines

### **Code Comments**
```python
# Good: Explains WHY, not WHAT
# We cache user preferences for 24h to reduce database load
cached_prefs = cache.get(f"user_prefs_{user_id}")

# Bad: Explains what code obviously does
# Get cached preferences
cached_prefs = cache.get(f"user_prefs_{user_id}")
```

### **Function Docstrings**
```python
def calculate_fare(distance_km: float, duration_min: int) -> float:
    """
    Calculate ride fare based on distance and duration.
    
    Formula: Base (₹50) + Distance (₹0.10/100m) + Time (₹0.18/min)
    
    Args:
        distance_km: Distance traveled in kilometers
        duration_min: Duration of ride in minutes
        
    Returns:
        Calculated fare in rupees
        
    Raises:
        ValueError: If distance or duration is negative
        
    Examples:
        >>> calculate_fare(5.0, 20)
        125.0
    """
```

---

## ✅ Code Review Checklist

Before submitting code for review:

- [ ] Code follows naming conventions
- [ ] Tests written and passing (80%+ coverage)
- [ ] No console errors or warnings
- [ ] Docstrings/comments added
- [ ] No hardcoded values
- [ ] Security best practices followed
- [ ] Performance optimized
- [ ] Error handling implemented
- [ ] Commit message descriptive
- [ ] Documentation updated

---

## 🔗 Related Resources

| Resource | Location |
|----------|----------|
| Full .cursorrules | .cursorrules |
| Requirements | 05-CLIENT-REQUIREMENTS/ |
| Architecture | 01-DOCUMENTATION/ |
| Development Guide | 03-DEVELOPMENT-GUIDES/ |

---

## 📞 Getting Help

Questions about coding standards?
1. Check .cursorrules (repo root)
2. Check code examples in development guide
3. Review existing code in the project
4. Ask team lead or senior developer

---

**Last Updated:** January 11, 2026  
**Status:** ✅ Ready for Development  
**Enforcement:** Code reviews will verify compliance
