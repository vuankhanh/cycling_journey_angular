import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { componentAreDestroyedGuard } from './component-are-destroyed.guard';

describe('componentAreDestroyedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => componentAreDestroyedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
