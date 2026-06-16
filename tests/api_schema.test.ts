import { ApiUtils } from "./utils/ApiUtils";
import Ajv from "ajv";

const ajv = new Ajv(); // Create a new Ajv instance

// 1. Define the exact contract (schema) we expect the backend to honor
const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    username: { type: "string" },
    email: { type: "string" },
  },
  required: ["id", "name", "username", "email"],
  additionalProperties: true // Allow other fields to exist, but enforce the required ones
};

// 2. Compile the schema
const validate = ajv.compile(userSchema);

describe("Phase 5 - API Testing: Contract Validation", () => {
  
  it("Should validate the API response against a strict JSON Schema", async () => {
    
    // 3. Fetch data from the API
    const response = await ApiUtils.get("/users/1");
    expect(response.status).toBe(200);
    
    const payload = response.data;
    
    // 4. Validate the payload against the compiled schema!
    const isValid = validate(payload);
    
    if (!isValid) {
      console.error("Schema Validation Errors:", validate.errors);
    }
    
    // 5. The test will fail if the backend breaks the contract!
    expect(isValid).toBe(true);
    console.log("JSON Schema validation passed successfully! Contract honored.");
  });

});
