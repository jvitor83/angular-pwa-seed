import { Injectable, Inject } from '@angular/core';
import { AUTHENTICATION_SERVICE } from './authentication-service.token';
import { ProviderAuthenticationService } from './provider-authentication.service';


export interface IAuthenticationService {
  login(): void;
  logout(): void;
}


@Injectable()
export class AuthenticationService implements IAuthenticationService {
  login(): void {
    return this.authService.login();
  }
  logout(): void {
    return this.authService.logout();
  }
  constructor( @Inject(AUTHENTICATION_SERVICE) private authService: ProviderAuthenticationService) {
  }
}
