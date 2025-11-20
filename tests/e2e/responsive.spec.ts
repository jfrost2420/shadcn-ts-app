// spec: tests/e2e/test-plan.md

import { test, expect } from '@playwright/test';

test('responsive behavior: breadcrumb items hide below md breakpoint', async ({ page }) => {
  // Desktop check first
  await page.goto('/');
  await expect(page.getByText('Building Your Application')).toBeVisible();

  // Emulate mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });

  // On narrow screens the breadcrumb item with `hidden md:block` should not be visible
  await expect(page.getByText('Building Your Application')).not.toBeVisible();
});