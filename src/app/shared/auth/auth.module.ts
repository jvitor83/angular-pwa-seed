import { AuthenticationGuardService } from './authorization/authentication-guard.service';
import { RouteAuthorizationGuardService } from './authorization/route-authorization-guard.service';
import { AuthorizationService } from './authorization/authorization.service';
import { IdentityService } from './authentication/identity.service';
import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthorizationGuardService } from './authorization/authorization-guard.service';






@NgModule()
export class AuthModule {
  static forRoot(
    authenticationProviders: (any[] | Type<any> | ModuleWithProviders)[],


  ): (any[] | Type<any> | ModuleWithProviders)[] {
    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      authenticationProviders,
      {
      ngModule: AuthModule,
      providers: [

        AuthenticationGuardService,
        AuthenticationService,
        IdentityService,

        AuthorizationService,
        AuthorizationGuardService,
        RouteAuthorizationGuardService,
      ]
    }];
  }


}
