import { WebDriver, By, until } from "selenium-webdriver";

export class FormsPage {
  private driver: WebDriver;
  
  // Locators
  private readonly url = "https://practice.mycodeyatra.com/#/form-practice";
  private readonly firstNameInput = By.css("[data-testid='first-name']");
  private readonly lastNameInput = By.css("[data-testid='last-name']");
  private readonly emailInput = By.css("[data-testid='email']");
  private readonly mobileInput = By.css("[data-testid='mobile']");
  private readonly submitBtn = By.css("[data-testid='submit-btn']");
  private readonly resultMsg = By.css("[data-testid='result-message']");

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  // Actions
  async navigate() {
    await this.driver.get(this.url);
  }

  async enterFirstName(name: string) {
    const el = await this.driver.wait(until.elementLocated(this.firstNameInput), 5000);
    await el.clear();
    await el.sendKeys(name);
  }

  async enterLastName(name: string) {
    const el = await this.driver.findElement(this.lastNameInput);
    await el.clear();
    await el.sendKeys(name);
  }

  async enterEmail(email: string) {
    const el = await this.driver.findElement(this.emailInput);
    await el.clear();
    await el.sendKeys(email);
  }

  async enterMobile(mobile: string) {
    const el = await this.driver.findElement(this.mobileInput);
    await el.clear();
    await el.sendKeys(mobile);
  }

  async submitForm() {
    const el = await this.driver.findElement(this.submitBtn);
    await el.click();
  }

  async getResultMessage(): Promise<string> {
    const el = await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.resultMsg)), 5000);
    return await el.getText();
  }
}
