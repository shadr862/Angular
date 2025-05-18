import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { employeeCanDeactivateGuard } from './employee-can-deactivate.guard';

describe('employeeCanDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeCanDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
