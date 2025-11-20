// spec: tests/e2e/test-plan.md

import { test, expect } from '@playwright/test';

test('no uncaught console errors during dashboard interactions', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await expect(page.getByText('Design Engineering')).toBeVisible();

  await page.goto('/grid');
  await expect(page.locator('.ag-root')).toBeVisible();

  // allow some time for any console messages to appear (Playwright waits implicitly on actions)
  expect(errors.length).toBe(0);
});