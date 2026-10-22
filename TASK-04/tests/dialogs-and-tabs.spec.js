const { test, expect } = require('@playwright/test');

test.describe('Task 4 — Dialogs, Alerts & New Tabs', () => {

  test('Test 1: JavaScript alert - Verify dialog and accept', async ({ page }) => {
    // Navigate to the JavaScript alerts page
    await page.goto('/javascript_alerts');

    // 1. Register dialog handler BEFORE triggering the alert
    page.on('dialog', async (dialog) => {
      // Verify dialog type is 'alert'
      expect(dialog.type()).toBe('alert');
      // Verify dialog message content
      expect(dialog.message()).toBe('I am a JS Alert');
      // Accept the alert dialog
      await dialog.accept();
    });

    // 2. Click button to trigger alert
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // 3. Assert the result text displayed on the page
    const result = page.locator('#result');
    await expect(result).toHaveText('You successfully clicked an alert');
  });

  test('Test 2a: JavaScript confirm - Accept dialog', async ({ page }) => {
    // Navigate to the JavaScript alerts page
    await page.goto('/javascript_alerts');

    // 1. Register dialog handler BEFORE triggering the confirm dialog
    page.on('dialog', async (dialog) => {
      // Verify dialog type is 'confirm'
      expect(dialog.type()).toBe('confirm');
      // Verify dialog message content
      expect(dialog.message()).toBe('I am a JS Confirm');
      // Accept the confirm dialog (clicks "OK")
      await dialog.accept();
    });

    // 2. Click button to trigger confirm dialog
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    // 3. Assert the result text on the page
    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Ok');
  });

  test('Test 2b: JavaScript confirm - Dismiss dialog', async ({ page }) => {
    // Navigate to the JavaScript alerts page
    await page.goto('/javascript_alerts');

    // 1. Register dialog handler BEFORE triggering the confirm dialog
    page.on('dialog', async (dialog) => {
      // Verify dialog type is 'confirm'
      expect(dialog.type()).toBe('confirm');
      // Verify dialog message content
      expect(dialog.message()).toBe('I am a JS Confirm');
      // Dismiss the confirm dialog (clicks "Cancel")
      await dialog.dismiss();
    });

    // 2. Click button to trigger confirm dialog
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    // 3. Assert the result text on the page shows Cancel
    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Cancel');
  });

  test('Test 3: JavaScript prompt - Enter text and accept', async ({ page }) => {
    // Navigate to the JavaScript alerts page
    await page.goto('/javascript_alerts');

    const promptInput = 'Sid Playwright';

    // 1. Register dialog handler BEFORE triggering the prompt
    page.on('dialog', async (dialog) => {
      // Verify dialog type is 'prompt'
      expect(dialog.type()).toBe('prompt');
      // Verify dialog message content
      expect(dialog.message()).toBe('I am a JS prompt');
      // Enter the sample value into the prompt and accept
      await dialog.accept(promptInput);
    });

    // 2. Click button to trigger prompt dialog
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    // 3. Assert that the entered text appears in the page result
    const result = page.locator('#result');
    await expect(result).toHaveText(`You entered: ${promptInput}`);
  });

  // ========================================================
  // Test B — New Browser Tab
  // ========================================================

  test('Test 4: Open, verify and close a new browser tab', async ({ page }) => {
    // 1. Open the original page
    await page.goto('/windows');

    // 2. Start waiting for the new tab event BEFORE clicking the link
    // page.context().waitForEvent('page') waits for a new page/tab to be created
    const pagePromise = page.context().waitForEvent('page');

    // 3. Click the link that opens the new tab (target="_blank")
    await page.getByRole('link', { name: 'Click Here' }).click();

    // 4. Capture the new tab in a variable once the event resolves
    const newPage = await pagePromise;

    // 5. Wait for the new tab to finish loading
    await newPage.waitForLoadState();

    // 6. Assert the new tab's URL and heading
    expect(newPage.url()).toContain('/windows/new');
    const newTabHeading = newPage.getByRole('heading', { level: 3 });
    await expect(newTabHeading).toBeVisible();
    await expect(newTabHeading).toHaveText('New Window');

    // 7. Close the new tab after assertions
    await newPage.close();

    // 8. Ensure the original page remains usable
    const originalHeading = page.getByRole('heading', { level: 3 });
    await expect(originalHeading).toBeVisible();
    await expect(originalHeading).toHaveText('Opening a new window');
    await expect(page.getByRole('link', { name: 'Click Here' })).toBeVisible();
  });

});
