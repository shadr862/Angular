import { InjectionToken } from "@angular/core";
import { RouteConfig } from "./routeConfig.interface";

export const value:RouteConfig={Titel:"Home"};

export const RouteConfigToken=new InjectionToken<RouteConfig>('routeConfig',{
     providedIn: 'root',
     factory: () => value
}
);