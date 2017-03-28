import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private angularLocation: Location) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('canActivate');
        console.log('this.authService.loggedIn');
        console.log(this.authService.loggedIn);

            return this.authService.getUser().then((user) => {
                if (user) {
                    return true;
                } else {
                    const uri = this.angularLocation.prepareExternalUrl(state.url);
                    localStorage.setItem(location.host + ':callback', location.origin + '/' + uri);
                    this.router.navigate(['unauthorized']);
                }
            });
    }

}
