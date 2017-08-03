import { BaseAuthService, AUTH_SERVICE } from './base-auth.service';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor( @Inject(AUTH_SERVICE) private authService: BaseAuthService<any>, private router: Router, private angularLocation: Location) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('canActivate');

        const isAuthenticated = (this.authService.auth.value && this.authService.auth.value.isAuthenticated);
        console.log('isAuthenticated');
        console.log(isAuthenticated);

        if (isAuthenticated) {
            return true;
        } else {
            const uri = this.angularLocation.prepareExternalUrl(state.url);
            localStorage.setItem(location.host + ':callback', location.origin + '/' + uri);
            this.router.navigate(['unauthorized']);
        }
    }

}
