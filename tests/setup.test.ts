import { Builder, WebDriver, By } from "selenium-webdriver";
import "chromedriver"; // Ensures ChromeDriver is available in PATH

describe("Selenium TypeScript Foundations", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should navigate to MyCodeYatra and verify title", async () => {
    await driver.get("https://mycodeyatra.com");
    
    const title = await driver.getTitle();
    console.log("Page Title:", title);
    
    expect(title).toContain("MyCodeYatra");
  });
});
