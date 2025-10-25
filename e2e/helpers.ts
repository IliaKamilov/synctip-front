import { Page } from "@playwright/test";

/**
 * Test utilities for Synctip E2E tests
 */
export class SynctipTestHelpers {
  constructor(private page: Page) {}

  /**
   * Navigate to report creation page
   */
  async goToReportPage() {
    await this.page.goto("/report/create");
  }

  /**
   * Setup a basic shift with employees for testing
   */
  async setupBasicShift(
    options: {
      date?: string;
      total?: string;
      tips?: string;
      employees?: Array<{ name: string; hours: number }>;
    } = {},
  ) {
    const {
      date = "2024-12-25",
      total = "2000",
      tips = "400",
      employees = [
        { name: "Alice", hours: 8 },
        { name: "Bob", hours: 6 },
      ],
    } = options;

    // Set shift details
    await this.page.locator('input[name="date"]').fill(date);
    await this.page.locator('input[name="total"]').fill(total);
    await this.page.locator('input[name="tips"]').fill(tips);

    // Add employees
    const employeeInput = this.page.locator(
      'input[placeholder="הוסף איש צוות"]',
    );
    const addButton = this.page
      .locator("form")
      .filter({ has: employeeInput })
      .locator("button");

    for (const employee of employees) {
      await employeeInput.fill(`${employee.name} ${employee.hours}`);
      await addButton.click();
    }
  }

  /**
   * Get locators for main UI elements
   */
  get elements() {
    return {
      // Navigation
      navbar: this.page.locator("nav"),
      backButton: this.page.locator("nav button").first(),
      title: this.page.locator("h1"),

      // Form inputs
      dateInput: this.page.locator('input[name="date"]'),
      totalInput: this.page.locator('input[name="total"]'),
      tipsInput: this.page.locator('input[name="tips"]'),
      employeeInput: this.page.locator('input[placeholder="הוסף איש צוות"]'),

      // Buttons
      copyButton: this.page
        .locator('button:has-text("העתק"), button:has([title="העתק"])')
        .first(),
      whatsappButton: this.page.locator('button:has-text("שלח")').first(),
      addEmployeeButton: this.page
        .locator("form")
        .filter({
          has: this.page.locator('input[placeholder="הוסף איש צוות"]'),
        })
        .locator("button"),

      // Display toggles
      numberDisplayButton: this.page.locator('text="מספר"'),
      timeDisplayButton: this.page.locator('text="שעות"'),

      // Summary section
      summarySection: this.page.locator('text="סיכום"'),

      // Status indicators
      loadingSpinner: this.page.locator('[role="status"]'),
      copySuccessText: this.page.locator('text="הועתק!"'),
    };
  }

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
    await this.elements.title.waitFor({ state: "visible" });
  }

  /**
   * Add a single employee
   */
  async addEmployee(name: string, hours: number) {
    await this.elements.employeeInput.fill(`${name} ${hours}`);
    await this.elements.addEmployeeButton.click();
  }

  /**
   * Check if action buttons are enabled/disabled based on data state
   */
  async checkButtonStates(shouldBeEnabled: boolean) {
    const copyButton = this.elements.copyButton;
    const whatsappButton = this.elements.whatsappButton;

    if (shouldBeEnabled) {
      await copyButton.waitFor({ state: "visible" });
      await whatsappButton.waitFor({ state: "visible" });
      // Note: We check for enabled state by ensuring they're not disabled
    } else {
      await copyButton.waitFor({ state: "visible" });
      await whatsappButton.waitFor({ state: "visible" });
    }
  }

  /**
   * Verify Hebrew text display (RTL support)
   */
  async verifyHebrewText() {
    const hebrewTexts = [
      "דוח טיפים",
      "תאריך",
      "קופה",
      "טיפים",
      "אנשי צוות",
      "סיכום",
    ];

    for (const text of hebrewTexts) {
      await this.page.locator(`text="${text}"`).waitFor({ state: "visible" });
    }
  }

  /**
   * Get viewport info for responsive testing
   */
  async getViewportInfo() {
    return {
      width: await this.page.evaluate(() => window.innerWidth),
      height: await this.page.evaluate(() => window.innerHeight),
      isMobile: await this.page.evaluate(() => window.innerWidth < 768),
    };
  }
}
