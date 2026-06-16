import { WebDriver, By, until } from "selenium-webdriver";
import { AdvancedDriverFactory } from "./utils/advancedDriverFactory";
import { ElementUtils } from "./utils/ElementUtils";

describe("Phase 4 - Utility Framework", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await AdvancedDriverFactory.getDriver();
  });

  afterAll(async () => {
    if (driver) { await driver.quit(); }
  });

  it("Should interact with the UI using robust wrapper utilities", async () => {
    await driver.get("https://practice.mycodeyatra.com/#/form-practice");

    // 1. Using our Random String generator
    const randomEmail = `test_${ElementUtils.generateRandomString(5)}@utility.com`;
    console.log(`Generated dynamic email: ${randomEmail}`);

    // 2. Using our robust SendKeys wrapper (automatically waits & clears!)
    const nameLocator = By.css("[data-testid='first-name']");
    const emailLocator = By.css("[data-testid='email']");
    
    await ElementUtils.sendKeys(driver, nameLocator, "Utility User");
    await ElementUtils.sendKeys(driver, emailLocator, randomEmail);

    // 3. Using our robust Click wrapper
    const submitBtnLocator = By.css("[data-testid='submit-btn']");
    await ElementUtils.clickElement(driver, submitBtnLocator);

    // Assert
    const msg = await driver.wait(until.elementLocated(By.css("[data-testid='result-message']")), 5000);
    expect(await msg.getText()).toContain("Form submitted successfully");
    console.log("Utility framework test passed!");
  });
});
