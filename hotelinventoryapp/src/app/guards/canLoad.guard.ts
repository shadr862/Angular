import { inject } from "@angular/core";
import { CanLoadFn, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { LoginService } from "../login/login-service/login.service";
import { Router } from "@angular/router"; // ✅ correct import

export const CanLoadGuard: CanLoadFn = (
  childRoute: Route,
  segments: UrlSegment[]
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedin) {
    return true;
  } else {
    console.log("⛔ Blocked by CanLoad guard");
    return router.parseUrl('/login');
  }
};
