import { ApiUtils } from "./utils/ApiUtils";
import { parseStringPromise } from "xml2js";
import axios from "axios";

describe("Phase 5 - API Testing: Parsing Data", () => {
  
  it("Should traverse and parse a complex JSON response", async () => {
    // 1. Fetching a JSON Array of users
    const response = await ApiUtils.get("/users");
    const users = response.data;
    
    // 2. Validate it's an array
    expect(Array.isArray(users)).toBe(true);

    // 3. Find a specific user in the array (e.g. Samantha)
    const targetUser = users.find((user: any) => user.username === "Samantha");
    
    expect(targetUser).toBeDefined();
    
    // 4. Traverse deep nested JSON objects (user.address.geo.lat)
    const latitude = targetUser.address.geo.lat;
    expect(latitude).toBe("-68.6102");
    
    console.log(`Successfully parsed deeply nested JSON! Samantha's latitude is ${latitude}`);
  });

  it("Should convert and parse an XML response into JSON", async () => {
    // 1. We mock an XML payload that a legacy SOAP backend might return
    const mockXml = `
      <User>
        <Id>105</Id>
        <Username>LegacyAdmin</Username>
        <Role>Manager</Role>
      </User>
    `;

    // 2. Parse the XML string into a usable JSON object using xml2js!
    const jsonResult = await parseStringPromise(mockXml, { explicitArray: false });

    // 3. Validate we can now interact with it exactly like JSON
    expect(jsonResult.User.Id).toBe("105");
    expect(jsonResult.User.Username).toBe("LegacyAdmin");

    console.log(`Successfully converted XML to JSON! Username: ${jsonResult.User.Username}`);
  });

});
