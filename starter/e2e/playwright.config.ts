import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:5180';

export default defineConfig({
  testDir: './tests',
  forbidOnly: true,
  retries: 0,
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `dotnet run --project ../BookingLab --no-launch-profile --urls ${baseURL}`,
    url: `${baseURL}/health`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
