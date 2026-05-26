import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  async goto(path: string = '') {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForUrl(urlOrPattern: string | RegExp) {
    await this.page.waitForURL(urlOrPattern);
  }

  // ─── Interactions ──────────────────────────────────────────────────────────

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async check(locator: Locator) {
    await locator.check();
  }

  async uncheck(locator: Locator) {
    await locator.uncheck();
  }

  async hover(locator: Locator) {
    await locator.hover();
  }

  async clearAndFill(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
  }

  // ─── Waits ─────────────────────────────────────────────────────────────────

  async waitForVisible(locator: Locator, timeout?: number) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator: Locator, timeout?: number) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForDomContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async assertHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async assertText(locator: Locator, text: string | RegExp) {
    await expect(locator).toHaveText(text);
  }

  async assertContainsText(locator: Locator, text: string | RegExp) {
    await expect(locator).toContainText(text);
  }

  async assertValue(locator: Locator, value: string) {
    await expect(locator).toHaveValue(value);
  }

  async assertEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  async assertDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  async assertChecked(locator: Locator) {
    await expect(locator).toBeChecked();
  }

  async assertTitle(titleOrPattern: string | RegExp) {
    await expect(this.page).toHaveTitle(titleOrPattern);
  }

  async assertUrl(urlOrPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlOrPattern);
  }

  // ─── Utilities ─────────────────────────────────────────────────────────────

  async getText(locator: Locator): Promise<string | null> {
    return locator.textContent();
  }

  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  async isChecked(locator: Locator): Promise<boolean> {
    return locator.isChecked();
  }

  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }
}
