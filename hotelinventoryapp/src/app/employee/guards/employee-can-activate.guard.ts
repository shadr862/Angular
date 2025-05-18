import { CanActivateFn } from '@angular/router';
import { LoginService } from '../../Auth/login-service/login.service';
import { inject } from '@angular/core';

export const employeeCanActivateGuard: CanActivateFn = (route, state) => {
  const loginService=inject(LoginService)
  return loginService.isloggedinAdmin||loginService.isloggedinManager;
};
