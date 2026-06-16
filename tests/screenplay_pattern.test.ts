import { WebDriver, By, until } from "selenium-webdriver";
import { AdvancedDriverFactory } from "./utils/advancedDriverFactory";
import { Actor } from "./screenplay/Actor";
import { NavigateToPracticeSite, FillOutForm, SubmitForm } from "./screenplay/Tasks";

describe("Architecture Phase - Screenplay Pattern", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await AdvancedDriverFactory.getDriver();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should orchestrate the test using BDD Actors and Tasks", async () => {
    // 1. Create our Actor
    const james = new Actor("James the QA Engineer", driver);

    // 2. The Actor attempts a sequence of Tasks! (Pure BDD readability)
    await james.attemptsTo(
      new NavigateToPracticeSite(),
      FillOutForm.withDetails("James Bond", "007@mi6.gov"),
      new SubmitForm()
    );

    // 3. Questions (Assertions)
    console.log("James is verifying the result...");
    const resultMsg = await driver.wait(until.elementLocated(By.css("[data-testid='result-message']")), 5000);
    const text = await resultMsg.getText();
    
    expect(text).toContain("Form submitted successfully");
    console.log("Mission Accomplished!");
  });
});
