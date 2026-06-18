import { Builder, WebDriver, By } from "selenium-webdriver";

describe("Phase 9 - Accessibility Testing: Basics and Manual DOM Assertions", () => {
  let driver: WebDriver;
  const TARGET_URL = "https://practice.mycodeyatra.com/";

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get(TARGET_URL);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should verify that all <img> tags have a descriptive 'alt' attribute", async () => {
    console.log("[Accessibility] Scanning DOM for image tags...");
    const images = await driver.findElements(By.tagName("img"));
    
    console.log(`[Accessibility] Found ${images.length} images. Checking alt text...`);
    
    for (const img of images) {
      const altText = await img.getAttribute("alt");
      
      // Accessibility Rule: Images MUST have an alt attribute. 
      // If the image is purely decorative, the alt attribute must exist but be empty (alt="").
      expect(altText).not.toBeNull(); 
      
      // We can also verify that the text isn't a placeholder like "image" or "picture"
      if (altText) {
        expect(altText.toLowerCase()).not.toMatch(/^(image|picture)$/);
      }
    }
  });

  it("Should verify that all interactive buttons have accessible text or aria-labels", async () => {
    console.log("[Accessibility] Scanning DOM for button tags...");
    const buttons = await driver.findElements(By.tagName("button"));
    
    console.log(`[Accessibility] Found ${buttons.length} buttons. Checking accessible names...`);
    
    for (const btn of buttons) {
      const innerText = await btn.getText();
      const ariaLabel = await btn.getAttribute("aria-label");
      
      // Accessibility Rule: Buttons MUST have screen-reader accessible text.
      // This can come from innerText or an aria-label.
      const hasAccessibleName = (innerText && innerText.trim().length > 0) || (ariaLabel && ariaLabel.trim().length > 0);
      
      expect(hasAccessibleName).toBe(true);
    }
  });

});
