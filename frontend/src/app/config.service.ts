import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, interval, Observable, retry, switchMap } from 'rxjs';
import { ApiService } from 'src/core/api.service';
import { IConfig } from './modules/shared/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: IConfig;
  private configSubject: any;
  config$: Observable<IConfig> = {} as Observable<IConfig>;

  constructor(private api: ApiService, private router: Router) {
    this.config = {} as IConfig;
  }

  async loadConfig(): Promise<void> {
    try {
      const configData = await firstValueFrom(this.configAPICall().pipe(retry(3)));
      this.config = configData;
      this.api.setAPIEndpoints(this.config.endpoints);
      this.startPeriodicConfigFetch(configData);
    } catch (error) {
      this.router.navigateByUrl('/error');
    }
  }

  getConfig(): IConfig {
    return this.config;
  }

  getEnvironment(): string {
    return this.config?.environment || 'Unknown';
  }

  private configAPICall(): Observable<IConfig> {
    const configUri = '/config';
    return this.api.get<IConfig>(configUri);
  }

  private startPeriodicConfigFetch(configData: IConfig): void {
    this.configSubject = new BehaviorSubject<IConfig>(configData);
    this.config$ = this.configSubject.asObservable();
    interval(15000)
    .pipe(switchMap(() => this.configAPICall()))
    .subscribe((config: IConfig) => {
      this.config = config;
      this.configSubject.next(config);
    });
  }
}