import { WebDriver, By, until } from "selenium-webdriver";
import { AdvancedDriverFactory } from "./utils/advancedDriverFactory";
import { ConfigManager } from "./utils/ConfigManager";
import { ElementUtils } from "./utils/ElementUtils";

describe("Phase 4 - Configuration Management", () => {
  let driver: WebDriver;
  let baseUrl: string;
  let adminUser: string;

  beforeAll(async () => {
    // 1. Load variables securely from ConfigManager
    baseUrl = ConfigManager.get("BASE_URL");
    adminUser = ConfigManager.get("ADMIN_USERNAME");

    driver = await AdvancedDriverFactory.getDriver();
  });

  afterAll(async () => {
    if (driver) { await driver.quit(); }
  });

  it("Should load URLs and Credentials dynamically from .env files", async () => {
    // 2. Navigate to dynamic URL instead of hardcoding
    await driver.get(baseUrl);

    const nameLocator = By.css("[data-testid='first-name']");
    const emailLocator = By.css("[data-testid='email']");
    const submitBtnLocator = By.css("[data-testid='submit-btn']");
    
    // 3. Inject dynamic credentials
    await ElementUtils.sendKeys(driver, nameLocator, adminUser);
    await ElementUtils.sendKeys(driver, emailLocator, "admin@mycodeyatra.com");
    await ElementUtils.clickElement(driver, submitBtnLocator);

    const msg = await driver.wait(until.elementLocated(By.css("[data-testid='result-message']")), 5000);
    expect(await msg.getText()).toContain("Form submitted successfully");
    console.log(`Successfully executed test as ${adminUser} on environment: ${process.env.ENV_NAME || 'QA'}`);
  });
});
