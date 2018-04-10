import { AUTHENTICATION_SERVICE } from './authentication/authentication-service.token';
import { NgModule, ModuleWithProviders, Provider, ValueProvider, TypeProvider, InjectionToken, Type, ClassProvider } from '@angular/core';
import { BaseAuthenticationService, AuthenticationService,
  ProviderAuthenticationService } from './authentication/base-authentication.service';
import { OidcAuthenticationService } from './authentication-oidc/oidc-authentication.service';
import { IdentityService } from './authentication/identity.service';
import { OidcIdentityTransformationService } from './authentication-oidc/oidc-identity-transformation.service';
import { FirebaseAuthenticationService } from './authentication-firebase/firebase-authentication.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../../environments/environment';
import { FirebaseIdentityTransformationService } from './authentication-firebase/firebase-identity-transformation.service';
import { FactoryProvider } from '@angular/core/src/di/provider';
import { AuthorizationService } from './authorization/authorization.service';
import { RouteAuthorizationGuardService } from './authorization/route-authorization-guard.service';
import { AuthenticationGuardService } from './authorization/authentication-guard.service';
import { AuthorizationGuardService } from './authorization/authorization-guard.service';





// export function InitFirebaseAuthenticationService(identityService, identityTransformationService) {
//   return new FirebaseAuthenticationService(identityService, identityTransformationService, environment.authentication);
// }


// const AuthenticationProviderType: ClassProvider
//   = { provide: AUTHENTICATION_SERVICE, useClass: (<Type<any>> ProviderAuthenticationService) };

interface AuthenticationTypeServiceProvider<T extends BaseAuthenticationService<any>> {
  provide: InjectionToken<T>;
  useFactory: (...args: Provider[]) => T;
  deps: Provider[];
}




// tslint:disable-next-line:no-shadowed-variable
export abstract class BaseAuthenticationTypeServiceProvider<T extends BaseAuthenticationService<any>> {
  deps: Provider[] = [];
  get provider(): AuthenticationTypeServiceProvider<T> {
    return {
      provide: AUTHENTICATION_SERVICE,
      useFactory: this.getFactory,
      deps: this.deps
    };
  }
  abstract getFactory(...args): T;
}





//       OidcIdentityTransformationService,
// FirebaseIdentityTransformationService,


@NgModule()
export class AuthModule {
  static forRoot(
    authenticationProviders: (any[] | Type<any> | ModuleWithProviders)[],
    // authenticationServiceProvider: AuthenticationTypeServiceProvider<BaseAuthenticationService<any>>,
    // authenticationServiceProvider: () => BaseAuthenticationTypeServiceProvider<BaseAuthenticationService<any>>,

    // authenticationServiceProvider = { provide: AUTHENTICATION_SERVICE, useClass: FirebaseAuthenticationService },
    // authenticationServiceProvider: AuthenticationTypeServiceProvider =
    // {
    //   provide: AUTHENTICATION_SERVICE,
    //   useFactory: InitOidcAuthenticationService,
    //   deps: [IdentityService, OidcIdentityTransformationService]
    // },
    // { provide: AUTHENTICATION_SERVICE, useClass: OidcAuthenticationService },
    // { provide: AUTHENTICATION_SERVICE, useClass: FirebaseAuthenticationService },
  ): (any[] | Type<any> | ModuleWithProviders)[] {
    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      authenticationProviders,
      {
      ngModule: AuthModule,
      providers: [
        // AngularFireAuth, AngularFireDatabase, // Keep this if you use Firebase, otherwise comment/remove it

        AuthenticationGuardService,
        AuthenticationService,
        IdentityService,

        AuthorizationService,
        AuthorizationGuardService,
        RouteAuthorizationGuardService,
      ]
    }];
  }


  // static forRoot(
  //   authenticationProvider: Provider =
  //     {
  //       provide: AUTHENTICATION_SERVICE,
  //       useClass: OidcAuthenticationService
  //     },
  //   policies: ReadonlyArray<Policy> = [],
  //   // providers: Array<Provider> = []
  // ): ModuleWithProviders {
  //   const providers = new Array<Provider>();

  //   // providers = providers.concat(providers);
  //   providers.push(authenticationProvider);
  //   providers.push(<ValueProvider>{ provide: PolicyService, useValue: new PolicyService(policies) });



  //   const moduleWithProviders: ModuleWithProviders = {
  //     ngModule: AuthModule,
  //     providers: providers
  //   };
  //   return moduleWithProviders;
  // }
}
