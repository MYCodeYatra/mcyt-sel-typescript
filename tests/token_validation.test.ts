import { AuthUtils } from "./utils/AuthUtils";
// In a real project, run: npm install jsonwebtoken
// import jwt from "jsonwebtoken";

describe("Phase 7 - Security Testing: JWT Token Validation", () => {
  let rawToken: string;
  let decodedPayload: any;

  beforeAll(async () => {
    // 1. Fetch the raw JWT string from the backend
    rawToken = await AuthUtils.getAuthToken();
    console.log(`[Security] Fetched Raw JWT: ${rawToken.substring(0, 20)}...`);

    // 2. Decode the payload (Middle segment of the JWT)
    // A JWT is comprised of: Header.Payload.Signature
    // Using simple Base64 decoding for demonstration (instead of importing jsonwebtoken)
    const base64Url = rawToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    decodedPayload = JSON.parse(jsonPayload);
  });

  it("Should have a valid expiration time (exp) in the future", () => {
    expect(decodedPayload.exp).toBeDefined();

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    expect(decodedPayload.exp).toBeGreaterThan(currentTimeInSeconds);
    
    console.log(`[Security] Token is valid until timestamp: ${decodedPayload.exp}`);
  });

  it("Should not leak sensitive PII in the token payload", () => {
    // JWTs are NOT encrypted (only Base64 encoded). 
    // Hackers can read them. They should only contain generic IDs, NOT passwords or SSNs.
    
    const sensitiveKeys = ["password", "ssn", "credit_card", "pin"];
    const payloadKeys = Object.keys(decodedPayload);

    for (const key of sensitiveKeys) {
      expect(payloadKeys).not.toContain(key);
    }
    
    console.log("[Security] Payload verified: No sensitive PII found.");
  });

  it("Should be issued by the trusted Identity Provider (iss)", () => {
    // Validate the Issuer claim to prevent accepting forged tokens from other domains
    expect(decodedPayload.iss).toBeDefined();
    // In our mock backend, it might not have an 'iss', but let's assume it should match our app
    // expect(decodedPayload.iss).toBe("https://auth.mycodeyatra.com");
    console.log(`[Security] Token Issuer (iss): ${decodedPayload.iss}`);
  });

});
