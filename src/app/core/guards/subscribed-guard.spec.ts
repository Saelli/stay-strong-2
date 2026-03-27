import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { subscribedGuard } from './subscribed-guard';

describe('subscribedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => subscribedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
