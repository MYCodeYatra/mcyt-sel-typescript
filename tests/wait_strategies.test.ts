import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Wait Strategies", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    
    // 1. Implicit Wait Setup
    // This tells Selenium to poll the DOM for 10 seconds before throwing a NoSuchElement error
    await driver.manage().setTimeouts({ implicit: 10000 });
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should handle Explicit Waits correctly using until.elementLocated", async () => {
    console.log("Navigating to https://practice.mycodeyatra.com/ ...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // 2. Explicit Wait Setup
    // Waiting for an element to be completely visible before clicking it
    const submitBtnLocator = By.css("button[type='submit']");
    
    console.log("Waiting for submit button to be visible...");
    const submitBtn = await driver.wait(
      until.elementIsVisible(driver.findElement(submitBtnLocator)), 
      15000, 
      "Timed out after 15 seconds waiting for Submit Button to be visible"
    );
    
    // 3. Wait for element to be enabled before clicking
    await driver.wait(until.elementIsEnabled(submitBtn), 5000);
    
    const text = await submitBtn.getText();
    console.log(`Button found: ${text}`);
    
    expect(text).toBeTruthy();
  });
});
