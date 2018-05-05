import { IdentityService } from './shared/auth/authentication/identity.service';

import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  HashLocationStrategy/*, PathLocationStrategy*/
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicModule, Platform, LoadingController } from '@ionic/angular';

import { MyApp, ComponentName } from './app.component';

import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { LayoutModule } from './layout/layout.module';
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
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { createCustomElement } from '@angular/elements';




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

    IonicModule.forRoot(),



    // // // Use any OpenID Connect provider (with the generic client: 'OidcClient') - ex: google, microsoft, facebook, etc
    // AuthModule.forRoot(
    //   OidcAuthModule.forRoot(environment.authentication)
    // ),

    // // Use OpenYOLO with any OpenID Connect provider (using generic client: 'OidcClient') at First Login
    AuthModule.forRoot(
      YoloAuthModule.forRoot(
        OidcAuthModule.forRoot(environment.authentication, YOLO_AUTHENTICATION_SERVICE),
        [{ uri: environment.authentication.authority, clientId: environment.authentication.client_id }]
      )
    ),

    // // // Use Firebase at Login
    // AuthModule.forRoot(
    //   FirebaseAuthModule.forRoot(environment.firebase)
    // ),

    // // // Use OpenYOLO with Firebase at First Login
    // AuthModule.forRoot(
    //   YoloAuthModule.forRoot(
    //     FirebaseAuthModule.forRoot(environment.firebase, YOLO_AUTHENTICATION_SERVICE),
    //     [{ uri: environment.firebase.authDomain, clientId: environment.firebase.projectId }]
    //   )
    // ),


    LayoutModule,

    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [MyApp],
  entryComponents: [
    MyApp
  ],
  providers: [

    Network,
    StatusBar,
    SplashScreen,

    // { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy // This strategy with base-href './' allow to move the app to any subsite and works
      // useClass: PathLocationStrategy // Only if passed the --base-href argument at build & the server has url rewrite to index.html
    },


    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationHttpInterceptor,
      multi: true
    },

    // AuthGuardService,


    // YoloAuthService
  ]
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {
    const AppElement = createCustomElement(MyApp, { injector: this.injector });
    customElements.define(ComponentName, AppElement);
  }
}
