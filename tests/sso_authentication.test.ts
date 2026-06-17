import { Builder, WebDriver, By, until } from "selenium-webdriver";

// Increased timeout for UI flows
jest.setTimeout(45000);

describe("Phase 6 - Advanced Authentication: SSO Flow", () => {
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

  it("Should navigate an SSO redirect flow to authenticate", async () => {
    console.log("[SSO] Starting SSO Authentication flow...");

    // 1. Navigate to a service that uses SSO (e.g., GitHub login for an app)
    // For demonstration purposes, we will hit the GitHub login directly, 
    // simulating an OAuth/SSO redirect from our main app.
    await driver.get("https://github.com/login");

    // 2. Wait for the SSO Provider's login form to load
    const loginField = await driver.wait(until.elementLocated(By.id("login_field")), 10000);
    const passwordField = await driver.findElement(By.id("password"));
    const signInButton = await driver.findElement(By.name("commit"));

    // 3. Enter SSO credentials
    // Note: Do not run this with real credentials in CI/CD without secrets!
    await loginField.sendKeys("demo_sso_user@example.com");
    await passwordField.sendKeys("DemoPassword123!");
    
    console.log("[SSO] Credentials entered into Identity Provider.");

    // 4. Submit the SSO Form
    // In a real test, clicking this would redirect you back to your application
    // with an authorization code or token in the URL.
    await signInButton.click();

    // 5. Validate the redirect or error state
    // Because we used fake credentials, GitHub will show an error banner.
    // In a real SSO test, you would wait for your app's dashboard element to appear.
    const flashError = await driver.wait(until.elementLocated(By.css(".flash-error")), 10000);
    const errorText = await flashError.getText();
    
    expect(errorText).toContain("Incorrect username or password.");
    console.log("[SSO] Handled SSO provider response successfully.");
  });

});
