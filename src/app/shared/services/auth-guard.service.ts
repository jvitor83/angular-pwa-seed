import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { BaseAuthService2, IAuthenticated, AUTH_SERVICE } from "app/shared/services/base-auth.service";


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor( @Inject(AUTH_SERVICE) private authService: BaseAuthService2<any>, private router: Router, private angularLocation: Location) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('canActivate');

        const isAuthenticated = (this.authService.principal.value && this.authService.principal.value.isAuthenticated);
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
