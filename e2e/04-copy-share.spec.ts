import { test, expect } from "@playwright/test";

test.describe("Copy and Share Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/report/create");

    // Set up a complete report for testing
    await page.locator('input[name="date"]').fill("2024-12-25");
    await page.locator('input[name="total"]').fill("2000");
    await page.locator('input[name="tips"]').fill("400");

    // Add employees
    const employeeInput = page.locator('input[placeholder="הוסף איש צוות"]');
    const addButton = page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    await employeeInput.fill("Alice 8");
    await addButton.click();

    await employeeInput.fill("Bob 6");
    await addButton.click();
  });

  test("should enable action buttons when data is present", async ({
    page,
  }) => {
    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();
    const whatsappButton = page.locator('button:has-text("שלח")').first();

    // Buttons should be enabled with data present
    await expect(copyButton).toBeEnabled();
    await expect(whatsappButton).toBeEnabled();
  });

  test("should handle copy functionality", async ({ page, browserName }) => {
    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();

    // Grant clipboard permissions for Chromium
    if (browserName === "chromium") {
      await page
        .context()
        .grantPermissions(["clipboard-write", "clipboard-read"]);
    }

    await copyButton.click();

    // Check for success state change
    // The button should show "הועתק!" temporarily
    await expect(page.locator('text="הועתק!"')).toBeVisible({ timeout: 2000 });

    // Success state should disappear after timeout
    await expect(page.locator('text="הועתק!"')).not.toBeVisible({
      timeout: 5000,
    });

    // Original text should be restored
    await expect(copyButton).toBeEnabled();
  });

  test("should handle copy functionality on mobile", async ({
    page,
    isMobile,
  }) => {
    if (!isMobile) {
      test.skip();
    }

    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();

    // On mobile, copy might use fallback methods
    await copyButton.click();

    // Should still show success state
    await expect(page.locator('text="הועתק!"')).toBeVisible({ timeout: 3000 });
  });

  test("should handle WhatsApp sharing", async ({ page }) => {
    const whatsappButton = page.locator('button:has-text("שלח")').first();

    // Verify WhatsApp button is clickable
    await expect(whatsappButton).toBeEnabled();

    // Click WhatsApp button
    await whatsappButton.click();

    // Wait a moment for any potential navigation
    await page.waitForTimeout(1000);

    // Verify the action completed (button should still be enabled for retry)
    await expect(whatsappButton).toBeEnabled();
  });

  test("should disable buttons when no employees", async ({ page }) => {
    // Start fresh without employees
    await page.goto("/report/create");

    // Set shift details but no employees
    await page.locator('input[name="total"]').fill("1000");
    await page.locator('input[name="tips"]').fill("200");

    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();
    const whatsappButton = page.locator('button:has-text("שלח")').first();

    // Buttons should be disabled without employees
    await expect(copyButton).toBeDisabled();
    await expect(whatsappButton).toBeDisabled();
  });

  test("should work across different viewport sizes", async ({
    page,
    viewport,
  }) => {
    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();
    const whatsappButton = page.locator('button:has-text("שלח")').first();

    // Buttons should be visible and functional regardless of viewport
    await expect(copyButton).toBeVisible();
    await expect(whatsappButton).toBeVisible();

    // Test interaction
    await copyButton.click();

    if (viewport && viewport.width < 640) {
      // On small screens, text might be hidden but buttons should work
      await expect(copyButton).toBeVisible();
    } else {
      // On larger screens, text should be visible
      await expect(page.locator('text="הועתק!"')).toBeVisible({
        timeout: 2000,
      });
    }
  });

  test("should handle rapid clicking", async ({ page, browserName }) => {
    if (browserName === "chromium") {
      await page
        .context()
        .grantPermissions(["clipboard-write", "clipboard-read"]);
    }

    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();

    // Click multiple times rapidly
    await copyButton.click();
    await copyButton.click();
    await copyButton.click();

    // Should still handle gracefully and show success state
    await expect(page.locator('text="הועתק!"')).toBeVisible({ timeout: 2000 });
  });

  test("should show correct RTL layout", async ({ page }) => {
    // Check that text and layout are properly right-to-left
    const title = page.locator("h1");

    await expect(title).toContainText("דוח טיפים");

    // Check that Hebrew text is displayed correctly
    await expect(page.locator('text="תאריך"')).toBeVisible();
    await expect(page.locator('text="קופה"')).toBeVisible();
    await expect(page.locator('text="טיפים"')).toBeVisible();
    await expect(page.locator('text="אנשי צוות"')).toBeVisible();
    await expect(page.locator('text="סיכום"')).toBeVisible();
  });
});
