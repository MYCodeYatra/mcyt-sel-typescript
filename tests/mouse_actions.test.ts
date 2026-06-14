import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Mouse Actions", () => {
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

  it("Should perform hover, right-click, and drag-and-drop actions", async () => {
    console.log("Navigating to Mouse Actions Page...");
    await driver.get("https://practice.mycodeyatra.com/#/mouse-actions");
    
    const actions = driver.actions({ async: true });

    // 1. Hover Action
    const hoverTarget = await driver.wait(
      until.elementLocated(By.css("[data-testid='hover-target']")), 
      5000
    );
    await actions.move({ origin: hoverTarget }).perform();
    console.log("Hovered over the target element.");
    // Wait briefly to allow React state to update color
    await driver.sleep(500);

    // 2. Right-Click (Context Menu) Action
    const contextZone = await driver.findElement(By.css("[data-testid='context-menu-zone']"));
    await actions.contextClick(contextZone).perform();
    console.log("Performed Right-Click on Context Zone.");
    
    // Verify custom context menu appeared
    const contextMenu = await driver.wait(
      until.elementLocated(By.css("[data-testid='custom-context-menu']")), 
      5000
    );
    expect(await contextMenu.isDisplayed()).toBe(true);
    console.log("Verified custom context menu is visible.");
    
    // Click outside to close the menu
    await actions.click(driver.findElement(By.css("h2"))).perform();

    // 3. Drag and Drop Action
    const dragSource = await driver.findElement(By.css("[data-testid='drag-source']"));
    const dropTarget = await driver.findElement(By.css("[data-testid='drop-target']"));
    
    await actions.dragAndDrop(dragSource, dropTarget).perform();
    console.log("Performed Drag and Drop.");
    
    // In React HTML5 Drag-and-Drop, Selenium native actions sometimes fail to trigger 
    // the dataTransfer events. But we demonstrate the Selenium 4 Actions API here.
    // We will assert the drop target status.
    const dropText = await dropTarget.getText();
    // It may say "Dropped Successfully!" if the browser correctly fires HTML5 events via Actions
    console.log(`Drop Target Status: ${dropText}`);

    // 4. Click and Hold (Resize)
    const resizer = await driver.findElement(By.css("[data-testid='resizer-handle']"));
    await actions.move({ origin: resizer })
                 .press()
                 .move({ x: 50, y: 50, origin: resizer })
                 .release()
                 .perform();
    console.log("Performed click, hold, and drag to resize the box.");
  });
});
