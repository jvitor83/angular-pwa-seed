import { NgModule }                 from '@angular/core';
import { Routes,
         RouterModule, PreloadAllModules }             from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

//Layouts
import { FullLayoutComponent }      from './layouts/full-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    // {
    //     path: 'unauthorized',
    //     component: UnauthorizedComponent
    // },
    // {
    //     path: 'protected',
    //     component: ProtectedComponent,
    //     canActivate:[AuthGuardService]
    // },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'protected',
                loadChildren: 'app/protected/protected.module#ProtectedModule'
            },
            {
                path: 'unauthorized',
                loadChildren: 'app/unauthorized/unauthorized.module#UnauthorizedModule'
            },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ],
    providers: [ AuthGuardService, AuthService ]
})
export class AppRoutingModule {}
