import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";

export class CustomWorld extends World {
  public driver?: WebDriver;
  public sharedData: { [key: string]: any } = {};

  constructor(options: IWorldOptions) {
    super(options);
  }

  // Helper method to safely get the driver
  public getDriver(): WebDriver {
    if (!this.driver) {
      throw new Error("WebDriver is not initialized. Check your Before hook.");
    }
    return this.driver;
  }
}

// Tell Cucumber to use our CustomWorld instead of the default World object
setWorldConstructor(CustomWorld);
