import { by, device, element, expect, waitFor } from 'detox';

describe('Complete Home Screen Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete full home screen interaction for paired user', async () => {
    // Step 1: Verify home screen is loaded
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Verify greeting is displayed
    await expect(element(by.text('Chào buổi sáng!'))).toBeVisible();

    // Step 3: Verify love days card is displayed
    await expect(element(by.id('love-days-card'))).toBeVisible();

    // Step 4: Scroll down to see more content
    await element(by.id('home-scrollview')).scroll(200, 'down');

    // Step 5: Verify quick actions section
    await expect(element(by.id('quick-actions'))).toBeVisible();

    // Step 6: Tap on notification button
    await element(by.id('notification-button')).tap();

    // Step 7: Verify notifications screen is displayed
    await waitFor(element(by.id('notifications-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 8: Navigate back to home
    await element(by.id('back-button')).tap();

    // Step 9: Verify we're back on home screen
    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('should complete full home screen interaction for solo user', async () => {
    // Step 1: Verify solo card is displayed
    await waitFor(element(by.id('solo-card')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Verify solo card content
    await expect(element(by.text('Bắt đầu một mình trước'))).toBeVisible();

    // Step 3: Tap on solo important date button
    await element(by.id('solo-date-button')).tap();

    // Step 4: Verify date picker is displayed
    await expect(element(by.id('date-picker'))).toBeVisible();

    // Step 5: Select a date
    await element(by.text('25')).tap();

    // Step 6: Confirm date selection
    await element(by.id('confirm-date')).tap();

    // Step 7: Verify countdown is displayed
    await expect(element(by.id('countdown-display'))).toBeVisible();
  });

  it('should handle header overlay on scroll', async () => {
    // Step 1: Verify header is transparent at top
    await element(by.id('home-scrollview')).scrollTo('top');

    // Step 2: Scroll down to trigger overlay
    await element(by.id('home-scrollview')).scroll(100, 'down');

    // Step 3: Verify header overlay is visible
    await expect(element(by.id('header-overlay'))).toBeVisible();

    // Step 4: Scroll back to top
    await element(by.id('home-scrollview')).scrollTo('top');

    // Step 5: Verify header overlay is hidden
    await expect(element(by.id('header-overlay'))).not.toBeVisible();
  });

  it('should navigate between all tabs', async () => {
    // Step 1: Verify we're on home tab
    await expect(element(by.id('home-tab'))).toBeVisible();

    // Step 2: Navigate to care tab
    await element(by.id('care-tab')).tap();
    await waitFor(element(by.id('care-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 3: Navigate to timeline tab
    await element(by.id('timeline-tab')).tap();
    await waitFor(element(by.id('timeline-screen')))
      .toBeVisible()
      .withTimeout(5000);

    // Step 4: Navigate back to home tab
    await element(by.id('home-tab')).tap();
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
