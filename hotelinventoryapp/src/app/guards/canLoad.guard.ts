import { inject } from "@angular/core";
import { CanLoadFn, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";

import { Router } from "@angular/router"; // ✅ correct import
import { LoginService } from "../Auth/login-service/login.service";

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
