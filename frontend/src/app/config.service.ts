import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, retry } from 'rxjs';
import { ApiService } from 'src/core/api.service';
import { IConfig } from './modules/shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: IConfig;

  constructor(private api: ApiService, private router: Router) {
    this.config = { } as IConfig;
  }

  loadConfig(): Promise<void> {
    const configUri = '/config';
    return firstValueFrom(this.api.get<IConfig>(configUri).pipe(retry(3)))
      .then((configData: IConfig) => {
        this.config = configData;
      })
      .catch((error) => {
        this.router.navigateByUrl('/error');
      });
  }

  getConfig(): IConfig {
    return this.config;
  }

  getEnvironment(): string {
    return this.config?.environment || 'Unknown';
  }
}