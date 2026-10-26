import { expect, test } from '@playwright/test';

test('recalculates the whole-subtotal discount at the weekly threshold', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Nights', { exact: true }).fill('7');
  await page.getByLabel('Guests', { exact: true }).fill('2');
  await page.getByRole('button', { name: 'Calculate quote', exact: true }).click();

  await expect(page.getByRole('status')).toHaveText('Total: $756.00');
  await expect(page.getByRole('status')).toBeVisible();
  await expect(page.getByRole('alert')).toBeEmpty();

  await page.getByLabel('Nights', { exact: true }).fill('6');
  await page.getByRole('button', { name: 'Calculate quote', exact: true }).click();

  await expect(page.getByRole('status')).toHaveText('Total: $720.00');
  await expect(page.getByRole('status')).toBeVisible();
  await expect(page.getByRole('alert')).toBeEmpty();
});

test('replaces the weekly discount at 14 nights and recalculates across the boundary', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(
    'USD 100 per night plus USD 10 per guest per night. ' +
    'Stays of 7-13 nights receive 10% off the entire subtotal; ' +
    'stays of 14-30 nights receive 15% off the entire subtotal. ' +
    'Discounts do not stack.',
    { exact: true },
  )).toBeVisible();
  await page.getByLabel('Guests', { exact: true }).fill('2');

  for (const { nights, total } of [
    { nights: '13', total: 'Total: $1,404.00' },
    { nights: '14', total: 'Total: $1,428.00' },
    { nights: '13', total: 'Total: $1,404.00' },
    { nights: '30', total: 'Total: $3,060.00' },
  ]) {
    await page.getByLabel('Nights', { exact: true }).fill(nights);
    await page.getByRole('button', { name: 'Calculate quote', exact: true }).click();

    await expect(page.getByRole('status')).toHaveText(total);
    await expect(page.getByRole('status')).toBeVisible();
    await expect(page.getByRole('alert')).toBeEmpty();
  }
});
