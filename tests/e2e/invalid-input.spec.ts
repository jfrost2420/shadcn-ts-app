// spec: tests/e2e/test-plan.md

import { test, expect } from "@playwright/test";

test("enter invalid/non-numeric input and verify graceful handling", async ({
  page,
}) => {
  await page.goto("/grid");
  const agRoot = page.locator(".ag-root");
  await expect(agRoot).toBeVisible();

  const firstRow = page.locator(".ag-center-cols-container .ag-row").first();
  const hw1Cell = firstRow.locator(".ag-cell").nth(1);
  await expect(hw1Cell).toBeVisible();

  // Find a numeric cell to edit (first assignment-like cell) and enter invalid input
  const numericCell = page
    .locator('xpath=//div[@role="gridcell" and text()[normalize-space()]]')
    .filter({ hasText: /\d+/ })
    .first();
  await expect(numericCell).toBeVisible();
  await numericCell.dblclick();
  await page.keyboard.type("abc");
  await page.keyboard.press("Enter");

  // The valueParser should coerce invalid input to null -> cell shows empty (or non-numeric)
  const cellText = (await numericCell.textContent())?.trim() ?? "";
  expect(
    cellText === "" || Number(cellText).toString() === cellText
  ).toBeTruthy();

  // Footer should remain numeric (there should be at least one numeric gridcell present)
  const footerAnyNumeric = page
    .locator('xpath=//div[@role="gridcell"]')
    .filter({ hasText: /\d/ })
    .last();
  await expect(footerAnyNumeric).toBeVisible();
  const footerText = (await footerAnyNumeric.textContent())?.trim() ?? "";
  expect(Number(footerText)).not.toBeNaN();
});
