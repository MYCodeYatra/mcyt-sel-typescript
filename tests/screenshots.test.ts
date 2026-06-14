import { Builder, WebDriver } from "selenium-webdriver";
import * as fs from "fs";
import * as path from "path";
import "chromedriver";

describe("Visual Evidence - Screenshots", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should capture a base64 screenshot of the practice site", async () => {
    console.log("Navigating to https://practice.mycodeyatra.com/ ...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // Simulate some logic
    const title = await driver.getTitle();
    expect(title).toContain("MyCodeYatra");
    
    // Take a full page screenshot
    const base64Image = await driver.takeScreenshot();
    
    // Save to local filesystem
    const timestamp = new Date().getTime();
    const filePath = path.join(__dirname, `screenshots/failure_${timestamp}.png`);
    
    fs.writeFileSync(filePath, base64Image, 'base64');
    console.log(`Screenshot successfully saved to: ${filePath}`);
    
    // Verify file was created
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
