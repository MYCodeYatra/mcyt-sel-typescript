import { Builder, WebDriver } from "selenium-webdriver";
import "chromedriver";

describe("Core UI Automation - Selenium 4 DevTools Network", () => {
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

  it("Should connect to CDP and intercept Network Requests", async () => {
    // 1. Get the CDP Connection
    const cdpConnection = await driver.createCDPConnection("page");
    
    // Arrays to store captured network traffic
    const requests: string[] = [];
    const responses: string[] = [];

    // 2. Subscribe to Network Events
    await cdpConnection.execute("Network.enable", {}, (res) => {});

    cdpConnection._wsConnection.on("message", (message: string) => {
      const parsedMessage = JSON.parse(message);
      
      if (parsedMessage.method === "Network.requestWillBeSent") {
        requests.push(parsedMessage.params.request.url);
      }
      
      if (parsedMessage.method === "Network.responseReceived") {
        responses.push(parsedMessage.params.response.url);
      }
    });

    console.log("CDP Network Interception Enabled...");

    // 3. Navigate to the Practice Site
    await driver.get("https://practice.mycodeyatra.com/");
    
    // Wait briefly for network calls to finish
    await driver.sleep(3000);

    console.log(`Captured ${requests.length} total outgoing requests.`);
    console.log(`Captured ${responses.length} total incoming responses.`);
    
    // Assert we actually captured network traffic
    expect(requests.length).toBeGreaterThan(0);
    expect(responses.length).toBeGreaterThan(0);

    // Verify that the main document was requested
    const mainRequest = requests.find(url => url.includes("practice.mycodeyatra.com"));
    expect(mainRequest).toBeDefined();
    console.log(`Successfully verified interception of: ${mainRequest}`);
  });
});
