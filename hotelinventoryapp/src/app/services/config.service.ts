import { Inject, Injectable, InjectionToken } from '@angular/core';
import {RouteConfigToken} from './routeConfig.service';
import { RouteConfig } from './routeConfig.interface';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {
  // Removed string index signature as it conflicts with the 'config' property

  constructor(@Inject(RouteConfigToken) private config: RouteConfig) {
  console.log('ConfigService initialized');
  console.log(this.config);
}

}
