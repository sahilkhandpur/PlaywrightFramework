import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page
  readonly Heading: Locator
  readonly usernameInputField: Locator
  readonly passwordInputField: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.Heading = page.getByRole('heading', { name: 'Swag Labs' });
    this.usernameInputField = page.locator('[data-test="username"]');
    this.passwordInputField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async LaunchPage(url: string) {
    await this.page.goto(url);
  }

  async Login(userName: string, passWord: string): Promise<this> {
    await this.usernameInputField.fill(userName);
    await this.passwordInputField.fill(passWord);
    await this.loginButton.click();
    return this;
  }


}
