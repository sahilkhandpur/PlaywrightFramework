import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage: Foundation for all Page Object Models
 * Provides common methods for navigation, interactions, waits, and assertions
 * All page objects should extend this class
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  /**
   * Navigate to a URL
   * @param path - Full URL or relative path
   */
  async goto(path: string = '') {
    await this.page.goto(path);
  }

  /**
   * Get current page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForUrl(urlOrPattern: string | RegExp) {
    await this.page.waitForURL(urlOrPattern);
  }

  // ─── Interactions ──────────────────────────────────────────────────────────

  /**
   * Click on an element
   */
  async click(locator: Locator, options?: { force?: boolean; timeout?: number }) {
    await locator.click(options);
  }

  /**
   * Fill input field with text
   */
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  /**
   * Clear field and fill with new value
   */
  async clearAndFill(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Type text character by character
   */
  async typeText(locator: Locator, text: string, delayMs: number = 50) {
    await locator.type(text, { delay: delayMs });
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string | string[]) {
    await locator.selectOption(value);
  }

  /**
   * Check checkbox
   */
  async check(locator: Locator) {
    await locator.check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheck(locator: Locator) {
    await locator.uncheck();
  }

  /**
   * Hover over element
   */
  async hover(locator: Locator) {
    await locator.hover();
  }

  /**
   * Press key(s)
   */
  async press(locator: Locator, key: string) {
    await locator.press(key);
  }

  // ─── Waits ─────────────────────────────────────────────────────────────────

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout: number = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(locator: Locator, timeout: number = 30000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for DOM to be loaded
   */
  async waitForDomContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  /**
   * Assert element is visible
   */
  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  async assertHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  /**
   * Assert element text equals value
   */
  async assertText(locator: Locator, text: string | RegExp) {
    await expect(locator).toHaveText(text);
  }

  /**
   * Assert element contains text
   */
  async assertContainsText(locator: Locator, text: string | RegExp) {
    await expect(locator).toContainText(text);
  }

  /**
   * Assert input value
   */
  async assertValue(locator: Locator, value: string) {
    await expect(locator).toHaveValue(value);
  }

  /**
   * Assert element is enabled
   */
  async assertEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert element is disabled
   */
  async assertDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  /**
   * Assert checkbox is checked
   */
  async assertChecked(locator: Locator) {
    await expect(locator).toBeChecked();
  }

  /**
   * Assert page title
   */
  async assertTitle(titleOrPattern: string | RegExp) {
    await expect(this.page).toHaveTitle(titleOrPattern);
  }

  /**
   * Assert page URL
   */
  async assertUrl(urlOrPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlOrPattern);
  }

  // ─── Utilities ─────────────────────────────────────────────────────────────

  /**
   * Get element text content
   */
  async getText(locator: Locator): Promise<string | null> {
    return locator.textContent();
  }

  /**
   * Get element attribute value
   */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    try {
      return await locator.isEnabled();
    } catch {
      return false;
    }
  }

  /**
   * Check if element is checked
   */
  async isChecked(locator: Locator): Promise<boolean> {
    try {
      return await locator.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: Locator) {
    try {
      await locator.scrollIntoViewIfNeeded();
    } catch {
      // Ignore scroll errors
    }
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName: string) {
    const path = `test-results/screenshots/${fileName}-${Date.now()}.png`;
    await this.page.screenshot({ path, fullPage: true });
  }
}
