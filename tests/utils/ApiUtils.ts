import axios, { AxiosResponse } from "axios";
import { ConfigManager } from "./ConfigManager";
import { Logger } from "./Logger";

export class ApiUtils {
  
  /**
   * Performs a robust HTTP GET request using the configured API_BASE_URL.
   */
  static async get(endpoint: string, token?: string): Promise<AxiosResponse> {
    const baseUrl = ConfigManager.get("API_BASE_URL");
    const fullUrl = `${baseUrl}${endpoint}`;
    
    Logger.info(`[API] Sending GET request to: ${fullUrl}`);
    
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      Logger.info(`[API] Injected Bearer Token into headers`);
    }

    try {
      const response = await axios.get(fullUrl, { headers });
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

  /**
   * Performs an HTTP POST request to create data, accepting a JSON payload.
   */
  static async post(endpoint: string, payload: any, token?: string): Promise<AxiosResponse> {
    const baseUrl = ConfigManager.get("API_BASE_URL");
    const fullUrl = `${baseUrl}${endpoint}`;
    
    Logger.info(`[API] Sending POST request to: ${fullUrl}`);
    Logger.info(`[API] Payload: ${JSON.stringify(payload)}`);
    
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      Logger.info(`[API] Injected Bearer Token into headers`);
    }

    try {
      const response = await axios.post(fullUrl, payload, { headers });
      Logger.info(`[API] Received Status: ${response.status}`);
      return response;
    } catch (error: any) {
      Logger.error(`[API] POST request failed: ${error.message}`);
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }

  /**
   * Performs an HTTP PUT request to replace an entire resource.
   */
  static async put(endpoint: string, payload: any, token?: string): Promise<AxiosResponse> {
    const baseUrl = ConfigManager.get("API_BASE_URL");
    const fullUrl = `${baseUrl}${endpoint}`;
    
    Logger.info(`[API] Sending PUT request to: ${fullUrl}`);
    Logger.info(`[API] Payload: ${JSON.stringify(payload)}`);
    
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await axios.put(fullUrl, payload, { headers });
      Logger.info(`[API] Received Status: ${response.status}`);
      return response;
    } catch (error: any) {
      Logger.error(`[API] PUT request failed: ${error.message}`);
      if (error.response) return error.response;
      throw error;
    }
  }

  /**
   * Performs an HTTP PATCH request to partially update a resource.
   */
  static async patch(endpoint: string, payload: any, token?: string): Promise<AxiosResponse> {
    const baseUrl = ConfigManager.get("API_BASE_URL");
    const fullUrl = `${baseUrl}${endpoint}`;
    
    Logger.info(`[API] Sending PATCH request to: ${fullUrl}`);
    Logger.info(`[API] Payload: ${JSON.stringify(payload)}`);
    
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await axios.patch(fullUrl, payload, { headers });
      Logger.info(`[API] Received Status: ${response.status}`);
      return response;
    } catch (error: any) {
      Logger.error(`[API] PATCH request failed: ${error.message}`);
      if (error.response) return error.response;
      throw error;
    }
  }
}
