import { IdentityService } from './../authentication/identity.service';
import { YOLO_AUTHENTICATION_SERVICE } from './yolo-authentication-service.token';
import { NgModule, ModuleWithProviders, Provider, FactoryProvider, TypeProvider, InjectionToken, Injector, Injectable, Inject, Type } from "@angular/core";
import { AUTHENTICATION_SERVICE } from "../authentication/authentication-service.token";

import { YoloIdentityTransformationService } from "./yolo-identity-transformation.service";
import { environment } from "../../../../environments/environment";
import { YoloAuthenticationService } from "./base-yolo-authentication.service";
import { ProviderAuthenticationService } from '../authentication/base-authentication.service';



@Injectable()
export class YoloTokenDepHolder {
  constructor(@Inject(YOLO_AUTHENTICATION_SERVICE) public yoloProviderAuthenticationService: ProviderAuthenticationService) {
  }
}

export function InitYoloAuthenticationService(
  identityService: IdentityService,
  identityTransformationService: YoloIdentityTransformationService,
  yoloTokenDepHolder: YoloTokenDepHolder
): YoloAuthenticationService {
  const authSettings = Object.assign(
    { uri: environment.authentication.authority, clientId: environment.authentication.client_id },
    environment.authentication
  );
  return new YoloAuthenticationService(identityService, identityTransformationService, [authSettings], yoloTokenDepHolder.yoloProviderAuthenticationService);
}

@NgModule()
export class YoloAuthModule {
  static forRoot(
    authenticationProviders: (any[] | Type<any> | ModuleWithProviders)[],
    provide = AUTHENTICATION_SERVICE,
  ) {

    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      authenticationProviders,
      {
      ngModule: YoloAuthModule,
      providers: [
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
