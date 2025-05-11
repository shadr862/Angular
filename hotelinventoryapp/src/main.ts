// src/main.ts
import { bootstrapApplication, Title } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './app/AppConfig/appconfig.service';
import { requestInterceptor } from './app/request.interceptor';
import { InitService } from './app/init.service';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { RouteConfigToken, value } from './app/services/routeConfig.service';


function initFactory(initService:InitService)
{
  return ()=> initService.Init();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
    
    { provide: RouteConfigToken, useValue: value},
    
    // register HttpClient + functional interceptors
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    {
      provide:APP_INITIALIZER,
      useFactory:initFactory,
      deps:[InitService],
      multi:true,
    }
  ]
}).catch(err => console.error(err));
