import { WebDriver } from "selenium-webdriver";
import { AdvancedDriverFactory } from "../utils/advancedDriverFactory";
import { ConfigManager } from "../utils/ConfigManager";
import { Logger } from "../utils/Logger";

/**
 * BaseTest serves as the parent class or utility for all Test Suites.
 * It abstracts away Driver instantiation, Configuration loading, and Logging.
 */
export class BaseTest {
  public driver!: WebDriver;
  public baseUrl!: string;

  async setUp(): Promise<void> {
    Logger.info("----------------------------------------");
    Logger.info("TEST EXECUTION STARTED");
    
    // 1. Load Configurations
    this.baseUrl = ConfigManager.get("BASE_URL");
    Logger.info(`Target Environment: ${process.env.ENV_NAME?.toUpperCase() || 'QA'}`);

    // 2. Initialize WebDriver
    this.driver = await AdvancedDriverFactory.getDriver();
    Logger.info("WebDriver Initialized Successfully.");
  }

  async tearDown(): Promise<void> {
    if (this.driver) {
      Logger.info("Closing Browser and Quitting WebDriver...");
      await this.driver.quit();
    }
    Logger.info("TEST EXECUTION COMPLETED");
    Logger.info("----------------------------------------");
  }
}
