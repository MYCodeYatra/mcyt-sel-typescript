import "reflect-metadata";
import { injectable, container } from "tsyringe";

// 1. A mock Database Service that our tests might need to fetch data
@injectable()
export class DatabaseService {
  fetchUserCredentials(): { user: string, pass: string } {
    console.log("[DB] Connecting to DB and fetching users...");
    return { user: "admin_di", pass: "password_di" };
  }
}

// 2. A mock Page Object that depends on the Database Service
@injectable()
export class LoginPage {
  constructor(private db: DatabaseService) {}

  login() {
    // The Database Service was automatically provided by tsyringe!
    const creds = this.db.fetchUserCredentials();
    console.log(`[UI] Logging in as ${creds.user} with ${creds.pass}`);
    return true;
  }
}

describe("Phase 4 - Dependency Injection", () => {
  it("Should automatically inject dependencies without the 'new' keyword", () => {
    // Usually, we would have to do:
    // const db = new DatabaseService();
    // const page = new LoginPage(db);
    
    // With DI, we just ask the container for the Page Object!
    const loginPage = container.resolve(LoginPage);
    
    const result = loginPage.login();
    expect(result).toBeTruthy();
  });
});
