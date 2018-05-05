import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { FirebaseIdentityTransformationService } from './firebase-identity-transformation.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AUTHENTICATION_SERVICE } from './../authentication/authentication-service.token';
import { FirebaseAppConfig, AngularFireModule } from 'angularfire2';
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { FirebaseOptions } from '@firebase/app-types';




@NgModule()
export class FirebaseAuthModule {
  static forRoot(authenticationSettings: FirebaseOptions, provide = AUTHENTICATION_SERVICE) {
    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(authenticationSettings),
      {
      ngModule: FirebaseAuthModule,
      providers: [

        FirebaseIdentityTransformationService,
        {
          provide: provide,
          useClass: FirebaseAuthenticationService,
        }
      ]
    }];
  }
}
