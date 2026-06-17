import axios, { AxiosInstance } from "axios";
import { Logger } from "./Logger";

export class SessionManager {
  private static instance: AxiosInstance;
  private static cookies: string[] = [];

  /**
   * Initializes a stateful Axios instance by performing a login
   * and capturing the Set-Cookie headers.
   */
  public static async loginAndCreateSession(): Promise<AxiosInstance> {
    if (!this.instance) {
      Logger.info("[Session] Initializing new API Session...");
      
      // 1. Perform Login (using httpbin for demonstration)
      const response = await axios.get("https://httpbin.org/cookies/set/session_id/SUPER_SECRET_TOKEN", {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400
      });

      // 2. Extract and store cookies
      const setCookieHeaders = response.headers["set-cookie"];
      if (setCookieHeaders) {
        this.cookies = setCookieHeaders.map(header => header.split(";")[0]);
        Logger.info(`[Session] Cookies captured: ${this.cookies.join("; ")}`);
      }

      // 3. Create a stateful Axios Instance
      this.instance = axios.create({
        baseURL: "https://httpbin.org",
        headers: {
          "Cookie": this.cookies.join("; ")
        }
      });
    }

    return this.instance;
  }

  /**
   * Returns the active stateful session.
   */
  public static getSession(): AxiosInstance {
    if (!this.instance) {
      throw new Error("[Session] Session not initialized! Call loginAndCreateSession() first.");
    }
    return this.instance;
  }

  /**
   * Clears the session to log out.
   */
  public static logout(): void {
    Logger.info("[Session] Logging out and destroying session...");
    this.instance = undefined as any;
    this.cookies = [];
  }
}
