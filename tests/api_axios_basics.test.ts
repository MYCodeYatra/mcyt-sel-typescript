import axios from "axios";

describe("Phase 5 - API Testing: Axios Basics", () => {
  
  it("Should perform a basic GET request using Axios", async () => {
    // 1. Send the GET request to a public mock API
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");

    // 2. Validate the Response Status Code
    expect(response.status).toBe(200);

    // 3. Validate the Response Payload (Body)
    const userData = response.data;
    console.log(`Successfully fetched user: ${userData.name}`);
    
    expect(userData.id).toBe(1);
    expect(userData.email).toBeDefined();
  });

  it("Should handle API errors gracefully", async () => {
    try {
      // Sending a request to an endpoint that does not exist (404)
      await axios.get("https://jsonplaceholder.typicode.com/users/9999");
    } catch (error: any) {
      // Axios inherently throws an error on 4xx and 5xx responses!
      expect(error.response.status).toBe(404);
      console.log(`Caught expected error: ${error.message}`);
    }
  });

});
