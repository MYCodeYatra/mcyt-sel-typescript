import { Builder, WebDriver, logging } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import "chromedriver";

describe("Chrome DevTools Protocol - Console Logs", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    // Enable performance and browser logging
    const prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);
    prefs.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL);

    const options = new chrome.Options();
    options.setLoggingPrefs(prefs);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should capture browser console logs on practice site", async () => {
    console.log("Navigating to https://practice.mycodeyatra.com/ ...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // Inject a custom error into the browser console to simulate a JS failure
    await driver.executeScript("console.error('Simulated React Rendering Error!');");
    await driver.executeScript("console.log('User logged in successfully.');");
    
    // Fetch logs from the browser
    const logs = await driver.manage().logs().get(logging.Type.BROWSER);
    
    console.log(`Captured ${logs.length} log entries from Chrome.`);
    
    let hasError = false;
    for (const entry of logs) {
      console.log(`[${entry.level.name}] ${entry.message}`);
      if (entry.level.name === 'SEVERE') {
        hasError = true;
      }
    }
    
    expect(hasError).toBe(true);
  });
});
