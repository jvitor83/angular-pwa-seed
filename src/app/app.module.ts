import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  HashLocationStrategy/*, PathLocationStrategy*/
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

// import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
// import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
// import { FirebaseAuthService } from './shared/services/firebase-auth.service';

import { OidcAuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { LayoutModule } from './layout/layout.module';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';
import { AUTH_SERVICE } from "app/shared/services/base-auth.service";
import { httpFactory } from "app/shared/services/intercepted-http.service";


@NgModule({
  declarations: [
    MyApp,
    MenuItemComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    Ng2BootstrapModule,
    ChartsModule,

    IonicModule.forRoot(MyApp),

    // AngularFireModule.initializeApp(environment.firebase), //Keep this if you use Firebase, otherwise comment/remove it
    // AngularFireDatabaseModule, //Keep this if you use Firebase, otherwise comment/remove it
    // AngularFireAuthModule, //Keep this if you use Firebase, otherwise comment/remove it

    LayoutModule
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

    { provide: AUTH_SERVICE, useClass: OidcAuthService }, //If want to use an OpenID/OAuth2 Auth Provider (generically)
    //{ provide: AUTH_SERVICE, useClass: FirebaseAuthService }, //If want to use Firebase as an Auth Provider

    //AngularFireAuth, AngularFireDatabase, //Keep this if you use Firebase, otherwise comment/remove it

    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, AUTH_SERVICE]
    },

    AuthGuardService
  ]
})
export class AppModule { }
