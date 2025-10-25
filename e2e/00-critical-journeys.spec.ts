import { test, expect } from "@playwright/test";
import { SynctipTestHelpers } from "./helpers";

test.describe("Critical User Journeys - Cross Browser & Mobile", () => {
  let helpers: SynctipTestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new SynctipTestHelpers(page);
    await helpers.goToReportPage();
    await helpers.waitForPageLoad();
  });

  test("Complete workflow: Create report and share", async ({
    page,
    browserName,
    isMobile,
  }) => {
    test.setTimeout(60000); // Extended timeout for complete workflow

    // Step 1: Verify page loads correctly
    await expect(helpers.elements.title).toContainText("דוח טיפים");
    await helpers.verifyHebrewText();

    // Step 2: Check initial state (buttons should be disabled)
    await expect(helpers.elements.copyButton).toBeDisabled();
    await expect(helpers.elements.whatsappButton).toBeDisabled();

    // Step 3: Add shift details
    await helpers.elements.dateInput.fill("2024-12-25");
    await helpers.elements.totalInput.fill("3000");
    await helpers.elements.tipsInput.fill("600");

    // Step 4: Add multiple employees
    await helpers.addEmployee("Manager", 10);
    await helpers.addEmployee("Waiter1", 8.5);
    await helpers.addEmployee("Waiter2", 6);

    // Step 5: Verify employees were added
    await expect(page.locator('text="Manager"')).toBeVisible();
    await expect(page.locator('text="Waiter1"')).toBeVisible();
    await expect(page.locator('text="Waiter2"')).toBeVisible();
    await expect(page.locator('text="3 אנשי צוות"')).toBeVisible();

    // Step 6: Check summary calculations
    await expect(helpers.elements.summarySection).toBeVisible();
    await expect(page.locator('text="20.0 %"')).toBeVisible(); // 600/3000 = 20%

    // Step 7: Verify buttons are now enabled
    await expect(helpers.elements.copyButton).toBeEnabled();
    await expect(helpers.elements.whatsappButton).toBeEnabled();

    // Step 8: Test copy functionality (browser-specific)
    if (browserName === "chromium") {
      await page
        .context()
        .grantPermissions(["clipboard-write", "clipboard-read"]);
    }

    await helpers.elements.copyButton.click();
    await expect(helpers.elements.copySuccessText).toBeVisible();

    // Step 9: Test responsive behavior
    const viewportInfo = await helpers.getViewportInfo();
    console.log(
      `Running on ${browserName} - ${isMobile ? "Mobile" : "Desktop"} - ${viewportInfo.width}x${viewportInfo.height}`,
    );

    if (isMobile) {
      // On mobile, ensure buttons are still functional
      await expect(helpers.elements.copyButton).toBeVisible();
      await expect(helpers.elements.whatsappButton).toBeVisible();
    }

    // Step 10: Test WhatsApp share (verify button is clickable)
    await helpers.elements.whatsappButton.click();
    // Note: WhatsApp sharing redirects immediately, no loading spinner needed
  });

  test("Mobile-specific interactions", async ({ isMobile }) => {
    test.skip(!isMobile, "This test is for mobile devices only");

    await helpers.setupBasicShift();

    // Test touch interactions
    const copyButton = helpers.elements.copyButton;
    await copyButton.tap();
    await expect(helpers.elements.copySuccessText).toBeVisible();

    // Test mobile viewport behavior
    const viewportInfo = await helpers.getViewportInfo();
    expect(viewportInfo.isMobile).toBeTruthy();
    expect(viewportInfo.width).toBeLessThan(768);
  });

  test("Cross-browser compatibility check", async ({ page, browserName }) => {
    await helpers.setupBasicShift();

    // Test basic functionality works across browsers
    const testElements = [
      helpers.elements.navbar,
      helpers.elements.title,
      helpers.elements.copyButton,
      helpers.elements.whatsappButton,
      helpers.elements.summarySection,
    ];

    for (const element of testElements) {
      await expect(element).toBeVisible();
    }

    // Browser-specific behavior
    switch (browserName) {
      case "chromium":
        await page.context().grantPermissions(["clipboard-write"]);
        break;
      case "firefox":
        // Firefox might have different clipboard behavior
        break;
      case "webkit":
        // Safari-specific handling
        break;
    }

    await helpers.elements.copyButton.click();
    await expect(helpers.elements.copySuccessText).toBeVisible();

    console.log(`✅ ${browserName} compatibility confirmed`);
  });

  test("Performance and loading test", async ({ page }) => {
    const startTime = Date.now();

    // Navigate and wait for full load
    await page.goto("/report/create");
    await helpers.waitForPageLoad();

    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);

    // Verify critical elements load quickly
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds

    // Test rapid interactions
    await helpers.setupBasicShift();

    const interactionStart = Date.now();
    await helpers.addEmployee("FastTest", 8);
    const interactionTime = Date.now() - interactionStart;

    console.log(`Employee addition time: ${interactionTime}ms`);
    expect(interactionTime).toBeLessThan(2000); // Should respond within 2 seconds
  });
});
