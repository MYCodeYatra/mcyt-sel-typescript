import { ApiUtils } from "./utils/ApiUtils";

describe("Phase 5 - API Testing: POST Requests", () => {
  
  it("Should successfully create a new user via POST request", async () => {
    
    // 1. Define the payload
    const payload = {
      title: "Automation Engineer",
      body: "Testing POST APIs with Axios",
      userId: 101
    };

    // 2. Send the POST request
    const response = await ApiUtils.post("/posts", payload);

    // 3. Validate Status (201 Created)
    expect(response.status).toBe(201);
    
    // 4. Validate Response Payload mirrors our request
    const responseBody = response.data;
    expect(responseBody.title).toBe("Automation Engineer");
    expect(responseBody.body).toBe("Testing POST APIs with Axios");
    expect(responseBody.userId).toBe(101);
    
    // Most APIs will assign a new ID to created entities
    expect(responseBody.id).toBeDefined();
    
    console.log(`Successfully created Post with ID: ${responseBody.id}`);
  });

});
