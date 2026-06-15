import { Builder, WebDriver } from "selenium-webdriver";
import "chromedriver";
import "geckodriver";
// Note: msedgedriver is usually included in standard paths on Windows, but you can import it if installed

export class DriverFactory {
  static async getDriver(): Promise<WebDriver> {
    // Read the browser from the environment variable, default to 'chrome'
    const browserName = (process.env.BROWSER || "chrome").toLowerCase();

    let driver = await new Builder().forBrowser(browserName).build();
    
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 5000 });
    
    return driver;
  }
}
