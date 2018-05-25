import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from '../authentication/identity.service';
import { Location } from '@angular/common';
import { GuardService } from './guard.service';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuardService extends GuardService {

  constructor(
    protected identityService: IdentityService,
    protected router: Router,
    protected angularLocation: Location,
  ) {
    super(router, angularLocation);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const mapped = this.identityService.user.pipe(map(user => {
      if (user.isAuthenticated) {
        return this.allow();
      } else {
        return this.deny(state);
      }
    }))
      ;
    // const ret = map.catch(() => {
    //   return this.deny();
    // });
    return mapped;
  }
}
