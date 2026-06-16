import { WebDriver } from "selenium-webdriver";
import { AdvancedDriverFactory } from "./utils/advancedDriverFactory";

describe("Architecture Phase - Jest Lifecycle & Hooks", () => {
  let driver: WebDriver;

  // 1. Executes ONCE before ALL tests in this describe block
  beforeAll(async () => {
    console.log("[beforeAll] -> Initializing Global WebDriver Connection...");
    driver = await AdvancedDriverFactory.getDriver();
  });

  // 2. Executes BEFORE EACH individual test (it block)
  beforeEach(async () => {
    console.log("[beforeEach] -> Navigating to fresh state...");
    await driver.get("https://practice.mycodeyatra.com/#/form-practice");
    // e.g., clearing cookies or localStorage could go here
    await driver.manage().deleteAllCookies();
  });

  // 3. Executes AFTER EACH individual test (it block)
  afterEach(async () => {
    console.log("[afterEach] -> Taking screenshot on failure, cleaning up...");
    // Mock logic: if test fails, take screenshot
  });

  // 4. Executes ONCE after ALL tests in this describe block
  afterAll(async () => {
    console.log("[afterAll] -> Quitting WebDriver and closing connections...");
    if (driver) {
      await driver.quit();
    }
  });

  it("Test Case 1: Validate Title", async () => {
    console.log("-> Executing Test Case 1...");
    const title = await driver.getTitle();
    expect(title).toBeDefined();
  });

  it("Test Case 2: Validate URL", async () => {
    console.log("-> Executing Test Case 2...");
    const url = await driver.getCurrentUrl();
    expect(url).toContain("form-practice");
  });
});
