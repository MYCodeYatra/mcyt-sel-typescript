import * as dotenv from 'dotenv';
import * as path from 'path';

export class ConfigManager {
  private static isLoaded = false;

  public static loadConfig(): void {
    if (!this.isLoaded) {
      // Determine which environment to load (default to 'qa' if undefined)
      const env = process.env.ENV_NAME || 'qa';
      const envPath = path.resolve(process.cwd(), `.env.${env}`);
      
      console.log(`Loading Configuration for Environment: [${env.toUpperCase()}]`);
      dotenv.config({ path: envPath });
      this.isLoaded = true;
    }
  }

  public static get(key: string): string {
    this.loadConfig(); // Ensure config is loaded
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is not set!`);
    }
    return value;
  }
}
