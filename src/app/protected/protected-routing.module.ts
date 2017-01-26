import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';

import { ProtectedComponent }   from './protected.component';

const routes: Routes = [
    {
        path: '',
        component: ProtectedComponent,
        canActivate:[ AuthGuardService ],
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
