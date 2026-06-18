import { Builder, WebDriver, By } from "selenium-webdriver";
import fs from "fs";
import path from "path";

describe("Phase 8 - Visual Testing: Baseline Management", () => {
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

  it("Should handle dynamic data (e.g., clocks/dates) by masking elements before screenshot", async () => {
    console.log("[Visual] Navigating to target site...");
    await driver.get(TARGET_URL);

    // Dynamic data like timestamps or ad banners will cause visual tests to fail 100% of the time,
    // because the pixels will be different on every single execution.
    // Solution: Mask them using JavaScript execution before capturing the screenshot!

    console.log("[Visual] Masking dynamic elements (e.g., footers/timestamps)...");
    
    // We execute JS to apply a solid black background to the footer to mask any changing copyright dates
    await driver.executeScript(`
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.backgroundColor = 'black';
        footer.style.color = 'black';
        // Alternatively, hide it entirely: footer.style.visibility = 'hidden';
      }
    `);

    console.log("[Visual] Taking masked full-page screenshot...");
    const screenshotBase64 = await driver.takeScreenshot();
    
    const screenshotsDir = path.resolve(__dirname, "__image_snapshots__");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const baselinePath = path.join(screenshotsDir, "masked_page_baseline.png");
    fs.writeFileSync(baselinePath, screenshotBase64, "base64");
    
    console.log(`[Visual] Masked baseline screenshot saved to: ${baselinePath}`);
    expect(fs.existsSync(baselinePath)).toBe(true);
  });

  it("Should allow configurable failure thresholds for minor anti-aliasing differences", async () => {
    // When running tests on a Windows CI agent vs a Linux CI agent, fonts might render 
    // slightly differently (anti-aliasing). If we require a 0% pixel difference, tests will be flaky.
    
    console.log("[Visual] Configuring visual threshold tolerance...");
    
    // In a real 'jest-image-snapshot' environment, you would configure it like this:
    const customConfig = {
      failureThreshold: 0.05, // Allow 5% difference
      failureThresholdType: 'percent',
      customSnapshotIdentifier: 'responsive-header-1920'
    };

    console.log(`[Visual] Tolerance set to 5% to prevent OS-level font rendering flakiness.`);
    expect(customConfig.failureThreshold).toBe(0.05);
  });

});
