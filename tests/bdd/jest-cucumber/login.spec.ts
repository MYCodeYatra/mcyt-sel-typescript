import { loadFeature, defineFeature } from 'jest-cucumber';
import { Builder, WebDriver, By } from 'selenium-webdriver';

// Load the Gherkin feature file
const feature = loadFeature('tests/bdd/features/authentication/login.feature');

// We can still use Jest's describe/it architecture, but defineFeature wraps it!
defineFeature(feature, (test) => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  // Map the Gherkin Scenario
  test('Valid Login', ({ given, when, then }) => {
    
    given('the user navigates to the login page', async () => {
      console.log("[Jest-Cucumber] Navigating...");
      // await driver.get('https://practice.mycodeyatra.com/login');
    });

    when('the user enters valid credentials', async () => {
      console.log("[Jest-Cucumber] Entering credentials...");
    });

    then('the user should be redirected to the dashboard', async () => {
      console.log("[Jest-Cucumber] Asserting URL...");
      // expect(await driver.getCurrentUrl()).toContain('/dashboard');
    });

  });
});
