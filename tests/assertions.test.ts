import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Test Assertions using Jest", () => {
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

  it("Should assert element visibility and text on MyCodeYatra Practice", async () => {
    console.log("Navigating to https://practice.mycodeyatra.com/ ...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // Assertion 1: Verify Title
    const title = await driver.getTitle();
    expect(title).toContain("MyCodeYatra");
    console.log("Assertion 1 Passed: Title is correct");
    
    // Assertion 2: Verify Element is Displayed
    const headerElement = await driver.findElement(By.css("h1"));
    const isDisplayed = await headerElement.isDisplayed();
    expect(isDisplayed).toBe(true);
    console.log("Assertion 2 Passed: Header is visible");
    
    // Assertion 3: Verify Element Text
    const headerText = await headerElement.getText();
    expect(headerText).toEqual("Automation Practice Form");
    console.log(`Assertion 3 Passed: Header text is '${headerText}'`);
    
    // Assertion 4: Verify Element is Enabled
    const nameInput = await driver.findElement(By.css("#name"));
    const isEnabled = await nameInput.isEnabled();
    expect(isEnabled).toBe(true);
    console.log("Assertion 4 Passed: Name input is enabled");
  });
});
