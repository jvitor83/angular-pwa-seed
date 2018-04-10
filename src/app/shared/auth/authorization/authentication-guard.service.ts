import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IdentityService } from '../authentication/identity.service';
import { Location } from '@angular/common';
import { GuardService } from './guard.service';
import 'rxjs/add/operator/catch';


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
    const map = this.identityService.user
      .map(user => {
        if (user.isAuthenticated) {
          return true;
        }
      });
    const ret = map.catch(() => this.deny());
    return ret;
  }
}
