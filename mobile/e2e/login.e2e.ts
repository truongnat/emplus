import { by, device, element, expect } from 'detox';

describe('Complete Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete full login journey', async () => {
    // Step 1: Verify login screen is displayed
    await expect(element(by.text('Đăng nhập'))).toBeVisible();

    // Step 2: Enter email
    await element(by.id('email-input')).tap();
    await element(by.id('email-input')).typeText('test@example.com');

    // Step 3: Enter password
    await element(by.id('password-input')).tap();
    await element(by.id('password-input')).typeText('password123');

    // Step 4: Tap login button
    await element(by.id('login-button')).tap();

    // Step 5: Verify successful login - should navigate to home screen
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(10000);

    // Step 6: Verify home screen elements are visible
    await expect(element(by.text('Chào buổi sáng!'))).toBeVisible();
    await expect(element(by.id('notification-button'))).toBeVisible();
  });

  it('should handle login with invalid credentials', async () => {
    // Enter invalid credentials
    await element(by.id('email-input')).tap();
    await element(by.id('email-input')).typeText('invalid@example.com');

    await element(by.id('password-input')).tap();
    await element(by.id('password-input')).typeText('wrongpassword');

    // Tap login button
    await element(by.id('login-button')).tap();

    // Verify error message is shown
    await expect(element(by.text('Email hoặc mật khẩu không đúng'))).toBeVisible();
  });

  it('should navigate to signup from login', async () => {
    // Tap signup link
    await element(by.id('signup-link')).tap();

    // Verify signup screen is displayed
    await expect(element(by.text('Đăng ký'))).toBeVisible();
    await expect(element(by.id('signup-email-input'))).toBeVisible();
    await expect(element(by.id('signup-password-input'))).toBeVisible();
    await expect(element(by.id('signup-button'))).toBeVisible();
  });

  it('should handle forgot password flow', async () => {
    // Tap forgot password link
    await element(by.id('forgot-password-link')).tap();

    // Verify forgot password screen is displayed
    await expect(element(by.text('Quên mật khẩu'))).toBeVisible();
    await expect(element(by.id('reset-email-input'))).toBeVisible();
    await expect(element(by.id('send-reset-link'))).toBeVisible();
  });
});
