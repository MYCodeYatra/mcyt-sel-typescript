import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";

// We export the driver so our Step Definitions can import and use it!
export let driver: WebDriver;

// Runs ONCE before the entire test suite starts
BeforeAll(async function () {
  console.log("[Cucumber Hook] BeforeAll: Initializing global resources...");
});

// Runs before EVERY SINGLE Scenario in every feature file
Before(async function (scenario) {
  console.log(`[Cucumber Hook] Before Scenario: ${scenario.pickle.name}`);
  
  // Initialize a fresh browser for every scenario to ensure state isolation
  driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
});

// Runs after EVERY SINGLE Scenario
After(async function (scenario) {
  console.log(`[Cucumber Hook] After Scenario: ${scenario.pickle.name}`);
  
  // If the scenario failed, let's take a screenshot!
  if (scenario.result?.status === Status.FAILED) {
    console.error(`[Cucumber Hook] Scenario Failed! Taking Screenshot...`);
    const screenshot = await driver.takeScreenshot();
    
    // Attach the screenshot to the Cucumber HTML Report
    this.attach(Buffer.from(screenshot, "base64"), "image/png");
  }

  // Always quit the driver to prevent zombie processes
  if (driver) {
    await driver.quit();
  }
});

// Runs ONCE after the entire test suite finishes
AfterAll(async function () {
  console.log("[Cucumber Hook] AfterAll: Tearing down global resources...");
});
