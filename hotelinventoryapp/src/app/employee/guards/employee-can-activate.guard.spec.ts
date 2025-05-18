import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeCanActivateGuard } from './employee-can-activate.guard';

describe('employeeCanActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeCanActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
