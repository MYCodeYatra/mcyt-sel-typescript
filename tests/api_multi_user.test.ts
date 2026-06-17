import { MultiSessionManager, UserRole } from "./utils/MultiSessionManager";

describe("Phase 6 - API Testing: Multi-User Testing", () => {
  
  beforeAll(async () => {
    // 1. Initialize two entirely different sessions in the setup block
    await MultiSessionManager.loginAs(UserRole.ADMIN, "ADMIN_TOKEN_999");
    await MultiSessionManager.loginAs(UserRole.STANDARD_USER, "USER_TOKEN_111");
  });

  afterAll(() => {
    // Destroy all sessions
    MultiSessionManager.clearAllSessions();
  });

  it("Should act as an ADMIN and perform privileged actions", async () => {
    // 2. Fetch the specific Admin session
    const adminSession = MultiSessionManager.getSession(UserRole.ADMIN);

    // 3. Make the API call (the ADMIN_TOKEN_999 cookie is automatically attached)
    const response = await adminSession.get("/cookies");

    // 4. Validate that the server recognizes the Admin token
    expect(response.status).toBe(200);
    expect(response.data.cookies).toHaveProperty("session_id", "ADMIN_TOKEN_999");
    
    console.log(`[Admin Test] Validated Admin Session. Server Cookies:`, response.data.cookies);
  });

  it("Should act as a STANDARD USER and verify restricted access", async () => {
    // 2. Fetch the specific Standard User session
    const userSession = MultiSessionManager.getSession(UserRole.STANDARD_USER);

    // 3. Make the API call (the USER_TOKEN_111 cookie is automatically attached)
    const response = await userSession.get("/cookies");

    // 4. Validate that the server recognizes the Standard User token
    expect(response.status).toBe(200);
    expect(response.data.cookies).toHaveProperty("session_id", "USER_TOKEN_111");
    
    console.log(`[User Test] Validated Standard User Session. Server Cookies:`, response.data.cookies);
  });

});
