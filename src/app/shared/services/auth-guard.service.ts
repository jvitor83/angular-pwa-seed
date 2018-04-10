import { IdentityService } from './../auth/authentication/identity.service';
// import { AUTHENTICATION_SERVICE } from './../auth/authentication/authentication-service.token';
//import { BaseAuthService, AUTH_SERVICE, Identity } from './base-auth.service';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
      private identityService: IdentityService,
      private router: Router, private angularLocation: Location) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('canActivate');

        const isAuthenticated = (this.identityService.userValue.isAuthenticated);
        console.log('isAuthenticated');
        console.log(isAuthenticated);

        if (isAuthenticated) {
            return true;
        } else {
            const uri = this.angularLocation.prepareExternalUrl(state.url);
            localStorage.setItem(location.host + ':callback', location.origin + location.pathname + uri);
            this.router.navigate(['unauthorized']);
        }
    }

}
