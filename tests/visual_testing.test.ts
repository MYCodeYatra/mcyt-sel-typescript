import { Builder, WebDriver, By } from "selenium-webdriver";
import fs from "fs";
import path from "path";
// import { toMatchImageSnapshot } from "jest-image-snapshot";

// expect.extend({ toMatchImageSnapshot });

describe("Phase 8 - Visual Testing: Introduction to Image Comparison", () => {
  let driver: WebDriver;
  const TARGET_URL = "https://practice.mycodeyatra.com/";

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should capture a full-page screenshot and save it as a baseline", async () => {
    console.log("[Visual] Navigating to target site...");
    await driver.get(TARGET_URL);

    console.log("[Visual] Taking full-page screenshot...");
    const screenshotBase64 = await driver.takeScreenshot();
    
    // Save the baseline image to disk
    const screenshotsDir = path.resolve(__dirname, "__image_snapshots__");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const baselinePath = path.join(screenshotsDir, "home_page_baseline.png");
    fs.writeFileSync(baselinePath, screenshotBase64, "base64");
    
    console.log(`[Visual] Baseline screenshot saved to: ${baselinePath}`);
    
    // In a real jest-image-snapshot execution, it would look like this:
    // const imageBuffer = Buffer.from(screenshotBase64, "base64");
    // expect(imageBuffer).toMatchImageSnapshot();
    
    expect(fs.existsSync(baselinePath)).toBe(true);
  });

  it("Should capture a specific component (e.g., Header) for localized visual testing", async () => {
    // Component-level visual testing prevents layout changes in the footer from breaking header tests
    const headerElement = await driver.findElement(By.css("header"));
    
    const elementScreenshot = await headerElement.takeScreenshot();
    
    const headerBaselinePath = path.resolve(__dirname, "__image_snapshots__", "header_baseline.png");
    fs.writeFileSync(headerBaselinePath, elementScreenshot, "base64");
    
    console.log(`[Visual] Component screenshot saved to: ${headerBaselinePath}`);
    expect(fs.existsSync(headerBaselinePath)).toBe(true);
  });

});
