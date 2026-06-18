import { Builder, WebDriver } from "selenium-webdriver";
import fs from "fs";
import path from "path";

// Define the critical breakpoint dimensions for our application
const VIEWPORTS = [
  { name: "desktop", width: 1920, height: 1080 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 }
];

describe("Phase 8 - Visual Testing: Responsive Testing", () => {
  let driver: WebDriver;
  const TARGET_URL = "https://practice.mycodeyatra.com/";

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  // We use `test.each` to iterate through the array of viewports and run a separate test for each!
  test.each(VIEWPORTS)("Should verify the UI layout at $name ($width x $height)", async ({ name, width, height }) => {
    console.log(`[Visual] Testing Responsive Breakpoint: ${name}`);

    // 1. Resize the browser window to match the exact device breakpoint
    await driver.manage().window().setRect({ width, height });

    // 2. Navigate to the page
    await driver.get(TARGET_URL);

    // 3. Take the screenshot for this specific resolution
    const screenshotBase64 = await driver.takeScreenshot();
    
    // 4. Save the baseline with the resolution injected into the filename!
    const screenshotsDir = path.resolve(__dirname, "__image_snapshots__");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const baselinePath = path.join(screenshotsDir, `responsive_home_${name}.png`);
    fs.writeFileSync(baselinePath, screenshotBase64, "base64");
    
    console.log(`[Visual] Captured responsive layout for ${name} at: ${baselinePath}`);
    expect(fs.existsSync(baselinePath)).toBe(true);
  });

});
