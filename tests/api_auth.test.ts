import { AuthUtils } from "./utils/AuthUtils";
import { ApiUtils } from "./utils/ApiUtils";
import axios from "axios";

describe("Phase 6 - API Testing: Authentication APIs", () => {
  let jwtToken: string;

  beforeAll(async () => {
    // 1. Authenticate before tests run to get the JWT
    jwtToken = await AuthUtils.getAuthToken();
    console.log(`Generated JWT Token: ${jwtToken.substring(0, 15)}...`);
  });

  it("Should access a protected route using the JWT token", async () => {
    // 2. We use dummyjson.com's /auth/me endpoint to verify the token
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });

    // 3. Validate the Response
    expect(response.status).toBe(200);
    expect(response.data.username).toBe("emilys");
    
    console.log(`Successfully validated JWT Token for user: ${response.data.username}`);
  });

  it("Should fail when accessing a protected route without a token", async () => {
    try {
      await axios.get("https://dummyjson.com/auth/me");
    } catch (error: any) {
      // 4. Validate that a 401 Unauthorized or 403 Forbidden is returned
      expect([401, 403]).toContain(error.response.status);
      console.log(`Successfully blocked unauthorized access. Status: ${error.response.status}`);
    }
  });

});
