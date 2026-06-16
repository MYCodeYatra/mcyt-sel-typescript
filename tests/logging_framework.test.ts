import { WebDriver, By, until } from "selenium-webdriver";
import { AdvancedDriverFactory } from "./utils/advancedDriverFactory";
import { Logger } from "./utils/Logger";

describe("Phase 4 - Logging Framework", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    Logger.info("Initializing WebDriver...");
    driver = await AdvancedDriverFactory.getDriver();
  });

  afterAll(async () => {
    if (driver) {
      Logger.info("Quitting WebDriver...");
      await driver.quit();
    }
  });

  it("Should log test execution steps using Winston", async () => {
    Logger.info("Navigating to Practice Site...");
    await driver.get("https://practice.mycodeyatra.com/#/form-practice");

    Logger.info("Waiting for Header Element...");
    const header = await driver.wait(until.elementLocated(By.css("h1")), 5000);
    const text = await header.getText();
    
    if (text.includes("Practice")) {
      Logger.info(`Successfully found Header: ${text}`);
    } else {
      Logger.warn("Header text did not match expectations.");
    }

    try {
      Logger.info("Attempting to find a non-existent element to trigger an error log...");
      await driver.findElement(By.css("#this-does-not-exist"));
    } catch (error: any) {
      Logger.error(`Element not found: ${error.message}`);
    }
  });
});
