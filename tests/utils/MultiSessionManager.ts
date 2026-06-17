import axios, { AxiosInstance } from "axios";
import { Logger } from "./Logger";

export enum UserRole {
  ADMIN = "ADMIN",
  STANDARD_USER = "STANDARD_USER"
}

export class MultiSessionManager {
  private static sessions: Map<UserRole, AxiosInstance> = new Map();

  /**
   * Initializes a stateful session for a specific role.
   */
  public static async loginAs(role: UserRole, sessionToken: string): Promise<AxiosInstance> {
    if (!this.sessions.has(role)) {
      Logger.info(`[Multi-Session] Initializing new API Session for role: ${role}`);
      
      // We simulate logging in as different users by passing different tokens to httpbin
      const response = await axios.get(`https://httpbin.org/cookies/set/session_id/${sessionToken}`, {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400
      });

      const setCookieHeaders = response.headers["set-cookie"];
      let cookieStr = "";
      if (setCookieHeaders) {
        cookieStr = setCookieHeaders.map(header => header.split(";")[0]).join("; ");
      }

      const instance = axios.create({
        baseURL: "https://httpbin.org",
        headers: {
          "Cookie": cookieStr
        }
      });

      this.sessions.set(role, instance);
      Logger.info(`[Multi-Session] ${role} Session created successfully.`);
    }

    return this.sessions.get(role)!;
  }

  /**
   * Returns the active session for a given role.
   */
  public static getSession(role: UserRole): AxiosInstance {
    if (!this.sessions.has(role)) {
      throw new Error(`[Multi-Session] Session not initialized for role: ${role}`);
    }
    return this.sessions.get(role)!;
  }

  /**
   * Clears all sessions.
   */
  public static clearAllSessions(): void {
    Logger.info("[Multi-Session] Destroying all active sessions...");
    this.sessions.clear();
  }
}
