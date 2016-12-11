import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { CommonModule, LocationStrategy,
         HashLocationStrategy/*, PathLocationStrategy*/ }         from '@angular/common';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { ChartsModule }                 from 'ng2-charts/ng2-charts';

import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { UnauthorizedModule } from './unauthorized/unauthorized.module';
import { ProtectedModule } from './protected/protected.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    Ng2BootstrapModule,
    ChartsModule,

    IonicModule.forRoot(MyApp),

    LayoutModule,

    DashboardModule,
    ProtectedModule,
    UnauthorizedModule
  ],
  bootstrap: [IonicApp],
  //bootstrap: [MyApp],
  // entryComponents: [
  //   MyApp
  // ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy // This strategy with base-href './' allow to move the app to any subsite and works
      // useClass: PathLocationStrategy // Only if passed the --base-href argument at build & the server has url rewrite to index.html
    },
    AuthService,
    AuthGuardService
  ]
})
export class AppModule { }
