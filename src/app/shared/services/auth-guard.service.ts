import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }
    canActivate() {
        console.log('canActivate');
        console.log('this.authService.loggedIn');
        console.log(this.authService.loggedIn);
        if (this.authService.loggedIn) { return true; }
        this.router.navigate(['unauthorized']);
    }

}
