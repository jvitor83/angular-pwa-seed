import { MyApp } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AUTH_SERVICE } from './shared/services/base-auth.service';
import { OidcAuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';



export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'login',
                loadChildren: './login/login.module'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'protected',
                loadChildren: './protected/protected.module#ProtectedModule'
            },
            {
                path: 'unauthorized',
                loadChildren: './unauthorized/unauthorized.module#UnauthorizedModule'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
