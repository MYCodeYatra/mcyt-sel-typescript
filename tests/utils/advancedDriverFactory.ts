import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";

export class AdvancedDriverFactory {
  /**
   * Initializes a WebDriver instance based on Environment Variables.
   * Utilizes native Selenium Manager (v4.6.0+) to auto-download binaries!
   */
  static async getDriver(): Promise<WebDriver> {
    const browserName = (process.env.BROWSER || "chrome").toLowerCase();
    const isHeadless = process.env.HEADLESS === "true";

    let builder = new Builder();

    switch (browserName) {
      case "firefox":
        let ffOptions = new firefox.Options();
        if (isHeadless) ffOptions.addArguments("--headless");
        builder.forBrowser("firefox").setFirefoxOptions(ffOptions);
        break;

      case "edge":
        builder.forBrowser("MicrosoftEdge");
        break;

      case "chrome":
      default:
        let chromeOptions = new chrome.Options();
        if (isHeadless) chromeOptions.addArguments("--headless");
        // Additional Chrome tweaks for stability in CI/CD
        chromeOptions.addArguments("--no-sandbox");
        chromeOptions.addArguments("--disable-dev-shm-usage");
        builder.forBrowser("chrome").setChromeOptions(chromeOptions);
        break;
    }

    const driver = await builder.build();
    
    if (!isHeadless) {
      await driver.manage().window().maximize();
    }
    
    await driver.manage().setTimeouts({ implicit: 5000 });
    
    return driver;
  }
}
