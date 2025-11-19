import { test, expect } from "@playwright/test";

test("navigates to /grid and displays the grade grid", async ({ page }) => {
  const response = await page.goto("/grid");
  // ensure navigation succeeded
  expect(response && response.ok()).toBeTruthy();

  // ensure URL contains /grid
  await expect(page).toHaveURL(/\/grid/);

  // wait for the Ag Grid root element to render
  const agRoot = page.locator(".ag-root");
  await expect(agRoot).toBeVisible();

  // sanity checks for header and pinned footer text defined in the component
  await expect(page.locator("text=Student")).toBeVisible();
  await expect(page.locator("text=Assignment Avg")).toBeVisible();
});
