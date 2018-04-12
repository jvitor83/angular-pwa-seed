import { IdentityService } from './shared/auth/authentication/identity.service';

import { LoadingController } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  HashLocationStrategy/*, PathLocationStrategy*/
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';

import { MyApp } from './app.component';

import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { LayoutModule } from './layout/layout.module';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';
import { AuthenticationHttpInterceptor } from './shared/services/intercepted-http.service';
import { AUTHENTICATION_SERVICE } from './shared/auth/authentication/authentication-service.token';
import { OidcIdentityTransformationService } from './shared/auth/authentication-oidc/oidc-identity-transformation.service';
import { InitOidcAuthenticationService, OidcAuthModule } from './shared/auth/authentication-oidc/oidc-module';
import { AuthModule } from './shared/auth/auth.module';
import { YoloAuthModule } from './shared/auth/authentication-yolo/yolo-module';
import { YOLO_AUTHENTICATION_SERVICE } from './shared/auth/authentication-yolo/yolo-authentication-service.token';
import { FirebaseAuthModule } from './shared/auth/authentication-firebase/firebase-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    MyApp,
    MenuItemComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,

    ChartsModule,

    IonicModule.forRoot(MyApp),



    // // // Use any OpenID Connect provider (with the generic client: 'OidcClient') - ex: google, microsoft, facebook, etc
    // AuthModule.forRoot(
    //   OidcAuthModule.forRoot(environment.authentication)
    // ),

    // // // Use OpenYOLO with any OpenID Connect provider (using generic client: 'OidcClient') at First Login
    // AuthModule.forRoot(
    //   YoloAuthModule.forRoot(
    //     OidcAuthModule.forRoot(environment.authentication, YOLO_AUTHENTICATION_SERVICE),
    //     [{ uri: environment.authentication.authority, clientId: environment.authentication.client_id }]
    //   )
    // ),

    // // Use OpenYOLO with Firebase at First Login
    AuthModule.forRoot(
      FirebaseAuthModule.forRoot(environment.firebase)
    ),


    LayoutModule,

    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [


    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy // This strategy with base-href './' allow to move the app to any subsite and works
      // useClass: PathLocationStrategy // Only if passed the --base-href argument at build & the server has url rewrite to index.html
    },

    Network,
    StatusBar,
    SplashScreen,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationHttpInterceptor,
      multi: true
    },

    // AuthGuardService,


    // YoloAuthService
  ]
})
export class AppModule { }
