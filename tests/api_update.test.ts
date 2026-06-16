import { ApiUtils } from "./utils/ApiUtils";

describe("Phase 6 - API Testing: PUT vs PATCH Requests", () => {
  
  it("Should perform a PUT request to replace an entire resource", async () => {
    // 1. PUT replaces the entire object. We must provide all required fields.
    const putPayload = {
      id: 1,
      title: "Updated Title via PUT",
      body: "This completely replaced the original post.",
      userId: 1
    };

    const response = await ApiUtils.put("/posts/1", putPayload);

    // 2. Validate Status (200 OK)
    expect(response.status).toBe(200);
    
    // 3. Validate Response Payload
    const responseBody = response.data;
    expect(responseBody.title).toBe("Updated Title via PUT");
    expect(responseBody.body).toBe("This completely replaced the original post.");
    
    console.log(`Successfully replaced Post ID 1 via PUT`);
  });

  it("Should perform a PATCH request to partially update a resource", async () => {
    // 1. PATCH only updates specific fields. We don't need to provide the entire object.
    const patchPayload = {
      title: "Partially Updated Title via PATCH"
    };

    const response = await ApiUtils.patch("/posts/1", patchPayload);

    // 2. Validate Status (200 OK)
    expect(response.status).toBe(200);
    
    // 3. Validate Response Payload
    const responseBody = response.data;
    expect(responseBody.title).toBe("Partially Updated Title via PATCH");
    // The original body/userId remains untouched by a PATCH request
    
    console.log(`Successfully updated Post ID 1 via PATCH`);
  });

});
