import { ApiUtils } from "./utils/ApiUtils";
import axios from "axios";

// A mock endpoint that echoes the authorization headers
// We are using httpbin.org to mock a secure endpoint
describe("Phase 5 - API Testing: Authentication Tokens", () => {
  
  it("Should successfully inject a Bearer token into a secure request", async () => {
    
    // 1. In a real scenario, we would hit a login endpoint to get the token:
    // const loginResponse = await ApiUtils.post("/login", { user: "admin", pass: "password" });
    // const token = loginResponse.data.token;
    
    // For this demonstration, we will mock a JWT token
    const mockJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MockPayload.Signature";

    // 2. We use httpbin.org to verify our headers were attached properly.
    // httpbin is a public testing service that echoes the request data back.
    const response = await axios.get("https://httpbin.org/bearer", {
      headers: { "Authorization": `Bearer ${mockJwtToken}` }
    });

    expect(response.status).toBe(200);
    
    // 3. Verify the token was successfully transmitted
    const responseBody = response.data;
    expect(responseBody.authenticated).toBe(true);
    expect(responseBody.token).toBe(mockJwtToken);
    
    console.log("Successfully authenticated with secure endpoint!");
  });

});
