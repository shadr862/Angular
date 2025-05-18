import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../../Auth/login-service/login.service';


export const roomsGuard: CanActivateChildFn = (
  childRoute:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot):Observable<boolean|UrlTree>|Promise<boolean|UrlTree> => {
    const loginService = inject(LoginService);
  return of(loginService.isloggedinAdmin || loginService.isloggedinManager);
};
