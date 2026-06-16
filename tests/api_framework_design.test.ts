import { ApiUtils } from "./utils/ApiUtils";
import { PostPayloadBuilder } from "./data/PostPayloadBuilder";

describe("Phase 6 - API Framework Design: POJOs and Builders", () => {
  
  it("Should create a payload using default Builder values", async () => {
    // 1. Generate a default payload using the builder
    const defaultPayload = new PostPayloadBuilder().build();

    // 2. Pass the POJO to the API Utility
    const response = await ApiUtils.post("/posts", defaultPayload);

    // 3. Validate response
    expect(response.status).toBe(201);
    expect(response.data.title).toBe("Default Generated Title");
    
    console.log(`Created Default Post. Title: ${response.data.title}`);
  });

  it("Should override specific fields using Builder methods", async () => {
    // 1. Generate a custom payload using chained builder methods
    const customPayload = new PostPayloadBuilder()
      .withTitle("Custom Title via Builder")
      .withUserId(99)
      .build();

    // 2. Pass the custom POJO to the API Utility
    const response = await ApiUtils.post("/posts", customPayload);

    // 3. Validate response matches custom overrides
    expect(response.status).toBe(201);
    expect(response.data.title).toBe("Custom Title via Builder");
    expect(response.data.userId).toBe(99);
    // The body should remain the default because we didn't override it!
    expect(response.data.body).toBe("Default Generated Body Content");

    console.log(`Created Custom Post. Title: ${response.data.title}, UserID: ${response.data.userId}`);
  });

});
