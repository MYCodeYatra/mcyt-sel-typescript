import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Multiple Windows and Tabs", () => {
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

  it("Should switch between multiple windows and tabs", async () => {
    console.log("Navigating to Frames & Windows Page...");
    await driver.get("https://practice.mycodeyatra.com/#/frames");
    
    // 1. Get the original window handle
    const originalWindow = await driver.getWindowHandle();
    console.log(`Original Window Handle: ${originalWindow}`);

    // Wait for the open tab button to be located
    await driver.wait(until.elementLocated(By.css("[data-testid='open-tab-btn']")), 5000);
    const openTabBtn = await driver.findElement(By.css("[data-testid='open-tab-btn']"));
    
    // 2. Click the button to open a new tab
    await openTabBtn.click();
    console.log("Clicked 'Open New Tab' button");

    // 3. Wait for the new window to appear
    await driver.wait(
      async () => (await driver.getAllWindowHandles()).length === 2,
      5000
    );

    // 4. Switch to the new tab
    const allWindows = await driver.getAllWindowHandles();
    for (const windowHandle of allWindows) {
      if (windowHandle !== originalWindow) {
        await driver.switchTo().window(windowHandle);
        console.log("Switched to New Tab!");
        break;
      }
    }

    // 5. Interact with elements in the new tab
    const newTabHeader = await driver.wait(until.elementLocated(By.css("h1")), 5000);
    expect(await newTabHeader.getText()).toEqual("Success!");
    console.log("Verified 'Success!' text inside the new tab.");

    // Close the new tab
    await driver.close();
    console.log("Closed the new tab");

    // 6. Switch back to the original window
    await driver.switchTo().window(originalWindow);
    console.log("Switched back to Original Window");

    // Verify we are back by checking the window count UI
    const windowCount = await driver.findElement(By.css("[data-testid='window-count']"));
    expect(await windowCount.getText()).toEqual("1");
    console.log("Successfully returned to the parent window and verified state.");
  });
});
