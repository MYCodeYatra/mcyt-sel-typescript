import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Frames and iFrames", () => {
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

  it("Should switch into an iFrame and interact with nested elements", async () => {
    console.log("Navigating to Frames & Windows Page...");
    await driver.get("https://practice.mycodeyatra.com/#/frames");
    
    // Wait for the iframe container to be located
    const iframeElement = await driver.wait(
      until.elementLocated(By.css("[data-testid='iframe-container']")), 
      5000
    );

    // 1. Switch context to the iFrame
    await driver.switchTo().frame(iframeElement);
    console.log("Switched context into the iFrame successfully!");

    // 2. Interact with elements INSIDE the iFrame
    const iframeBtn = await driver.findElement(By.css("#iframe-btn"));
    await iframeBtn.click();
    console.log("Clicked the button inside the iFrame");

    // Verify the message that appears inside the iFrame
    const msg = await driver.findElement(By.css("#msg"));
    expect(await msg.getText()).toEqual("IFrame Button Clicked!");
    console.log("Verified text inside the iFrame.");

    // 3. Switch context back to the Default (Parent) Content
    await driver.switchTo().defaultContent();
    console.log("Switched context back to the default parent page.");

    // Verify we are back by finding an element outside the iFrame
    const parentHeader = await driver.findElement(By.css("h2"));
    expect(await parentHeader.getText()).toContain("iFrames & Windows");
    console.log("Successfully verified parent DOM interaction!");
  });
});
