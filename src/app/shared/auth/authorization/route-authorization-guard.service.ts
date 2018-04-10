import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IdentityService } from '../authentication/identity.service';
import { Location } from '@angular/common';
import { GuardService } from './guard.service';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuardService } from './authorization-guard.service';


@Injectable()
export class RouteAuthorizationGuardService extends AuthorizationGuardService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    // This is a 'convention' to check if the 'route' you are trying to access
    // is authorized to the logged user (AuthorizationService make this check)
    // Note: Be free to make your own convention or to completly ignore this class
    const operation = 'ACCESS';
    const routeUri = state.url;

    // TODO: Log Provider
    console.log(`Checking authorization for '${operation}' at route '${routeUri}'...`);
    const permission = this.authorizationService.checkClaimPermission(state.url, operation);
    console.log(`Authorization for '${operation}' at route '${routeUri}' are '${(permission ? 'granted' : 'denied')}'!`);

    if (permission) {
      return this.allow();
    } else {
      return this.deny();
    }
  }
}
