import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { roomsGuard } from './rooms.guard';

describe('roomsGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roomsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
