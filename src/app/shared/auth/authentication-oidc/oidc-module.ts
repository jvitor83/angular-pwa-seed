import { OidcIdentityTransformationService } from './oidc-identity-transformation.service';
import { IdentityService } from './../authentication/identity.service';
import { OidcAuthenticationService } from './oidc-authentication.service';
import { AUTHENTICATION_SERVICE } from './../authentication/authentication-service.token';
import { NgModule, ModuleWithProviders, InjectionToken, ValueProvider, Inject, Injectable, Type, Optional } from "@angular/core";
import { YOLO_AUTHENTICATION_SERVICE } from '../authentication-yolo/yolo-authentication-service.token';
import { Platform } from '@ionic/angular';


export const OIDC_CONFIG = new InjectionToken<Oidc.UserManagerSettings>('OIDC_CONFIG');

@Injectable()
export class OidcConfigDepHolder {
  constructor(
    @Inject(OIDC_CONFIG) public oidcAuthenticationSettings: Oidc.UserManagerSettings,
    @Optional() public platform?: Platform,
) {
  }
}

export function InitOidcAuthenticationService(identityService, identityTransformationService, oidcConfigDepHolder: OidcConfigDepHolder) {
  return new OidcAuthenticationService(identityService, identityTransformationService,
    oidcConfigDepHolder.oidcAuthenticationSettings, oidcConfigDepHolder.platform);
}



@NgModule()
export class OidcAuthModule {
  static forRoot(authenticationSettings: Oidc.UserManagerSettings, provide = AUTHENTICATION_SERVICE) {
    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      {
      ngModule: OidcAuthModule,
      providers: [
        <ValueProvider>{ provide: OIDC_CONFIG, useValue: authenticationSettings },
        OidcConfigDepHolder,
        {
          provide: provide,
          useFactory: InitOidcAuthenticationService,
          deps:
            [
              IdentityService,
              OidcIdentityTransformationService,
              OidcConfigDepHolder
            ]
        },
        OidcIdentityTransformationService
      ]
  }];
  }

}
