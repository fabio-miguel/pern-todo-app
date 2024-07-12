// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  /* Test files to run */
  testDir: "./src/tests/end-to-end",
  /* Run tests in files in parallel
   * false - each test shares state with the next
   * true - each test runs in its own isolated state
   * */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }]],
  /* Setup database and server before testing */
  globalSetup: "./playwrightSetup.js",
  /* Remove database and server after testing */
  globalTeardown: "./playwrightTeardown.js",
  use: {
    trace: "on-first-retry",
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: "src/tests/end-to-end/demo-todo-app.spec.js",
    },
  ],

  /* Run local client dev server before starting the tests */
  webServer: [
    {
      /* Run front-end */
      command: "cd ../client && npm run start",
      url: "http://127.0.0.1:3000",
      timeout: 120 * 1000, // 120 seconds
      reuseExistingServer: !process.env.CI,
    },
  ],
});
