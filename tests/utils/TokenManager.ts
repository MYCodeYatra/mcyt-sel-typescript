import fs from "fs";
import path from "path";
import { AuthUtils } from "./AuthUtils";
import { Logger } from "./Logger";

export class TokenManager {
  private static tokenFilePath = path.resolve(__dirname, "../../.auth/token.json");

  /**
   * Retrieves a valid token from disk. If no token exists, or if the current
   * token is expired, it will log in to fetch a new one and cache it.
   */
  public static async getValidToken(): Promise<string> {
    // 1. Check if token file exists
    if (fs.existsSync(this.tokenFilePath)) {
      const fileData = fs.readFileSync(this.tokenFilePath, "utf-8");
      const parsedData = JSON.parse(fileData);

      // 2. Check if token is still valid (e.g., expires in the future)
      const now = new Date().getTime();
      if (parsedData.expiresAt > now) {
        Logger.info("[TokenManager] Found valid cached token. Skipping login API call.");
        return parsedData.token;
      } else {
        Logger.info("[TokenManager] Cached token is expired. Will fetch a new one.");
      }
    } else {
      Logger.info("[TokenManager] No cached token found. Will fetch a new one.");
    }

    // 3. Fetch new token via API
    const newToken = await AuthUtils.getAuthToken();

    // 4. Cache the new token to disk with an expiration time
    // For demonstration, we assume the token is valid for 1 hour
    const expiresAt = new Date().getTime() + (60 * 60 * 1000); 
    
    const cacheData = {
      token: newToken,
      expiresAt: expiresAt
    };

    // Ensure the .auth directory exists
    const dir = path.dirname(this.tokenFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(this.tokenFilePath, JSON.stringify(cacheData, null, 2));
    Logger.info("[TokenManager] New token cached successfully to disk.");

    return newToken;
  }
}
