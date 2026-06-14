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

  it("Should safely fill forms and toggle checkboxes", async () => {
    console.log("Navigating to Form Practice Page...");
    await driver.get("https://practice.mycodeyatra.com/#/form-practice");
    
    // Wait for the form to render
    await driver.wait(until.elementLocated(By.css("[data-testid='full-name']")), 5000);

    // 1. Text Inputs
    const nameInput = await driver.findElement(By.css("[data-testid='full-name']"));
    await nameInput.clear();
    await nameInput.sendKeys("John Automation");
    console.log("Filled Name Input");

    const emailInput = await driver.findElement(By.css("[data-testid='email']"));
    await emailInput.clear();
    await emailInput.sendKeys("john@example.com");
    console.log("Filled Email Input");

    // 2. Radio Buttons (Safely Select)
    const maleRadioBtn = await driver.findElement(By.css("[data-testid='gender-male']"));
    const isMaleSelected = await maleRadioBtn.isSelected();
    if (!isMaleSelected) {
      // Sometimes we need to click the label wrapping the radio button in modern React apps
      await maleRadioBtn.click();
      console.log("Clicked Male Radio Button");
    }

    // 3. Checkboxes (Safely Select)
    const automationCheckbox = await driver.findElement(By.css("[data-testid='interest-automation']"));
    const isAutomationChecked = await automationCheckbox.isSelected();
    if (!isAutomationChecked) {
      await automationCheckbox.click();
      console.log("Checked the 'Automation' Checkbox");
    } else {
      console.log("The 'Automation' Checkbox was already checked");
    }

    // 4. Submit the form
    const submitBtn = await driver.findElement(By.css("[data-testid='submit-btn']"));
    await submitBtn.click();
    console.log("Clicked Submit Button");

    // 5. Assertions (Wait for success message)
    const successMsg = await driver.wait(until.elementLocated(By.css("[data-testid='success-msg']")), 5000);
    const msgText = await successMsg.getText();
    expect(msgText).toEqual("Form submitted successfully!");
    console.log(`Success Message Verified: ${msgText}`);
  });
});
