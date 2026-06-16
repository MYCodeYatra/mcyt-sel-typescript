import axios from "axios";
import { Logger } from "./Logger";

export class AuthUtils {
  /**
   * Retrieves a JWT Authentication Token by logging in via API.
   * We are using dummyjson.com for this demonstration as jsonplaceholder does not support auth.
   */
  static async getAuthToken(username: string = "emilys", password: string = "emilyspass"): Promise<string> {
    Logger.info(`[Auth] Attempting to retrieve JWT token for user: ${username}`);
    
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200 && response.data.token) {
        Logger.info(`[Auth] Token successfully retrieved!`);
        return response.data.token;
      } else {
        throw new Error(`[Auth] Failed to retrieve token. Status: ${response.status}`);
      }
    } catch (error: any) {
      Logger.error(`[Auth] Login API request failed: ${error.message}`);
      throw error;
    }
  }
}
