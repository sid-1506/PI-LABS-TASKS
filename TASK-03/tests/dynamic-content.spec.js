const { test, expect } = require('@playwright/test');

test.describe('Task 3 — Waiting on Dynamic Content', () => {

  test('Test 1: Hidden element becomes visible', async ({ page }) => {
    await page.goto('/dynamic_loading/1');

    const startButton = page.getByRole('button', { name: 'Start' });
    const helloWorld = page.getByRole('heading', { name: 'Hello World!' });
    await startButton.click();
    await expect(helloWorld).toBeVisible();
    await expect(helloWorld).toHaveText('Hello World!');
  });

  test('Test 2: Element is added to the DOM later', async ({ page }) => 
    {
    await page.goto('/dynamic_loading/2');

    const startButton = page.getByRole('button', { name: 'Start' });
    const helloWorld = page.getByText('Hello World!');

    await startButton.click();
    await expect(helloWorld).toBeVisible();
    await expect(helloWorld).toHaveText('Hello World!');
  });

});
