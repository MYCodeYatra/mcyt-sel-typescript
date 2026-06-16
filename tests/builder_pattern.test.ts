import { WebDriver } from "selenium-webdriver";
import { AdvancedDriverFactory } from "./utils/advancedDriverFactory";
import { FormsPage } from "./pages/FormsPage";
import { UserBuilder } from "./utils/UserBuilder";

describe("Architecture Phase - Builder Pattern", () => {
  let driver: WebDriver;
  let formsPage: FormsPage;

  beforeAll(async () => {
    driver = await AdvancedDriverFactory.getDriver();
    formsPage = new FormsPage(driver);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should dynamically construct a test user using the Builder Pattern", async () => {
    // Fluent API to build exactly the user we need for this specific test
    const customUser = new UserBuilder()
      .withUsername("fluent_admin")
      .withEmail("admin@fluent.com")
      .build();

    console.log(`Generated Test Data -> Username: ${customUser.username}, Email: ${customUser.email}`);

    await formsPage.navigate();
    
    // The username logic on FormsPage was split to First/Last name for demo, 
    // so we'll pass the full string to First Name
    await formsPage.enterFirstName(customUser.username);
    await formsPage.enterEmail(customUser.email);
    
    await formsPage.submitForm();
    
    const msg = await formsPage.getResultMessage();
    expect(msg).toContain("Form submitted successfully");
    console.log(`Test passed with Builder Pattern Data!`);
  });
});
