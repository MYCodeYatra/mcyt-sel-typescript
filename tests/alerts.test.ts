import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Alerts and Dialogs", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 5000 });
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should interact with JS Alerts, Confirms, and Prompts", async () => {
    console.log("Navigating to Overlays Page...");
    await driver.get("https://practice.mycodeyatra.com/#/overlays");
    
    // Wait for page to render
    await driver.wait(until.elementLocated(By.css("[data-testid='alert-btn']")), 5000);

    // ---------------------------------------------------
    // 1. Handling a Simple Alert (OK)
    // ---------------------------------------------------
    const alertBtn = await driver.findElement(By.css("[data-testid='alert-btn']"));
    await alertBtn.click();
    console.log("Clicked Alert Button");

    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    
    const alertText = await alert.getText();
    expect(alertText).toContain("This is a standard JavaScript Alert!");
    console.log(`Alert Text: ${alertText}`);
    
    await alert.accept();
    console.log("Accepted Simple Alert");

    // ---------------------------------------------------
    // 2. Handling a Confirm Dialog (Cancel)
    // ---------------------------------------------------
    const confirmBtn = await driver.findElement(By.css("[data-testid='confirm-btn']"));
    await confirmBtn.click();
    console.log("Clicked Confirm Button");

    await driver.wait(until.alertIsPresent(), 5000);
    const confirmAlert = await driver.switchTo().alert();
    
    // We use .dismiss() to click the Cancel button
    await confirmAlert.dismiss();
    console.log("Dismissed Confirm Alert");

    // Assert the UI updated correctly after cancellation
    const confirmResult = await driver.wait(until.elementLocated(By.css("[data-testid='alert-result']")), 5000);
    expect(await confirmResult.getText()).toEqual("Result: You clicked Cancel");
  });
});
