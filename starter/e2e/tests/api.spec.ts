import { expect, test } from '@playwright/test';

for (const { nights, guests, field } of [
  { nights: 0, guests: 2, field: 'nights' },
  { nights: 31, guests: 2, field: 'nights' },
  { nights: 7, guests: 0, field: 'guests' },
  { nights: 7, guests: 7, field: 'guests' },
]) {
  test(`rejects nights=${nights}, guests=${guests} with HTTP 400`, async ({ request }) => {
    const response = await request.post('/api/quote', { data: { nights, guests } });

    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({
      status: 400,
      errors: { [field]: [expect.stringMatching(/\S/)] },
    });
  });
}

for (const { nights, guests, total } of [
  { nights: 1, guests: 1, total: 110 },
  { nights: 1, guests: 6, total: 160 },
  { nights: 30, guests: 1, total: 2805 },
  { nights: 30, guests: 6, total: 4080 },
]) {
  test(`accepts inclusive bounds nights=${nights}, guests=${guests}`, async ({ request }) => {
    const response = await request.post('/api/quote', { data: { nights, guests } });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ total });
  });
}

for (const { nights, total } of [
  { nights: 13, total: 1404 },
  { nights: 14, total: 1428 },
  { nights: 30, total: 3060 },
]) {
  test(`applies a single discount for nights=${nights}, guests=2`, async ({ request }) => {
    const response = await request.post('/api/quote', { data: { nights, guests: 2 } });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ total });
  });
}
