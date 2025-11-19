import { test, expect } from "@playwright/test";

test("homepage loads and has expected title", async ({ page }) => {
  const response = await page.goto("/");
  expect(response && response.ok()).toBeTruthy();
  await expect(page).toHaveTitle("shadcn-ts-app");
});
