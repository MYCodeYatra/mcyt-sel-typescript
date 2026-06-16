import { By, until } from "selenium-webdriver";
import { Actor, Task } from "./Actor";

export class NavigateToPracticeSite implements Task {
  async performAs(actor: Actor): Promise<void> {
    const driver = actor.abilityToBrowse();
    await driver.get("https://practice.mycodeyatra.com/#/form-practice");
  }
}

export class FillOutForm implements Task {
  constructor(private name: string, private email: string) {}

  static withDetails(name: string, email: string): FillOutForm {
    return new FillOutForm(name, email);
  }

  async performAs(actor: Actor): Promise<void> {
    const driver = actor.abilityToBrowse();
    
    const nameInput = await driver.wait(until.elementLocated(By.css("[data-testid='first-name']")), 5000);
    await nameInput.sendKeys(this.name);

    const emailInput = await driver.findElement(By.css("[data-testid='email']"));
    await emailInput.sendKeys(this.email);
  }
}

export class SubmitForm implements Task {
  async performAs(actor: Actor): Promise<void> {
    const driver = actor.abilityToBrowse();
    const submitBtn = await driver.findElement(By.css("[data-testid='submit-btn']"));
    await submitBtn.click();
  }
}
