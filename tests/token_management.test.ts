import { TokenManager } from "./utils/TokenManager";
import { AuthUtils } from "./utils/AuthUtils";

describe("Phase 6 - Advanced Authentication: Token Management", () => {
  
  it("Should fetch a fresh token if the cache is empty", async () => {
    // Spying on the AuthUtils to see if it actually gets called
    const spy = jest.spyOn(AuthUtils, "getAuthToken");

    const token = await TokenManager.getValidToken();
    
    expect(token).toBeDefined();
    // Since there was no token on disk initially, the login API should be called once.
    expect(spy).toHaveBeenCalledTimes(1);

    console.log(`[Test 1] Received Token: ${token}`);
    spy.mockRestore();
  });

  it("Should reuse the cached token on subsequent calls", async () => {
    const spy = jest.spyOn(AuthUtils, "getAuthToken");

    // This second call should read from disk instead of hitting the login endpoint
    const token = await TokenManager.getValidToken();

    expect(token).toBeDefined();
    // The spy should NOT be called because we returned the cached token early
    expect(spy).not.toHaveBeenCalled();

    console.log(`[Test 2] Reused Cached Token: ${token}`);
    spy.mockRestore();
  });

});
