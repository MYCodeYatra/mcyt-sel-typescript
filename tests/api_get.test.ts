import { ApiUtils } from "./utils/ApiUtils";

describe("Phase 5 - API Testing: Framework Integration", () => {
  
  it("Should perform a dynamic GET request using the ApiUtils Framework", async () => {
    // We no longer hardcode the base URL! The utility extracts it from .env
    const response = await ApiUtils.get("/users/2");

    expect(response.status).toBe(200);
    const user = response.data;
    
    expect(user.id).toBe(2);
    expect(user.username).toBe("Antonette");
    expect(user.email).toBeDefined();
    
    console.log(`Validated dynamic GET request for user: ${user.username}`);
  });

  it("Should return a 404 response natively without crashing Jest", async () => {
    const response = await ApiUtils.get("/users/9999");
    
    // Thanks to our try-catch block in ApiUtils, we can assert errors cleanly
    expect(response.status).toBe(404);
  });

});
