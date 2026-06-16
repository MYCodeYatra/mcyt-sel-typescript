import axios from "axios";
import { ApiUtils } from "./utils/ApiUtils";

// 1. Tell Jest to mock the entire axios library
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Phase 6 - API Mocking with Jest", () => {
  
  afterEach(() => {
    // Reset mocks after each test to prevent pollution
    jest.clearAllMocks();
  });

  it("Should mock a successful GET request (200 OK)", async () => {
    // 2. Define the fake data we want axios to return
    const mockResponse = {
      data: { id: 999, title: "Mocked Title", body: "Mocked Body" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    };

    // 3. Instruct the mocked axios to resolve with our fake data
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    // 4. Call our ApiUtils (which calls the mocked axios internally)
    const response = await ApiUtils.get("/posts/999");

    // 5. Validate the response matches our mock!
    expect(response.status).toBe(200);
    expect(response.data.title).toBe("Mocked Title");
    
    // 6. Verify that axios.get was actually called with the correct URL
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining("/posts/999"), expect.any(Object));
    
    console.log(`Successfully mocked GET response for ID: ${response.data.id}`);
  });

  it("Should mock a 500 Internal Server Error to test error handling", async () => {
    // 2. Define a fake error response
    const mockErrorResponse = {
      response: {
        data: { error: "Database Connection Failed" },
        status: 500
      },
      message: "Request failed with status code 500"
    };

    // 3. Instruct mocked axios to reject with the fake error
    mockedAxios.get.mockRejectedValueOnce(mockErrorResponse);

    // 4. Call our ApiUtils (it should catch the error and return the response object)
    const response = await ApiUtils.get("/posts/error");

    // 5. Validate our framework handles the 500 error gracefully
    expect(response.status).toBe(500);
    expect(response.data.error).toBe("Database Connection Failed");
    
    console.log(`Successfully mocked and handled a 500 Internal Server Error`);
  });

});
