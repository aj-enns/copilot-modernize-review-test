import { test, expect } from '@playwright/test';

test('guest can calculate and update a weekly quote', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Booking estimator' })).toBeVisible();
  await page.getByLabel('Nights').fill('7');
  await page.getByLabel('Guests').fill('2');
  await page.getByRole('button', { name: 'Calculate quote' }).click();
  await expect(page.locator('#result')).toHaveText('Total: $756.00');
  await page.getByLabel('Nights').fill('6');
  await page.getByRole('button', { name: 'Calculate quote' }).click();
  await expect(page.locator('#result')).toHaveText('Total: $720.00');
  await expect(page.getByRole('alert')).toBeEmpty();
});

test('API rejects invalid inputs even when browser constraints are bypassed', async ({ request }) => {
  for (const data of [{ nights: 0, guests: 1 }, { nights: 1, guests: 7 }]) {
    const response = await request.post('/api/quote', { data });
    expect(response.status()).toBe(400);
    expect((await response.json()).errors).toBeDefined();
  }
});

test('UI displays server validation errors and clears a stale total', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Calculate quote' }).click();
  await expect(page.locator('#result')).toHaveText('Total: $110.00');
  await page.locator('#nights').evaluate((element) => element.removeAttribute('min'));
  await page.getByLabel('Nights').fill('0');
  await page.getByRole('button', { name: 'Calculate quote' }).click();
  await expect(page.getByRole('alert')).toContainText('Nights must be between 1 and 30.');
  await expect(page.locator('#result')).toBeEmpty();
});

test('network failure is visible', async ({ page }) => {
  await page.goto('/');
  await page.route('**/api/quote', (route) => route.abort());
  await page.getByRole('button', { name: 'Calculate quote' }).click();
  await expect(page.getByRole('alert')).toHaveText('Unable to reach the server. Please try again.');
});
