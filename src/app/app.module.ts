import { NgModule, ErrorHandler } from '@angular/core';
import {
  CommonModule, LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { UnauthorizedModule } from './unauthorized/unauthorized.module';
import { ProtectedModule } from './protected/protected.module';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    AppRoutingModule,

    IonicModule.forRoot(MyApp),

    ProtectedModule,
    UnauthorizedModule
  ],
  bootstrap: [IonicApp],
  //bootstrap: [MyApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
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
