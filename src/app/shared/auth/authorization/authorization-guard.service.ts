import { AuthenticationGuardService } from './authentication-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from '../authentication/identity.service';
import { Location } from '@angular/common';
import { GuardService } from './guard.service';
import { AuthorizationService } from './authorization.service';


@Injectable()
export abstract class AuthorizationGuardService extends GuardService {
  constructor(
    protected authorizationService: AuthorizationService,
    protected router: Router,
    protected angularLocation: Location,
  ) {
    super(router, angularLocation);
  }

  abstract canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>;

}
