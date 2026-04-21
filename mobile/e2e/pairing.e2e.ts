import { by, device, element, expect, waitFor } from 'detox';

describe('Complete Pairing Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete full pairing journey from solo to paired', async () => {
    // Step 1: Navigate to home screen
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Verify solo card is displayed
    await expect(element(by.id('solo-card'))).toBeVisible();
    await expect(element(by.text('Bắt đầu một mình trước'))).toBeVisible();

    // Step 3: Tap on pairing button
    await element(by.id('pairing-button')).tap();

    // Step 4: Verify pairing screen is displayed
    await waitFor(element(by.id('pairing-screen')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.text('Ghép đôi với người yêu'))).toBeVisible();

    // Step 5: Verify pairing code is displayed
    await expect(element(by.id('pairing-code'))).toBeVisible();
    await expect(element(by.id('copy-pairing-code'))).toBeVisible();

    // Step 6: Copy pairing code
    await element(by.id('copy-pairing-code')).tap();

    // Step 7: Navigate to partner code input section
    await element(by.id('enter-partner-code')).tap();

    // Step 8: Enter partner code
    await element(by.id('partner-code-input')).tap();
    await element(by.id('partner-code-input')).typeText('ABC123');

    // Step 9: Confirm pairing
    await element(by.id('confirm-pairing')).tap();

    // Step 10: Verify pairing success message
    await waitFor(element(by.text('Đã ghép đôi thành công')))
      .toBeVisible()
      .withTimeout(10000);

    // Step 11: Verify navigation to paired home screen
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 12: Verify love days card is now displayed (paired state)
    await expect(element(by.id('love-days-card'))).toBeVisible();
    await expect(element(by.text('Ngày yêu nhau'))).toBeVisible();
  });

  it('should handle invalid pairing code', async () => {
    // Step 1: Navigate to pairing screen
    await element(by.id('pairing-button')).tap();
    await waitFor(element(by.id('pairing-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Enter invalid partner code
    await element(by.id('enter-partner-code')).tap();
    await element(by.id('partner-code-input')).tap();
    await element(by.id('partner-code-input')).typeText('INVALID');

    // Step 3: Confirm pairing
    await element(by.id('confirm-pairing')).tap();

    // Step 4: Verify error message
    await waitFor(element(by.text('Mã ghép đôi không hợp lệ')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should handle pairing code expiration', async () => {
    // Step 1: Navigate to pairing screen
    await element(by.id('pairing-button')).tap();
    await waitFor(element(by.id('pairing-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Verify pairing code expiry timer
    await expect(element(by.id('pairing-code-timer'))).toBeVisible();

    // Step 3: Wait for code to expire (simulated)
    await element(by.id('pairing-code-timer')).tap();

    // Step 4: Verify refresh code option
    await expect(element(by.id('refresh-pairing-code'))).toBeVisible();

    // Step 5: Refresh pairing code
    await element(by.id('refresh-pairing-code')).tap();

    // Step 6: Verify new code is generated
    await expect(element(by.id('pairing-code'))).toBeVisible();
  });

  it('should allow unpairing from paired state', async () => {
    // Step 1: Navigate to profile settings
    await element(by.id('profile-tab')).tap();
    await waitFor(element(by.id('profile-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Navigate to relationship settings
    await element(by.id('relationship-settings')).tap();
    await waitFor(element(by.id('relationship-settings-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 3: Tap on unpair button
    await element(by.id('unpair-button')).tap();

    // Step 4: Confirm unpairing
    await element(by.id('confirm-unpair')).tap();

    // Step 5: Verify unpairing success message
    await waitFor(element(by.text('Đã hủy ghép đôi')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 6: Verify return to solo state
    await element(by.id('home-tab')).tap();
    await waitFor(element(by.id('solo-card')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
