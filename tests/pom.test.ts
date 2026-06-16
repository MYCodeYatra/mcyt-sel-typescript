import { WebDriver } from "selenium-webdriver";
import { DriverFactory } from "./utils/driverFactory";
import { FormsPage } from "./pages/FormsPage";

describe("Architecture Phase - Page Object Model", () => {
  let driver: WebDriver;
  let formsPage: FormsPage;

  beforeAll(async () => {
    driver = await DriverFactory.getDriver();
    formsPage = new FormsPage(driver);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should successfully submit the form using Page Object Methods", async () => {
    console.log("Navigating to Forms Page...");
    await formsPage.navigate();

    console.log("Filling out user details...");
    await formsPage.enterFirstName("John");
    await formsPage.enterLastName("Doe");
    await formsPage.enterEmail("john.doe@example.com");
    await formsPage.enterMobile("1234567890");

    console.log("Submitting form...");
    await formsPage.submitForm();

    const msg = await formsPage.getResultMessage();
    expect(msg).toContain("Form submitted successfully");
    console.log(`Success! Result: ${msg}`);
  });
});
