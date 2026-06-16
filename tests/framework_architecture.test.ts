import { By, until } from "selenium-webdriver";
import { BaseTest } from "./base/BaseTest";
import { ElementUtils } from "./utils/ElementUtils";
import { Logger } from "./utils/Logger";

describe("Phase 4 - Framework Architecture Blueprint", () => {
  const baseTest = new BaseTest();

  // Let the BaseTest handle all the heavy lifting!
  beforeAll(async () => {
    await baseTest.setUp();
  });

  afterAll(async () => {
    await baseTest.tearDown();
  });

  it("Should orchestrate Config, Utils, Logging, and WebDriver seamlessly", async () => {
    // 1. Navigation using ConfigManager's URL
    Logger.info(`Navigating to ${baseTest.baseUrl}`);
    await baseTest.driver.get(baseTest.baseUrl);

    // 2. Interaction using ElementUtils
    Logger.info("Entering Random Test Data...");
    const nameLocator = By.css("[data-testid='first-name']");
    await ElementUtils.sendKeys(baseTest.driver, nameLocator, "Architect");

    // 3. Assertion
    const val = await baseTest.driver.findElement(nameLocator).getAttribute("value");
    expect(val).toBe("Architect");
    Logger.info("Architecture Validation Passed!");
  });
});
