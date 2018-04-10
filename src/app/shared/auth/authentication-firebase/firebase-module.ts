import { NgModule, ModuleWithProviders, Type } from "@angular/core";
import { AUTHENTICATION_SERVICE } from "../authentication/authentication-service.token";
import { FirebaseAuthenticationService } from "./firebase-authentication.service";
import { AngularFireModule, FirebaseAppConfig } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FirebaseIdentityTransformationService } from "./firebase-identity-transformation.service";




@NgModule()
export class FirebaseAuthModule {
  static forRoot(authenticationSettings: FirebaseAppConfig, provide = AUTHENTICATION_SERVICE) {
    return <(any[] | Type<any> | ModuleWithProviders)[]>[
      AngularFireDatabaseModule, // Keep this if you use Firebase, otherwise comment/remove it
      AngularFireAuthModule, // Keep this if you use Firebase, otherwise comment/remove it
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
