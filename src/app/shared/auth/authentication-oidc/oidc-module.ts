import { AUTHENTICATION_SERVICE } from './../authentication/authentication-service.token';
import { NgModule, ModuleWithProviders, InjectionToken, ValueProvider, Inject, Injectable, Type, Optional } from "@angular/core";
import { OidcAuthenticationService } from "./oidc-authentication.service";
import { OidcIdentityTransformationService } from "./oidc-identity-transformation.service";
import { IdentityService } from "../authentication/identity.service";
import { AuthenticationService, ProviderAuthenticationService } from "../authentication/base-authentication.service";
import { BaseAuthenticationTypeServiceProvider } from "../auth.module";
import { YOLO_AUTHENTICATION_SERVICE } from '../authentication-yolo/yolo-authentication-service.token';
import { Platform } from 'ionic-angular';


export let OIDC_CONFIG = new InjectionToken<ProviderAuthenticationService>('OIDC_CONFIG');

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

  // static forRoot(settings: Oidc.UserManagerSettings, policies: ReadonlyArray<Policy> = []) {



  //   // return AuthModule.forRoot([
  //   //   {
  //   //     provide: AUTHENTICATION_SERVICE,
  //   //     useFactory: InitOidcAuthenticationService,
  //   //     deps: [IdentityService, OidcIdentityTransformationService]
  //   //   },
  //   //   OidcIdentityTransformationService,
  //   // ]);





  //   return <ModuleWithProviders>{
  //     ngModule: OidcAuthModule,
  //     providers: [
  //       // AngularFireAuth, AngularFireDatabase, // Keep this if you use Firebase, otherwise comment/remove it

  //       {
  //         provide: AUTHENTICATION_SERVICE,
  //         useFactory: InitOidcAuthenticationService,
  //         deps: [IdentityService, OidcIdentityTransformationService]
  //       },
  //       OidcIdentityTransformationService,

  //       AuthenticationService,
  //       IdentityService,

  //       { provide: Policies, useValue: policies },
  //       { provide: PolicyService, useFactory: InitPolicyService, deps: [Policies] }
  //     ]
  //   };
  // }
}
