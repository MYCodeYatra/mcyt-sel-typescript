import { SessionManager } from "./utils/SessionManager";

describe("Phase 6 - API Testing: Session Handling", () => {
  
  beforeAll(async () => {
    // Initialize the session ONCE before all tests run
    await SessionManager.loginAndCreateSession();
  });

  afterAll(() => {
    // Destroy the session after tests finish
    SessionManager.logout();
  });

  it("Should make a stateful GET request using the SessionManager", async () => {
    // 1. Retrieve the pre-configured stateful Axios instance
    const session = SessionManager.getSession();

    // 2. Make a request without manually passing cookies
    // The instance already has the Cookie header injected!
    const response = await session.get("/cookies");

    // 3. Validate that the server recognizes our session
    expect(response.status).toBe(200);
    expect(response.data.cookies).toHaveProperty("session_id", "SUPER_SECRET_TOKEN");
    
    console.log(`Stateful Request Successful! Server Cookies:`, response.data.cookies);
  });

  it("Should maintain the session across multiple tests seamlessly", async () => {
    const session = SessionManager.getSession();
    const response = await session.get("/cookies");

    expect(response.status).toBe(200);
    expect(response.data.cookies).toHaveProperty("session_id", "SUPER_SECRET_TOKEN");
  });

});
