import axios, { AxiosResponse } from "axios";
import { ConfigManager } from "./ConfigManager";
import { Logger } from "./Logger";

export class ApiUtils {
  
  /**
   * Performs a robust HTTP GET request using the configured API_BASE_URL.
   */
  static async get(endpoint: string): Promise<AxiosResponse> {
    const baseUrl = ConfigManager.get("API_BASE_URL");
    const fullUrl = `${baseUrl}${endpoint}`;
    
    Logger.info(`[API] Sending GET request to: ${fullUrl}`);
    
    try {
      const response = await axios.get(fullUrl);
      Logger.info(`[API] Received Status: ${response.status}`);
      return response;
    } catch (error: any) {
      Logger.error(`[API] GET request failed: ${error.message}`);
      if (error.response) {
        return error.response; // Return the 4xx or 5xx response so the test can assert it
      }
      throw error;
    }
  }
}
