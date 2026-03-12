# Testing Roadmap - EmPlus API

## 📋 Overview

Hướng dẫn viết và chạy test cases cho EmPlus API sử dụng Bun test runner.

## 🎯 Test Structure

```
api/src/
├── __tests__/              # Test files
│   ├── auth.test.ts        # Authentication tests
│   ├── couples.test.ts     # Couple management tests
│   ├── dashboard.test.ts   # Dashboard tests
│   ├── timeline.test.ts    # Timeline/Memories tests
│   ├── care.test.ts        # Care tests
│   ├── budget.test.ts      # Budget tests
│   └── system.test.ts      # System tests
├── test/                   # Test utilities
│   ├── setup.ts            # Test setup
│   ├── fixtures.ts         # Test data fixtures
│   └── helpers.ts          # Test helpers
```

## 🚀 Quick Start

### 1. Chạy Tests

```bash
# Chạy tất cả tests
bun run test

# Chạy test cụ thể
bun test auth.test.ts

# Chạy với coverage
bun test --coverage

# Chạy trong watch mode
bun test --watch
```

### 2. Environment

```bash
# Test environment variables
NODE_ENV=test
DATA_STORE=memory
ALLOW_MOCK_OAUTH=true
```

## 📝 Writing Test Cases

### Basic Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { app } from '../app';

describe('POST /v1/auth/register', () => {
  beforeEach(async () => {
    // Setup before each test
  });

  afterEach(async () => {
    // Cleanup after each test
  });

  it('should register user successfully', async () => {
    const res = await app.request('/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
      }),
    });

    expect(res.status).toBe(201);
    
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.user).toBeDefined();
    expect(data.data.tokens).toBeDefined();
  });

  it('should fail with existing email', async () => {
    // Test duplicate email
  });

  it('should fail with invalid email', async () => {
    // Test invalid email format
  });
});
```

### Authentication Tests

```typescript
// api/src/__tests__/auth.test.ts
import { describe, it, expect } from 'bun:test';

describe('Authentication', () => {
  describe('POST /v1/auth/register', () => {
    it('should register with valid data', async () => {
      // Test registration
    });

    it('should reject duplicate email', async () => {
      // Test duplicate
    });

    it('should hash password', async () => {
      // Test password hashing
    });
  });

  describe('POST /v1/auth/login', () => {
    it('should login with correct credentials', async () => {
      // Test login
    });

    it('should reject wrong password', async () => {
      // Test wrong password
    });
  });

  describe('POST /v1/auth/refresh', () => {
    it('should refresh token', async () => {
      // Test token refresh
    });
  });
});
```

### Couple Management Tests

```typescript
// api/src/__tests__/couples.test.ts
describe('Couple Management', () => {
  let authToken: string;

  beforeEach(async () => {
    // Create test user and get auth token
  });

  describe('POST /v1/couples/generate-invite', () => {
    it('should generate invite code', async () => {
      const res = await app.request('/v1/couples/generate-invite', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(201);
      
      const data = await res.json();
      expect(data.inviteCode).toBeDefined();
      expect(data.expiresIn).toBeDefined();
    });

    it('should require authentication', async () => {
      const res = await app.request('/v1/couples/generate-invite', {
        method: 'POST',
      });

      expect(res.status).toBe(401);
    });
  });

  describe('POST /v1/couples/join', () => {
    it('should join with valid invite code', async () => {
      // Test joining couple
    });

    it('should reject expired invite', async () => {
      // Test expired invite
    });
  });
});
```

### Dashboard Tests

```typescript
// api/src/__tests__/dashboard.test.ts
describe('Dashboard', () => {
  let authToken: string;
  let coupleId: string;

  beforeEach(async () => {
    // Setup authenticated user with couple
  });

  describe('GET /v1/dashboard/home', () => {
    it('should return dashboard data', async () => {
      const res = await app.request('/v1/dashboard/home', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.coupleContext).toBeDefined();
      expect(data.coupleContext.loveDays).toBeDefined();
      expect(data.upcomingEvents).toBeDefined();
      expect(data.careAdvice).toBeDefined();
    });

    it('should return 404 without couple', async () => {
      // Test without couple relationship
    });
  });
});
```

### Timeline/Memories Tests

```typescript
// api/src/__tests__/timeline.test.ts
describe('Timeline - Memories', () => {
  let authToken: string;

  beforeEach(async () => {
    // Setup authenticated user
  });

  describe('GET /v1/timeline/memories', () => {
    it('should return memories list', async () => {
      const res = await app.request('/v1/timeline/memories?page=1&limit=10', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.items).toBeInstanceOf(Array);
      expect(data.pagination).toBeDefined();
    });

    it('should paginate correctly', async () => {
      // Test pagination
    });
  });

  describe('POST /v1/timeline/memories', () => {
    it('should create memory', async () => {
      const res = await app.request('/v1/timeline/memories', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Our First Date',
          memoryDate: '2024-01-01',
          description: 'Amazing day!',
        }),
      });

      expect(res.status).toBe(201);
    });
  });
});
```

### Budget Tests

```typescript
// api/src/__tests__/budget.test.ts
describe('Budget Management', () => {
  let authToken: string;

  beforeEach(async () => {
    // Setup authenticated user
  });

  describe('GET /v1/budget/summary', () => {
    it('should return budget summary', async () => {
      const res = await app.request('/v1/budget/summary', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.totalBudget).toBeDefined();
      expect(data.totalSpent).toBeDefined();
      expect(data.remainingAmount).toBeDefined();
    });
  });

  describe('GET /v1/budget/expenses', () => {
    it('should return expenses list', async () => {
      const res = await app.request('/v1/budget/expenses', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);
    });
  });

  describe('POST /v1/budget/expenses', () => {
    it('should create expense', async () => {
      const res = await app.request('/v1/budget/expenses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Dinner',
          amount: 500000,
          category: 'food',
          date: '2024-01-15',
        }),
      });

      expect(res.status).toBe(201);
    });
  });
});
```

## 🔧 Test Utilities

### Test Helpers

```typescript
// api/src/test/helpers.ts
import { app } from '../app';

export async function createTestUser() {
  const res = await app.request('/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'Test User',
    }),
  });

  return await res.json();
}

export function getAuthHeader(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}
```

### Test Fixtures

```typescript
// api/src/test/fixtures.ts
export const testUsers = {
  valid: {
    email: 'test@example.com',
    password: 'password123',
    fullName: 'Test User',
    gender: 'NAM',
  },
  invalid: {
    email: 'invalid-email',
    password: '123',
  },
};

export const testMemories = {
  valid: {
    title: 'Test Memory',
    memoryDate: '2024-01-01',
    description: 'Test description',
  },
};

export const testExpenses = {
  valid: {
    title: 'Test Expense',
    amount: 100000,
    category: 'food',
    date: '2024-01-15',
  },
};
```

## 📊 Test Coverage

### Generate Coverage Report

```bash
bun test --coverage

# View coverage
open coverage/index.html
```

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🎯 Test Categories

### Unit Tests

```typescript
// Test individual functions
describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      expect(formatDate(new Date('2024-01-01'))).toBe('01/01/2024');
    });
  });
});
```

### Integration Tests

```typescript
// Test API endpoints
describe('API Endpoints', () => {
  describe('POST /v1/auth/login', () => {
    it('should return tokens', async () => {
      // Full integration test
    });
  });
});
```

### E2E Tests

```typescript
// Test complete user flows
describe('User Flow', () => {
  it('should complete registration to dashboard', async () => {
    // Register → Login → Get Dashboard
  });
});
```

## 🐛 Common Issues

### Database Cleanup

```typescript
afterEach(async () => {
  // Clean test database
  await db.delete(users);
});
```

### Mock External Services

```typescript
// Mock OAuth
vi.mock('../services/oauth', () => ({
  verifyGoogleToken: vi.fn().mockResolvedValue({ email: 'test@example.com' }),
}));
```

### Async Operations

```typescript
it('should complete async operation', async () => {
  await someAsyncOperation();
  expect(result).toBeDefined();
});
```

## 📚 Resources

- [Bun Test Documentation](https://bun.sh/docs/cli/test)
- [Testing Best Practices](https://docs.bun.sh/guides/test/best-practices)
- [Mocking in Bun](https://bun.sh/docs/cli/test#mocking)

---

**Ready to write tests! 🚀**
