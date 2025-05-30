import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { productsResolveGuard } from './products-resolve.guard';

describe('productsResolveGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => productsResolveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
