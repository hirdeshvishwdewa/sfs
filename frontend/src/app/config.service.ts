import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private static DEFAULT_BASE_URL = 'https://mock-api.assessment.sfsdm.org';
  private config: IConfig;

  constructor(private http: HttpClient) {
    this.config = { } as IConfig;
  }

  loadConfig(): Promise<void> {
    const configUrl = this.getApiBaseUrl() + '/config';
    return firstValueFrom(this.http.get<IConfig>(configUrl))
      .then((configData: IConfig) => {
        this.config = configData;
        console.log('Configuration Loaded:', this.config);
      })
      .catch((error) => {
        console.error('Failed to load configuration:', error);
        throw error;
      });
  }

  getConfig(): IConfig {
    return this.config;
  }

  getApiBaseUrl(): string {
    return ConfigService.DEFAULT_BASE_URL;
  }

  getEnvironment(): string {
    return this.config?.environment || 'Unknown';
  }
}

interface IConfig {
  availableLanguages: string[],
  environment: string,
  environmentColour: string,
  environmentName: string,
  endpoints: unknown
}