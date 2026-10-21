// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Test configuration for Task 1 - TodoMVC Basics.
 * See https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. 'list' provides concise CLI output, 'html' creates detailed report */
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'https://demo.playwright.dev/todomvc',
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    /* Capture screenshot only when a test fails */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
