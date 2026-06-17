import axios from "axios";

describe("Phase 6 - API Testing: Cookie Management", () => {
  let sessionCookie: string;

  it("Should extract the Set-Cookie header from a response", async () => {
    // 1. Hit an endpoint that sets a cookie
    // We use a mock bin or a public echo API to simulate receiving a cookie.
    // httpbin.org/cookies/set sets a cookie and redirects, returning the cookie data.
    const response = await axios.get("https://httpbin.org/cookies/set/session_id/12345ABCDE", {
      maxRedirects: 0, // Prevent redirect so we can read the raw Set-Cookie header
      validateStatus: (status) => status >= 200 && status < 400
    });

    // 2. Extract the Set-Cookie header array
    const setCookieHeaders = response.headers["set-cookie"];
    expect(setCookieHeaders).toBeDefined();

    // 3. Parse out the specific cookie we want
    if (setCookieHeaders) {
      sessionCookie = setCookieHeaders[0].split(";")[0]; // e.g., "session_id=12345ABCDE"
    }
    
    console.log(`Extracted Session Cookie: ${sessionCookie}`);
    expect(sessionCookie).toContain("session_id=12345ABCDE");
  });

  it("Should inject the extracted cookie into subsequent requests", async () => {
    // 1. Inject the cookie into the 'Cookie' header
    const response = await axios.get("https://httpbin.org/cookies", {
      headers: {
        "Cookie": sessionCookie
      }
    });

    // 2. Validate that the server received our cookie
    expect(response.status).toBe(200);
    expect(response.data.cookies).toHaveProperty("session_id", "12345ABCDE");
    
    console.log(`Successfully passed cookie to server. Server sees: ${JSON.stringify(response.data.cookies)}`);
  });

});
