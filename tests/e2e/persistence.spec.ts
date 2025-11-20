// spec: tests/e2e/test-plan.md

import { test, expect } from '@playwright/test';

test('edits do not persist after full page reload (non-persistent state)', async ({ page }) => {
  await page.goto('/grid');
  const agRoot = page.locator('.ag-root');
  await expect(agRoot).toBeVisible();

  const firstRow = page.locator('.ag-center-cols-container .ag-row').first();
  const hw1Cell = firstRow.locator('.ag-cell').nth(1);
  await expect(hw1Cell).toBeVisible();

  // Edit the cell to a distinctive value
  await hw1Cell.dblclick();
  await page.keyboard.type('99');
  await page.keyboard.press('Enter');
  await expect(hw1Cell).toHaveText(/99/);

  // Reload the page and verify value changed (random row generation)
  await page.reload();
  await expect(agRoot).toBeVisible();

  const firstRowAfter = page.locator('.ag-center-cols-container .ag-row').first();
  const hw1After = firstRowAfter.locator('.ag-cell').nth(1);
  const afterText = (await hw1After.textContent())?.trim() ?? '';

  // Edits should not persist; afterText should not equal the edited value '99' in most runs
  // If it does (extremely unlikely), the test will fail which surfaces persistence.
  expect(afterText).not.toBe('99');
});