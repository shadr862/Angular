/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './app/AppConfig/appconfig.service';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    }
  ]
});
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
