import { WebDriver, By, until } from "selenium-webdriver";
import { DriverFactory } from "./utils/driverFactory";
import * as testData from "./data/users.json";

describe("Architecture Phase - Data Driven Testing", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await DriverFactory.getDriver();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  // Jest's 'test.each' allows us to parameterize our tests!
  test.each(testData)("Should test scenario: $scenario", async (data) => {
    console.log(`Executing DDT Scenario: ${data.scenario}`);
    
    // In a real scenario, we would navigate and fill out a form using 'data.username'
    await driver.get("https://practice.mycodeyatra.com/#/form-practice");
    
    const nameInput = await driver.wait(
      until.elementLocated(By.css("[data-testid='first-name']")), 
      5000
    );
    await nameInput.clear();
    await nameInput.sendKeys(data.username);

    const emailInput = await driver.findElement(By.css("[data-testid='email']"));
    await emailInput.clear();
    await emailInput.sendKeys(data.email);

    // Mock an assertion or console log based on expectedMessage
    console.log(`Expected outcome: ${data.expectedMessage}`);
    
    // We simply assert the values were entered correctly to prove DDT works
    const actualEmail = await emailInput.getAttribute("value");
    expect(actualEmail).toEqual(data.email);
  });
});
