import { test, expect } from "@playwright/test";

test.describe("Employee Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/report/create");
  });

  test("should add employee with valid input", async ({ page }) => {
    // Find the employee input field
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    await expect(employeeInput).toBeVisible();

    // Add an employee with valid format
    await employeeInput.fill("John 8");

    // Find and click the add button (the button in the same form as the input)
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    await addButton.click();

    // Check if employee was added to the list
    await expect(page.locator('text="John"')).toBeVisible();

    // Input should be cleared after adding
    await expect(employeeInput).toHaveValue("");
  });

  test("should show error for invalid employee input", async ({ page }) => {
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');

    // Try invalid format (no hours)
    await employeeInput.fill("InvalidName");

    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    // Button should be disabled for invalid input
    await expect(addButton).toBeDisabled();
  });

  test("should add multiple employees", async ({ page }) => {
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    // Add first employee
    await employeeInput.fill("Alice 6");
    await addButton.click();

    // Add second employee
    await employeeInput.fill("Bob 8.5");
    await addButton.click();

    // Add third employee with decimal hours
    await employeeInput.fill("Charlie 7.25");
    await addButton.click();

    // Check all employees are visible
    await expect(page.locator('text="Alice"')).toBeVisible();
    await expect(page.locator('text="Bob"')).toBeVisible();
    await expect(page.locator('text="Charlie"')).toBeVisible();

    // Check employee count in header
    await expect(page.locator('text="3 אנשי צוות"')).toBeVisible();
  });

  test("should open employee menu modal", async ({ page }) => {
    // First add an employee
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    await employeeInput.fill("TestUser 8");
    await addButton.click();

    // Click on the employee to open menu
    const employeeButton = page.locator('text="TestUser"');
    await employeeButton.click();

    // Check if modal opened with remove option
    await expect(page.locator('text="הסר את TestUser"')).toBeVisible();
  });

  test("should toggle time display format", async ({ page }) => {
    // Add an employee first
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    await employeeInput.fill("TimeTest 8.5");
    await addButton.click();

    // Find display toggle buttons
    const numberButton = page.locator('text="מספר"');
    const timeButton = page.locator('text="שעות"');

    await expect(numberButton).toBeVisible();
    await expect(timeButton).toBeVisible();

    // Click time display
    await timeButton.click();

    // Time format should be active (has different styling)
    await expect(timeButton).toHaveClass(/bg-white/);
  });
});
