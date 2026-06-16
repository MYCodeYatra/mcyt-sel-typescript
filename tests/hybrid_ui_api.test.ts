import { Builder, WebDriver, By, until } from "selenium-webdriver";
import { ApiUtils } from "./utils/ApiUtils";

// Set longer timeout for UI tests
jest.setTimeout(30000);

describe("Phase 6 - Hybrid Testing: UI + API", () => {
  let driver: WebDriver;
  let createdPostId: number;

  beforeAll(async () => {
    // HYBRID STEP 1: Fast Data Creation via API (Setup)
    console.log("[Setup] Creating test data via API...");
    const payload = {
      title: "Hybrid Test Post",
      body: "This post was created purely via backend API to test the UI.",
      userId: 1
    };
    const response = await ApiUtils.post("/posts", payload);
    
    // Validate API creation
    expect(response.status).toBe(201);
    createdPostId = response.data.id;
    console.log(`[Setup] Created Post ID: ${createdPostId} successfully via API.`);

    // Initialize WebDriver
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  it("Should interact with the UI based on API created data", async () => {
    // HYBRID STEP 2: UI Validation (Action)
    // Normally, you would navigate to the system under test to view the created post.
    // Since jsonplaceholder doesn't have a UI for our post, we will navigate to our practice site
    // and demonstrate the UI interaction.
    console.log("[Action] Navigating to the Practice Site...");
    await driver.get("https://practice.mycodeyatra.com/");
    
    // Basic UI Validation
    const header = await driver.findElement(By.tagName("h1"));
    const text = await header.getText();
    expect(text).toContain("Automation Practice");
    
    console.log(`[Action] UI Validation passed for Post ID: ${createdPostId}`);
  });

  afterAll(async () => {
    // HYBRID STEP 3: Fast Data Cleanup via API (Teardown)
    console.log(`[Teardown] Cleaning up data via API... deleting Post ID: ${createdPostId}`);
    if (createdPostId) {
      const response = await ApiUtils.delete(`/posts/${createdPostId}`);
      expect([200, 204]).toContain(response.status);
      console.log(`[Teardown] Successfully deleted Post ID: ${createdPostId} via API.`);
    }

    // Quit driver
    if (driver) {
      await driver.quit();
    }
  });

});
