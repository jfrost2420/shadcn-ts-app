# Test Plan — shadcn-ts-app (Dashboard / Grid)

## Executive summary

This document describes a focused end-to-end test plan for the Dashboard area of the shadcn-ts-app. It covers basic operations and critical user flows for the top-level layout (sidebar, breadcrumb, team switcher, nav items) and the Dashboard Grid page (editable grade table implemented with ag-grid).

Primary goals:

- Verify navigation and layout (sidebar, team switcher, nav menus, user menu).
- Verify the Grid renders correctly, supports cell editing, and recomputes averages.
- Validate error/edge cases for cell input and refresh/persistence behavior.

Key code references:

- Routes: `src/routes.tsx` (/, /test, /grid)
- Dashboard wrapper page: `src/app/dashboard/page.tsx` (Sidebar + header + Outlet)
- Sidebar: `src/components/app-sidebar.tsx` (TeamSwitcher, NavMain, NavProjects, NavUser)
- Grid: `src/app/dashboard/grid.tsx` (ag-grid configuration, editable numeric columns, pinned bottom averages)

Assumption (starting state): tests run from a blank/fresh state. Browser storage and app state start empty. The app is launched locally before running tests.

Test environment & run commands

- Node / npm available (project uses Vite). Repository root: `shadcn-ts-app`.
- Start dev server (default Vite):

```bash
npm run dev
```

- Run Playwright e2e tests (project's script):

```bash
npm run test:e2e
```

If using Playwright locally, ensure browsers are installed (follow Playwright install steps).

Success criteria for this plan: every scenario's expected outcome matches the observed behavior when run in the given environment. Failures described per scenario must be reproducible and include console/log output where possible.

## General test guidance / assumptions

- Tests assume a fresh browser profile for each scenario unless the scenario explicitly states persistence checks.
- Target base URL for manual steps: `http://localhost:5173/` (Vite default). If different, substitute accordingly.
- Use medium/desktop viewport unless testing responsive behavior.
- Where numeric thresholds (timings) are suggested, treat them as guidance and adjust for CI capacity.

---

## Scenarios

Each scenario includes: Title, Assumptions (starting state), Steps (numbered), Expected results, Success criteria, Failure conditions.

### 1. Load Dashboard (root) — verify layout and navigation elements

Assumptions:

- App is running at base URL.
- Browser fresh state.

Steps:

1. Open `/` (root).
2. Verify the sidebar is visible (left area) and contains TeamSwitcher, top navigation, and user area.
3. Verify header contains the Sidebar toggle (SidebarTrigger) and breadcrumb.
4. Inspect the breadcrumb text; confirm at least one crumb is present and text matches the breadcrumb in `page.tsx` (contains "Building Your Application" or "Data Fetching").
5. Click the sidebar collapse/expand trigger (SidebarTrigger) to collapse the sidebar; then expand it again.
6. Open the TeamSwitcher control, switch to a different team.
7. Open the user menu (NavUser) in the sidebar footer.

Expected results:

- Sidebar, TeamSwitcher, NavMain, NavProjects, and NavUser render without JS errors.
- Breadcrumb is present and contains the expected labels.
- Sidebar collapses and expands on toggle.
- TeamSwitcher lists teams and allows selection; selecting a team updates the visible team label in the sidebar header.
- User menu opens and shows user details/options.

Success criteria:

- All UI elements are present and interactive.
- No uncaught exceptions in dev console.

Failure conditions:

- Sidebar not visible or toggle does not respond.
- TeamSwitcher or user menu do not open or throw errors.

---

### 2. Navigation to Dashboard Grid page (/grid)

Assumptions:

- Start from fresh root page.

Steps:

1. From `/`, use application navigation (either sidebar link or direct URL) to go to `/grid`.
2. Confirm the URL updates to `/grid` and the grid area is visible.
3. Confirm header/breadcrumb still present above the grid.

Expected results:

- Grid page loads without error and displays an ag-grid instance.
- Header/breadcrumb remain intact.

Success criteria:

- Grid element exists in DOM and contains rows and columns (see next scenarios for detailed checks).

Failure conditions:

- Navigation does not update URL or shows blank content.
- Grid fails to render (console errors, stack traces).

---

### 3. Grid basic render sanity check (happy path)

Assumptions:

- You are on `/grid`.
- Grid component uses default random data generation on load.

Steps:

1. Observe the grid: confirm student rows appear (expected ~20 students based on hard-coded list).
2. Count the assignment columns: there should be 15 assignment columns (HW1..HW6, Quiz1..Quiz5, Test1..Test3, Project1) plus `Student` (pinned left) and `Average` (pinned right).
3. Confirm a pinned bottom row exists with label `Assignment Avg` and contains numeric values for assignments.

Expected results:

- Rows: ~20 student rows (as defined in `STUDENT_NAMES`).
- Columns: student name column + 15 assignment columns + Average column.
- Pinned footer row exists and shows non-empty numeric averages for assignment columns.

Success criteria:

- Column count and pinned footer match expectations.

Failure conditions:

- Column count significantly differs, missing pinned footer, or grid throws rendering errors.

---

### 4. Edit a cell with a valid numeric value -> recompute averages

Assumptions:

- On `/grid` and grid loaded with data.
- Use a cell under a numeric assignment column for the first student.

Steps:

1. Double-click or enter edit mode on a numeric cell (e.g., row 1, column HW1).
2. Type `85` and commit the edit (Enter or blur the cell per ag-grid behavior).
3. Observe the updated cell value.
4. Observe the pinned bottom row's value for the same assignment column and the student's average column (Average) update accordingly.

Expected results:

- Cell updates to `85` (valueFormatter shows integer strings).
- Pinned bottom average for the assignment re-calculates to reflect the new value.
- Student `Average` column (pinned right) recalculates and displays the new averaged number.

Success criteria:

- Numeric edits persist in the grid state while page is open and recalculations are performed immediately.

Failure conditions:

- Edit not applied, grid throws error, or averages do not change.

---

### 5. Edit a cell with invalid/non-numeric input (edge case)

Assumptions:

- On `/grid` and grid loaded.

Steps:

1. Edit a numeric cell and enter `abc` (non-numeric), commit.
2. Observe cell and pinned footer.
3. Also test entering empty string and committing.

Expected results:

- Non-numeric input is parsed to `null` (grid shows empty cell), per `valueParser` logic.
- Pinned footer and student averages exclude non-numeric (treated as missing), and recalculated averages reflect omission.
- No uncaught exceptions thrown in console.

Success criteria:

- Application gracefully handles invalid input by leaving the cell empty and not crashing.

Failure conditions:

- Application crashes, shows `NaN` or unexpected text in averages, or throws errors.

---

### 6. Bulk edits and footer aggregate accuracy

Assumptions:

- On `/grid`.

Steps:

1. Edit several cells across multiple rows for the same assignment column (e.g., set HW2 for 5 students to known values: 70, 80, 90, 100, 60).
2. Confirm pinned bottom row value for that assignment equals the average of the numeric values you supplied (rounded to one decimal per implementation).
3. Confirm the global `avg` in footer (overall average) updates appropriately.

Expected results:

- Footer numeric averages equal computed averages (one decimal point precision observed in code via .toFixed(1)).

Success criteria:

- Numeric agreement between manual calculation and footer values.

Failure conditions:

- Footer averages mismatch significantly or show wrong precision/format.

---

### 7. Persistence check (page refresh resets random data)

Assumptions:

- On `/grid` and initial grid loaded.

Steps:

1. Note the value of a particular cell (or set to a distinctive value as in scenario 4).
2. Refresh the browser (full page reload).
3. Observe the same cell after reload.

Expected results:

- The grid uses in-memory React state and `makeRows()` on initial render; refreshing the page restores newly generated random values (i.e., edits will be lost on refresh).

Success criteria:

- Edits do not persist across page reload, confirming non-persistent in-memory behavior.

Failure conditions:

- Edits unexpectedly persist (indicates persistence was added) or page crashes on reload.

---

### 8. Responsive behavior (small screen) checks

Assumptions:

- Start with desktop viewport.

Steps:

1. Resize viewport to a narrow mobile width (e.g., 375x812).
2. Observe sidebar behavior: collapsed by default or accessible via toggle.
3. Confirm breadcrumb items that are expected to be hidden on small screens are not visible (the code uses `hidden md:block` for some breadcrumb items).

Expected results:

- Breadcrumb items that are `md:block` are hidden below the md breakpoint.
- Sidebar remains accessible; layout does not overlap content in a damaging way.

Success criteria:

- UI adapts per CSS responsive rules and remains usable.

Failure conditions:

- Broken layout, overlapping content, or inaccessible menus.

---

### 9. Console / error monitoring and stability

Assumptions:

- Run any of the above scenarios.

Steps:

1. During UI interactions above, monitor browser console for uncaught exceptions, React warnings, or ag-grid errors.
2. Capture any stack traces for reproducible failures.

Expected results:

- No uncaught exceptions or unhandled promise rejections during normal interactions.

Success criteria:

- Clean console for normal interactions.

Failure conditions:

- Console contains errors tied to the UI flows described above.

---

## Test data and edge cases to consider

- Empty cell values, non-numeric input, extremely large numbers, negative numbers.
- Editing the pinned footer (should be read-only; ensure UI does not allow editing footer or that edits are ignored).
- Rapid edits across many rows to observe state update performance.

## Test artefacts & reporting

- For any failing test: capture a Playwright trace and screenshot, record console logs and network failures.
- Recommended Playwright artifacts: screenshot, trace, and test output (use `--debug` or `--headed` for debugging).

## Next steps / automation suggestions

- Implement Playwright tests for the following scenarios first (priority order):
  1. Load Dashboard and verify sidebar (Scenario 1)
  2. Navigation to `/grid` and grid render (Scenarios 2 & 3)
  3. Cell edit valid numeric and average recompute (Scenario 4)
  4. Invalid input handling (Scenario 5)
- Add helper utilities in tests to compute expected averages programmatically so assertions are robust.
- Add CI job to run `npm run test:e2e` and upload Playwright artifacts on failure.

---

## Appendix — quick checklist for testers

- [ ] Start server: `npm run dev`
- [ ] Open `http://localhost:5173/`
- [ ] Run manual checks or run automated Playwright tests: `npm run test:e2e`
- [ ] Capture logs and artifacts on failure

---

End of test plan.
