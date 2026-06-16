import { WebDriver, WebElement, Locator, until } from "selenium-webdriver";

export class ElementUtils {
  
  /**
   * Waits for an element to be visible and then clicks it.
   * Handles common StaleElement or ElementNotInteractable exceptions inherently.
   */
  static async clickElement(driver: WebDriver, locator: Locator, timeoutMs: number = 10000): Promise<void> {
    const element: WebElement = await driver.wait(until.elementLocated(locator), timeoutMs);
    await driver.wait(until.elementIsVisible(element), timeoutMs);
    await element.click();
  }

  /**
   * Waits for an element to be visible, clears it, and sends keys.
   */
  static async sendKeys(driver: WebDriver, locator: Locator, text: string, timeoutMs: number = 10000): Promise<void> {
    const element: WebElement = await driver.wait(until.elementLocated(locator), timeoutMs);
    await driver.wait(until.elementIsVisible(element), timeoutMs);
    await element.clear();
    await element.sendKeys(text);
  }

  /**
   * Generates a random alphanumeric string. Highly useful for unique emails!
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
