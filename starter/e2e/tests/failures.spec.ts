import { expect, test } from '@playwright/test';

for (const failure of ['server', 'network'] as const) {
  test(`${failure} failure is visible and clears a stale successful total`, async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Nights', { exact: true }).fill('7');
    await page.getByLabel('Guests', { exact: true }).fill('2');
    await page.getByRole('button', { name: 'Calculate quote', exact: true }).click();
    await expect(page.getByRole('status')).toHaveText('Total: $756.00');

    await page.route('**/api/quote', async (route) => {
      if (failure === 'server') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ title: 'Internal Server Error' }),
        });
      } else {
        await route.abort('failed');
      }
    });

    await page.getByLabel('Nights', { exact: true }).fill('6');
    await page.getByRole('button', { name: 'Calculate quote', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(
      failure === 'server'
        ? 'Unable to calculate quote. Check your inputs and try again.'
        : 'Unable to reach the server. Please try again.',
    );
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('status')).toBeEmpty();

    await page.unroute('**/api/quote');
    await page.getByRole('button', { name: 'Calculate quote', exact: true }).click();
    await expect(page.getByRole('status')).toHaveText('Total: $720.00');
    await expect(page.getByRole('alert')).toBeEmpty();
  });
}
