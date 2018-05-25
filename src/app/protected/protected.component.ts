import { IdentityService } from './../shared/auth/authentication/identity.service';
// import { AUTHENTICATION_SERVICE } from './../shared/auth/authentication/authentication-service.token';
import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
//import { BaseAuthService, AUTH_SERVICE } from "../shared/services/base-auth.service";
import { Observable } from "rxjs";
import { BaseAuthenticationService } from '../shared/auth/authentication/base-authentication.service';
import { OpenIDConnectIdentity } from '../shared/auth/authentication/identity.model';


@Component({
  moduleId: module.id,
  selector: './app-protected',
  templateUrl: './protected.component.html'
})
export class ProtectedComponent implements OnInit {

  // get name(): Observable<string> {
  //   return this.authService.authenticated.flatMap(r => r.user.name);
  //   //return authenticated.getValue().user.name;
  // }

  loggedIn;
  name;

  accessToken;



  constructor(private identityService: IdentityService, private location: Location) { }

  ngOnInit() {
    this.identityService.user.subscribe(principal => {
      this.name = principal.name;
      this.loggedIn = principal.isAuthenticated;
      this.accessToken = (<OpenIDConnectIdentity>principal).accessToken || null;
    });
  }
  goback() {
    this.location.back();
  }

}
