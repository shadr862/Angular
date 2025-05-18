import { CanActivateFn, CanLoadFn, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, Router } from "@angular/router";
import { inject } from "@angular/core";
import { LoginService } from "../Auth/login-service/login.service";

export const canActivateLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (loginService.isLoggedin) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};



