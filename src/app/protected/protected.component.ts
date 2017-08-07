import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { BaseAuthService, AUTH_SERVICE } from "../shared/services/base-auth.service";
import { Observable } from "rxjs/Observable";


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
  
  

  constructor( @Inject(AUTH_SERVICE) private authService: BaseAuthService<any>, private location: Location) { }

  ngOnInit() {
    this.authService.auth.subscribe(principal => {
        this.name = principal.identity.user.name;
        this.loggedIn = principal.isAuthenticated;
        this.accessToken = principal.identity.token;
    });
  }
  goback() {
    this.location.back();
  }

}
