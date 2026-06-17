import axios from "axios";

describe("Phase 7 - Security Testing: HTTP Security Headers", () => {
  const TARGET_URL = "https://practice.mycodeyatra.com/";
  let responseHeaders: any;

  beforeAll(async () => {
    // We only need to make a HEAD or GET request to fetch the headers
    const response = await axios.get(TARGET_URL);
    responseHeaders = response.headers;
    console.log("[Security] Fetched HTTP Headers from target application.");
  });

  it("Should implement Strict-Transport-Security (HSTS) to force HTTPS", () => {
    const hsts = responseHeaders["strict-transport-security"];
    
    // Validate the header exists
    expect(hsts).toBeDefined();
    // Validate it includes max-age and optionally includesSubDomains
    expect(hsts).toMatch(/max-age=\d+/);
    
    console.log(`[Security] Validated HSTS Header: ${hsts}`);
  });

  it("Should implement X-Frame-Options to prevent Clickjacking", () => {
    const xFrameOptions = responseHeaders["x-frame-options"];
    
    // Validate the header exists
    expect(xFrameOptions).toBeDefined();
    // Usually set to DENY or SAMEORIGIN
    expect(["DENY", "SAMEORIGIN"]).toContain(xFrameOptions.toUpperCase());
    
    console.log(`[Security] Validated X-Frame-Options Header: ${xFrameOptions}`);
  });

  it("Should implement X-Content-Type-Options to prevent MIME-sniffing", () => {
    const xContentTypeOptions = responseHeaders["x-content-type-options"];
    
    expect(xContentTypeOptions).toBeDefined();
    expect(xContentTypeOptions.toLowerCase()).toBe("nosniff");
    
    console.log(`[Security] Validated X-Content-Type-Options Header: ${xContentTypeOptions}`);
  });

});
