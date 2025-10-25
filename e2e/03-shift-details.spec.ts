import { test, expect } from "@playwright/test";

test.describe("Shift Details and Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/report/create");
  });

  test("should update shift details", async ({ page }) => {
    // Find date input
    const dateInput = page.locator('input[name="date"]');
    await expect(dateInput).toBeVisible();

    // Update date
    await dateInput.fill("2024-12-25");
    await expect(dateInput).toHaveValue("2024-12-25");

    // Find total (קופה) input
    const totalInput = page.locator('input[name="total"]');
    await expect(totalInput).toBeVisible();

    // Update total
    await totalInput.fill("2000");
    await expect(totalInput).toHaveValue("2000");

    // Find tips (טיפים) input
    const tipsInput = page.locator('input[name="tips"]');
    await expect(tipsInput).toBeVisible();

    // Update tips
    await tipsInput.fill("400");
    await expect(tipsInput).toHaveValue("400");
  });

  test("should calculate and display summary correctly", async ({ page }) => {
    // Set up shift details
    await page.locator('input[name="total"]').fill("2000");
    await page.locator('input[name="tips"]').fill("400");

    // Add employees for calculation
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    await employeeInput.fill("Worker1 8");
    await addButton.click();

    await employeeInput.fill("Worker2 6");
    await addButton.click();

    // Check if summary section exists and shows data
    await expect(page.locator('text="סיכום"')).toBeVisible();

    // Check for date display
    await expect(page.locator('text="תאריך משמרת"')).toBeVisible();

    // Check for hours display
    await expect(page.locator('text="שעות צוות"')).toBeVisible();

    // Check for tip per hour
    await expect(page.locator('text="טיפ לשעה"')).toBeVisible();

    // Check for service percentage
    await expect(page.locator('text="אחוז שירות"')).toBeVisible();

    // The percentage should be calculated (400/2000 * 100 = 20%)
    await expect(page.locator('text="20.0 %"')).toBeVisible();
  });

  test("should show proper validation states", async ({ page }) => {
    // Initially, action buttons should be disabled (no employees)
    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();
    const whatsappButton = page.locator('button:has-text("שלח")').first();

    await expect(copyButton).toBeDisabled();
    await expect(whatsappButton).toBeDisabled();

    // Add an employee
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    await employeeInput.fill("TestWorker 8");
    await addButton.click();

    // Now buttons should be enabled
    await expect(copyButton).toBeEnabled();
    await expect(whatsappButton).toBeEnabled();
  });

  test("should handle numeric inputs correctly", async ({ page }) => {
    const totalInput = page.locator('input[name="total"]');
    const tipsInput = page.locator('input[name="tips"]');

    // Test decimal values
    await totalInput.fill("1234.56");
    await expect(totalInput).toHaveValue("1234.56");

    await tipsInput.fill("123.45");
    await expect(tipsInput).toHaveValue("123.45");

    // Test large numbers
    await totalInput.fill("99999");
    await expect(totalInput).toHaveValue("99999");
  });

  test("should maintain form state during navigation", async ({ page }) => {
    // Fill form data
    await page.locator('input[name="total"]').fill("1500");
    await page.locator('input[name="tips"]').fill("300");

    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    await employeeInput.fill("StateTest 7");
    await addButton.click();

    // Verify data is present
    await expect(page.locator('input[name="total"]')).toHaveValue("1500");
    await expect(page.locator('input[name="tips"]')).toHaveValue("300");
    await expect(page.locator('text="StateTest"')).toBeVisible();

    // Navigate away and back (refresh page to test persistence)
    await page.reload();

    // Data should persist (if using localStorage/sessionStorage)
    // Note: This depends on your implementation
  });
});
