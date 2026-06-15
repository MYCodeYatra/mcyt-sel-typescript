import { WebDriver, By, until } from "selenium-webdriver";
import { DriverFactory } from "./utils/driverFactory";

describe("Core UI Automation - Cross-Browser Testing", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    // Instantiate driver dynamically based on the BROWSER environment variable
    driver = await DriverFactory.getDriver();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should load the Practice Site in the specified browser", async () => {
    const currentBrowserName = (await driver.getCapabilities()).getBrowserName();
    console.log(`Executing test on: ${currentBrowserName.toUpperCase()}`);

    await driver.get("https://practice.mycodeyatra.com/");
    
    // Verify the homepage loaded successfully
    const header = await driver.wait(
      until.elementLocated(By.css("h1")), 
      5000
    );
    
    const headerText = await header.getText();
    expect(headerText).toContain("Practice Automation");
    console.log(`Successfully verified UI on ${currentBrowserName}!`);
  });
});
