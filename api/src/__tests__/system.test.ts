import { describe, it, expect, beforeEach } from 'bun:test';
import { app } from '../app';

describe('System Health', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await app.request('/health');

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.status).toBe('active');
    });
  });

  describe('GET /v1/system/dependencies', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Register a test user to get token
      const email = `sys-test-${Date.now()}@example.com`;
      const res = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: 'password123',
          fullName: 'Sys Test',
        }),
      });
      const data = await res.json();
      accessToken = data.data.tokens.accessToken;
    });

    it('should return dependencies status', async () => {
      const res = await app.request('/v1/system/dependencies', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      expect([200, 503]).toContain(res.status);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
    });
  });
});

describe('OpenAPI Documentation', () => {
  describe('GET /v1/docs', () => {
    it('should return Swagger UI HTML', async () => {
      const res = await app.request('/v1/docs');

      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toContain('text/html');

      const html = await res.text();
      expect(html).toContain('swagger-ui');
    });
  });

  describe('GET /v1/docs/openapi.json', () => {
    it('should return OpenAPI spec', async () => {
      const res = await app.request('/v1/docs/openapi.json');

      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toContain('application/json');

      const data = await res.json();
      expect(data.openapi).toBe('3.0.3');
      expect(data.info.title).toBe('Em+ API');
      expect(data.paths).toBeDefined();
      expect(data.components).toBeDefined();
    });

    it('should have all required paths', async () => {
      const res = await app.request('/v1/docs/openapi.json');
      const data = await res.json();

      const requiredPaths = [
        '/health',
        '/v1/auth/register',
        '/v1/auth/login',
        '/v1/auth/verify-otp',
        '/v1/auth/forgot-password',
        '/v1/auth/reset-password',
        '/v1/auth/refresh',
        '/v1/users/me',
        '/v1/users/push-token',
        '/v1/notifications',
        '/v1/notifications/{id}/read',
        '/v1/notifications/read-all',
        '/v1/couples/generate-invite',
        '/v1/couples/join',
        '/v1/dashboard/home',
        '/v1/timeline/memories',
        '/v1/budget/summary',
        '/v1/budget/expenses',
      ];

      for (const path of requiredPaths) {
        expect(data.paths[path]).toBeDefined();
      }
    });

    it('should have all required schemas', async () => {
      const res = await app.request('/v1/docs/openapi.json');
      const data = await res.json();

      const requiredSchemas = [
        'User',
        'UpdateUserProfile',
        'TokenPair',
        'AuthResponse',
        'LoginResult',
        'PasswordResetAck',
        'InAppNotification',
        'Couple',
        'Memory',
        'DashboardHome',
        'BudgetItem',
        'BudgetSummary',
      ];

      for (const schema of requiredSchemas) {
        expect(data.components.schemas[schema]).toBeDefined();
      }
    });
  });
});
