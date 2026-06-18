import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "expect";
// import { driver } from "../support/hook"; // We will build this in the next tutorial

Given('the user navigates to the MyCodeYatra login page', async function () {
  console.log("[Selenium] Navigating to https://practice.mycodeyatra.com/login");
  // await driver.get("https://practice.mycodeyatra.com/login");
});

When('the user enters the username {string} and password {string}', async function (username, password) {
  console.log(`[Selenium] Typing username: ${username}`);
  console.log(`[Selenium] Typing password: ${password}`);
  // await driver.findElement(By.id("username")).sendKeys(username);
  // await driver.findElement(By.id("password")).sendKeys(password);
});

When('clicks the login button', async function () {
  console.log("[Selenium] Clicking Login Button");
  // await driver.findElement(By.id("login-btn")).click();
});

Then('the user should be redirected to the secure dashboard', async function () {
  console.log("[Selenium] Asserting Dashboard URL is present");
  // const currentUrl = await driver.getCurrentUrl();
  // expect(currentUrl).toContain("/dashboard");
});
