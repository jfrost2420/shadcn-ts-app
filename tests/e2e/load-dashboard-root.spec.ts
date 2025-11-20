// spec: tests/e2e/test-plan.md
// seed: tests/e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Load Dashboard (root) — verify layout and navigation elements', () => {
  test('Load Dashboard (root) — verify layout and navigation elements', async ({ page }) => {
    // 1. Open `/` (root).
    await page.goto('http://localhost:5173/');

    // 2. Verify the sidebar is visible (left area) and contains TeamSwitcher, top navigation, and user area.
    // Check for a known project entry that lives in the sidebar.
    await expect(page.getByText('Design Engineering')).toBeVisible();

    // 3. Verify header contains the Sidebar toggle (SidebarTrigger) and breadcrumb.
    // 4. Inspect the breadcrumb text; confirm at least one crumb is present.
    await expect(page.getByText('Building Your Application')).toBeVisible();
    await expect(page.getByText('Data Fetching')).toBeVisible();

    // 5. Click the sidebar collapse/expand trigger (SidebarTrigger) to collapse the sidebar; then expand it again.
    const sidebarToggle = page.getByRole('main').getByRole('button', { name: 'Toggle Sidebar' });
    await expect(sidebarToggle).toBeVisible();
    await sidebarToggle.click();
    // click again to expand
    await sidebarToggle.click();

    // 6. Open the TeamSwitcher control, switch to a different team (e.g., "Acme Inc").
    const teamButton = page.getByRole('button', { name: 'Acme Inc Enterprise' });
    await expect(teamButton).toBeVisible();
    await teamButton.click();
    // choose Acme Inc from the opened menu
    const acmeMenuItem = page.getByRole('menuitem', { name: /Acme Inc/ });
    await expect(acmeMenuItem).toBeVisible();
    await acmeMenuItem.click();

    // 7. Open the user menu (NavUser) in the sidebar footer and verify user details/options appear.
    const userButton = page.getByRole('button', { name: /shadcn/ });
    await expect(userButton).toBeVisible();
    await userButton.click();
    // target the opened menu specifically to avoid ambiguous matches
    const userMenu = page.getByRole('menu');
    await expect(userMenu.getByText('m@example.com')).toBeVisible();
  });
});
