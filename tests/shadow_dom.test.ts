import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Shadow DOM", () => {
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

  it("Should pierce the Shadow DOM and interact with encapsulated elements", async () => {
    console.log("Navigating to Shadow DOM Page...");
    await driver.get("https://practice.mycodeyatra.com/#/shadow-dom");
    
    // Wait for the Shadow Host to be located
    const shadowHost = await driver.wait(
      until.elementLocated(By.css("[data-testid='shadow-host']")), 
      5000
    );

    // Get the Shadow Root from the Host
    const shadowRoot = await shadowHost.getShadowRoot();
    console.log("Successfully pierced the Shadow Root!");

    // Interact with the input field INSIDE the Shadow DOM
    const shadowInput = await shadowRoot.findElement(By.css("#shadow-input"));
    await shadowInput.clear();
    await shadowInput.sendKeys("Hello from TypeScript Automation!");
    console.log("Filled text inside the Shadow DOM input");

    // Click the button INSIDE the Shadow DOM
    const shadowBtn = await shadowRoot.findElement(By.css("#shadow-btn"));
    await shadowBtn.click();
    console.log("Clicked the button inside the Shadow DOM");

    // Verify the resulting message INSIDE the Shadow DOM
    const shadowMsg = await shadowRoot.findElement(By.css("#shadow-msg"));
    const msgText = await shadowMsg.getText();
    expect(msgText).toEqual("You typed: Hello from TypeScript Automation!");
    console.log(`Verified output message: ${msgText}`);
  });
});
