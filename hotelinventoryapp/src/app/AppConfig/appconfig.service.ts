import { InjectionToken } from '@angular/core';
import { AppConfig } from './appconfig.interface';
import { environment as envConfig } from '../../environments/environment';


export const APP_CONFIG: AppConfig = {
  apiEndpoint: envConfig.apiEndpoint,
};

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => APP_CONFIG,
});


