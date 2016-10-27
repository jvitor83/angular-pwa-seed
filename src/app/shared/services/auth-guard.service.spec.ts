/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    //addProviders([AuthGuardService]);
  });

  it('should ...',
    inject([AuthGuardService],
      (service: AuthGuardService) => {
        expect(service).toBeTruthy();
      }));
});
