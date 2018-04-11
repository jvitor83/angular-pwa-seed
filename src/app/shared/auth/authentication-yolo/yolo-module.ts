import { AUTHENTICATION_SERVICE } from './../authentication/authentication-service.token';
import { YoloAuthenticationService } from './base-yolo-authentication.service';
import { YoloIdentityTransformationService } from './yolo-identity-transformation.service';
import { IdentityService } from './../authentication/identity.service';
import { Injectable, Inject, NgModule, ModuleWithProviders, Type, FactoryProvider, TypeProvider, InjectionToken, ValueProvider } from '@angular/core';
import { YOLO_AUTHENTICATION_SERVICE } from './yolo-authentication-service.token';
import { ProviderAuthenticationService } from '../authentication/provider-authentication.service';


export const YOLO_CONFIG = new InjectionToken<Oidc.UserManagerSettings>('OIDC_CONFIG');

export interface YoloConfig {
  uri: string;
  clientId: string;
}

@Injectable()
export class YoloTokenDepHolder {
  constructor(
    @Inject(YOLO_CONFIG) public yoloConfig: Array<YoloConfig>,
    @Inject(YOLO_AUTHENTICATION_SERVICE) public yoloProviderAuthenticationService: ProviderAuthenticationService,
  ) {
  }
}

export function InitYoloAuthenticationService(
  identityService: IdentityService,
  identityTransformationService: YoloIdentityTransformationService,
  yoloTokenDepHolder: YoloTokenDepHolder
): YoloAuthenticationService {
  return new YoloAuthenticationService(identityService, identityTransformationService,
    yoloTokenDepHolder.yoloConfig, yoloTokenDepHolder.yoloProviderAuthenticationService);
}

@NgModule()
export class YoloAuthModule {
  static forRoot(
    authenticationProviders: (any[] | Type<any> | ModuleWithProviders)[],
    yoloConfig: Array<YoloConfig>,
    provide = AUTHENTICATION_SERVICE,
  ) {

    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      authenticationProviders,
      {
        ngModule: YoloAuthModule,
        providers: [
          <ValueProvider>{ provide: YOLO_CONFIG, useValue: yoloConfig },
          YoloTokenDepHolder,
          // authenticationProviders.providers,
          <FactoryProvider>{
            provide: provide,
            useFactory: InitYoloAuthenticationService,
            deps: [IdentityService, YoloIdentityTransformationService, YoloTokenDepHolder]
          },
          <TypeProvider>YoloIdentityTransformationService
        ]
      }];
  }
}
