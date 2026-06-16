import { WebDriver } from "selenium-webdriver";

export interface Task {
  performAs(actor: Actor): Promise<void>;
}

export class Actor {
  constructor(
    public readonly name: string,
    public readonly driver: WebDriver
  ) {}

  async attemptsTo(...tasks: Task[]): Promise<void> {
    for (const task of tasks) {
      console.log(`${this.name} is attempting to perform a task...`);
      await task.performAs(this);
    }
  }

  // An Actor has "Abilities", such as the ability to browse the web
  abilityToBrowse(): WebDriver {
    return this.driver;
  }
}
