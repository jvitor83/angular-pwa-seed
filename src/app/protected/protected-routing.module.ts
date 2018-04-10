import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule,
         Route}         from '@angular/router';

//import { AuthGuardService } from '../shared/services/auth-guard.service';

import { ProtectedComponent }   from './protected.component';
import { RouteAuthorizationGuardService } from '../shared/auth/authorization/route-authorization-guard.service';
import { AuthenticationGuardService } from '../shared/auth/authorization/authentication-guard.service';

const routes: Routes = [
    <Route>{
        path: '',
        component: ProtectedComponent,
        canActivate: [
          // RouteAuthorizationGuardService
          AuthenticationGuardService
        ],
        data: {
            title: 'Protected'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProtectedRoutingModule {}
