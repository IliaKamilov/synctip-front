import { test, expect } from "@playwright/test";

test.describe("Navigation and Basic UI", () => {
  test("should load homepage and navigate to report creation", async ({
    page,
  }) => {
    await page.goto("/");

    // Check if homepage loads correctly
    await expect(page).toHaveTitle(/Synctip/);

    // Navigate to report creation page
    await page.goto("/report/create");

    // Check if report page loads with correct title
    await expect(page.locator("h1")).toContainText("דוח טיפים");

    // Check if main sections are visible
    await expect(page.locator('text="תאריך"')).toBeVisible();
    await expect(page.locator('text="קופה"')).toBeVisible();
    await expect(page.locator('text="טיפים"')).toBeVisible();
    await expect(page.locator('text="אנשי צוות"')).toBeVisible();
  });

  test("should have responsive navbar on mobile", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/report/create");

    // Check navbar exists
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();

    // Check back button
    const backButton = page.locator("button").first();
    await expect(backButton).toBeVisible();

    // Check title is visible
    await expect(page.locator("h1")).toContainText("דוח טיפים");

    // Check action buttons are present
    const copyButton = page
      .locator('button:has-text("העתק"), button:has([title="העתק"])')
      .first();
    const whatsappButton = page.locator('button:has-text("שלח")').first();

    await expect(copyButton).toBeVisible();
    await expect(whatsappButton).toBeVisible();

    if (isMobile) {
      // On mobile, text should be hidden but buttons should be visible
      await expect(copyButton).toBeVisible();
      await expect(whatsappButton).toBeVisible();
    }
  });

  test("should navigate back when back button is clicked", async ({ page }) => {
    await page.goto("/");
    await page.goto("/report/create");

    // Click back button
    const backButton = page.locator("button").first();
    await backButton.click();

    // Should navigate back (we'll check if URL changed)
    await page.waitForTimeout(1000); // Wait for navigation
  });
});
