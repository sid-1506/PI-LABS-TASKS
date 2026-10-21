// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * See https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  expect: {
    /* 10s assertion timeout because the demo site loader takes ~5 seconds */
    timeout: 10 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use */
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL for the-internet app */
    baseURL: 'https://the-internet.herokuapp.com',
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
