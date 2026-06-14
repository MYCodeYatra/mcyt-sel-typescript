import { Builder, WebDriver, By, until } from "selenium-webdriver";
import "chromedriver";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

describe("Core UI Automation - File Upload and Download", () => {
  let driver: WebDriver;
  const downloadDir = path.join(os.homedir(), "Downloads");

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 5000 });
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should upload a local file", async () => {
    console.log("Navigating to Upload/Download Page...");
    await driver.get("https://practice.mycodeyatra.com/#/upload-download");
    
    // Wait for page to render
    await driver.wait(until.elementLocated(By.css("[data-testid='file-upload-input']")), 5000);

    // Create a dummy file to upload
    const filePath = path.join(__dirname, "dummy_upload.txt");
    fs.writeFileSync(filePath, "This is a test upload file.");

    // Upload the file by sending absolute path to the <input type="file">
    const uploadInput = await driver.findElement(By.css("[data-testid='file-upload-input']"));
    await uploadInput.sendKeys(filePath);
    console.log(`Sent file path: ${filePath}`);

    // Verify upload success
    const statusMsg = await driver.findElement(By.css("[data-testid='upload-status']"));
    expect(await statusMsg.getText()).toContain("Successfully uploaded: dummy_upload.txt");
    console.log("Verified upload success message!");

    // Clean up
    fs.unlinkSync(filePath);
  });

  it("Should download a file and verify its contents", async () => {
    // We are already on the page from the previous test
    const customText = "Hello from TypeScript Automation!";
    
    const textArea = await driver.findElement(By.css("[data-testid='download-text-input']"));
    await textArea.clear();
    await textArea.sendKeys(customText);
    
    const downloadBtn = await driver.findElement(By.css("[data-testid='download-btn']"));
    await downloadBtn.click();
    console.log("Clicked Download Button");

    // Wait for the file to be downloaded (Polling the file system)
    const downloadedFilePath = path.join(downloadDir, "dynamic_download.txt");
    let fileExists = false;
    for (let i = 0; i < 10; i++) {
      if (fs.existsSync(downloadedFilePath)) {
        fileExists = true;
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    expect(fileExists).toBe(true);
    
    // Verify file contents
    const fileContent = fs.readFileSync(downloadedFilePath, "utf8");
    expect(fileContent).toEqual(customText);
    console.log("Successfully verified downloaded file contents!");

    // Clean up
    if (fs.existsSync(downloadedFilePath)) {
      fs.unlinkSync(downloadedFilePath);
    }
  });
});
