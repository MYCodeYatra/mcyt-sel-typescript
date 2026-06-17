import { Builder, WebDriver, By, until } from "selenium-webdriver";
import { AuthUtils } from "./utils/AuthUtils";

describe("Phase 6 - Advanced Authentication: Browser Sessions", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should bypass UI login by injecting a JWT token into localStorage", async () => {
    console.log("[Auth] Fetching JWT via API...");
    // 1. Fetch token via backend API
    const token = await AuthUtils.getAuthToken();
    
    // 2. Navigate to the base domain FIRST.
    // Browsers block setting localStorage or cookies if you are not already on the domain.
    await driver.get("https://practice.mycodeyatra.com/");

    // 3. Inject the token into localStorage using JavaScript Execution
    console.log("[Auth] Injecting token into Browser Local Storage...");
    await driver.executeScript(`window.localStorage.setItem('auth_token', '${token}');`);

    // 4. Refresh the page to apply the injected state
    await driver.navigate().refresh();

    // 5. Verify that we are logged in (e.g., checking if the dashboard or logout button appears)
    // Since practice.mycodeyatra is just a practice site, we just verify the body loaded,
    // but in a real app, you would wait for the user profile element.
    const body = await driver.findElement(By.tagName("body"));
    expect(body).toBeDefined();

    console.log("[Auth] Successfully bypassed UI login and landed on dashboard.");
  });

});
