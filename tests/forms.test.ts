import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Forms and Checkboxes", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 5000 });
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should fill forms and handle checkboxes on practice site", async () => {
    console.log("Navigating to https://practice.mycodeyatra.com/ ...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // 1. Text Inputs
    const nameInput = await driver.findElement(By.css("#name"));
    await nameInput.sendKeys("John Automation");
    console.log("Filled Name Input");

    const emailInput = await driver.findElement(By.css(".email-field"));
    await emailInput.sendKeys("john@example.com");
    console.log("Filled Email Input");

    // 2. Radio Buttons
    // Find the 'Male' radio button using CSS attribute selector
    const maleRadioBtn = await driver.findElement(By.css("input[value='Male']"));
    const isMaleSelected = await maleRadioBtn.isSelected();
    if (!isMaleSelected) {
      await maleRadioBtn.click();
      console.log("Clicked Male Radio Button");
    }

    // 3. Checkboxes
    // Find the 'Reading' checkbox
    const readingCheckbox = await driver.findElement(By.css("input[value='Reading']"));
    const isReadingChecked = await readingCheckbox.isSelected();
    if (!isReadingChecked) {
      await readingCheckbox.click();
      console.log("Checked the 'Reading' Checkbox");
    } else {
      console.log("The 'Reading' Checkbox was already checked");
    }

    // 4. Assertions
    expect(await maleRadioBtn.isSelected()).toBe(true);
    expect(await readingCheckbox.isSelected()).toBe(true);
  });
});
