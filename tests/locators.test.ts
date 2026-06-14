import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Web Locators using CSS Selectors", () => {
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

  it("Should locate elements using advanced CSS Selectors", async () => {
    console.log("Navigating to https://practice.mycodeyatra.com/ ...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // Using ID via CSS
    const nameInput = await driver.findElement(By.css("#name"));
    await nameInput.sendKeys("John Doe");
    console.log("Successfully typed into #name");
    
    // Using Class via CSS
    const emailInput = await driver.findElement(By.css(".email-field"));
    await emailInput.sendKeys("john@example.com");
    console.log("Successfully typed into .email-field");
    
    // Using Attribute via CSS
    const submitBtn = await driver.findElement(By.css("button[type='submit']"));
    const btnText = await submitBtn.getText();
    console.log(`Submit button text found: ${btnText}`);
    
    expect(btnText).toBeTruthy();
  });
});
