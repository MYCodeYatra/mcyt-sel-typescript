import { ApiUtils } from "./utils/ApiUtils";

describe("Phase 6 - API Testing: DELETE Requests", () => {
  
  it("Should successfully delete a resource", async () => {
    // 1. Send the DELETE request targeting Post ID 1
    const response = await ApiUtils.delete("/posts/1");

    // 2. Validate Status. jsonplaceholder returns 200 OK for delete.
    // In many modern APIs, this will return a 204 No Content.
    expect([200, 204]).toContain(response.status);
    
    // 3. Optional: In a real system, you would try to GET the resource and verify it returns a 404
    // const getResponse = await ApiUtils.get("/posts/1");
    // expect(getResponse.status).toBe(404);
    
    console.log(`Successfully executed DELETE request on Post ID 1. Received Status: ${response.status}`);
  });

});
