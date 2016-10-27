import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { UnauthorizedComponent }   from './unauthorized.component';

const routes: Routes = [
    {
        path: '',
        component: UnauthorizedComponent,
        data: {
            title: 'Unauthorized'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnauthorizedRoutingModule {}
