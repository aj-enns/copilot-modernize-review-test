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
