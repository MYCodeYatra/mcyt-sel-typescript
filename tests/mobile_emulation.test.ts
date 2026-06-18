import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import fs from "fs";
import path from "path";

describe("Phase 8 - Visual Testing: Mobile Web Emulation", () => {
  let driver: WebDriver;
  const TARGET_URL = "https://practice.mycodeyatra.com/";

  beforeAll(async () => {
    // We construct ChromeOptions and pass the mobileEmulation dictionary.
    // This tells ChromeDriver to start Chrome in Mobile Emulation mode.
    const chromeOptions = new chrome.Options();
    
    // Emulate an iPhone 12 Pro
    const mobileEmulation = {
      deviceName: "iPhone 12 Pro"
    };

    chromeOptions.addArguments("--headless"); // Optional: Run in headless mode
    // The setMobileEmulation method handles the underlying CDP configuration!
    chromeOptions.setMobileEmulation(mobileEmulation);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should capture a visual baseline of a fully emulated iPhone environment", async () => {
    console.log("[Emulation] Navigating to target site as an iPhone 12 Pro...");
    
    // When the browser navigates, it will send an iPhone User-Agent to the server,
    // and the window will possess mobile touch-events and device pixel ratios!
    await driver.get(TARGET_URL);

    // Verify that the User-Agent was actually spoofed
    const userAgent = await driver.executeScript("return navigator.userAgent;") as string;
    expect(userAgent).toContain("iPhone");
    console.log(`[Emulation] Verified User-Agent: ${userAgent.substring(0, 50)}...`);

    // Take the screenshot
    const screenshotBase64 = await driver.takeScreenshot();
    
    const screenshotsDir = path.resolve(__dirname, "__image_snapshots__");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const baselinePath = path.join(screenshotsDir, "emulated_iphone12_home.png");
    fs.writeFileSync(baselinePath, screenshotBase64, "base64");
    
    console.log(`[Visual] Captured emulated baseline at: ${baselinePath}`);
    expect(fs.existsSync(baselinePath)).toBe(true);
  });

});
