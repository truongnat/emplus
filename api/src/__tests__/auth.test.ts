import { describe, it, expect, beforeEach } from 'bun:test';
import { app } from '../app';

describe('Authentication', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'password123';
  const testFullName = 'Test User';

  describe('POST /v1/auth/register', () => {
    it('should register user successfully', async () => {
      const res = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          fullName: testFullName,
        }),
      });

      expect(res.status).toBe(201);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.user).toBeDefined();
      expect(data.data.user.email).toBe(testEmail);
      expect(data.data.user.fullName).toBe(testFullName);
      expect(data.data.tokens).toBeDefined();
      expect(data.data.tokens.accessToken).toBeDefined();
      expect(data.data.tokens.refreshToken).toBeDefined();
      expect(data.data.tokens.expiresIn).toBeDefined();
    });

    it('should fail with invalid email', async () => {
      const res = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'invalid-email',
          password: testPassword,
          fullName: testFullName,
        }),
      });

      expect(res.status).toBe(400);
    });

    it('should fail with weak password', async () => {
      const res = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `test2-${Date.now()}@example.com`,
          password: '123',
          fullName: testFullName,
        }),
      });

      expect(res.status).toBe(400);
    });

    it('should fail with missing fields', async () => {
      const res = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          // Missing password and fullName
        }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /v1/auth/login', () => {
    let registeredUser: any;

    beforeEach(async () => {
      // Register a test user first
      const email = `login-test-${Date.now()}@example.com`;
      const res = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: testPassword,
          fullName: testFullName,
        }),
      });
      registeredUser = await res.json();
    });

    it('should login with correct credentials', async () => {
      const res = await app.request('/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registeredUser.data.user.email,
          password: testPassword,
        }),
      });

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.user).toBeDefined();
      expect(data.data.tokens).toBeDefined();
      expect(data.data.tokens.accessToken).toBeDefined();
    });

    it('should fail with wrong password', async () => {
      const res = await app.request('/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registeredUser.data.user.email,
          password: 'wrongpassword',
        }),
      });

      expect(res.status).toBe(401);
    });

    it('should return requiresOTP for non-existent email', async () => {
      const res = await app.request('/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: testPassword,
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.requiresOTP).toBe(true);
    });
  });

  describe('POST /v1/auth/refresh', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Register and get refresh token
      const email = `refresh-test-${Date.now()}@example.com`;
      const registerRes = await app.request('/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: testPassword,
          fullName: testFullName,
        }),
      });
      const data = await registerRes.json();
      refreshToken = data.data.tokens.refreshToken;
    });

    it('should refresh token successfully', async () => {
      const res = await app.request('/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.tokens).toBeDefined();
      expect(data.data.tokens.accessToken).toBeDefined();
      expect(data.data.tokens.refreshToken).toBeDefined();
      expect(data.data.tokens.expiresIn).toBeDefined();
    });

    it('should fail with invalid refresh token', async () => {
      const res = await app.request('/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: 'invalid-token',
        }),
      });

      expect(res.status).toBe(401);
    });

    it('should fail with missing refresh token', async () => {
      const res = await app.request('/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });
  });
});
