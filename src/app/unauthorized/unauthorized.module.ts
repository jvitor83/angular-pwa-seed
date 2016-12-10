import { HeaderModule } from './../header/header.module';
import { NgModule }                 from '@angular/core';

import { UnauthorizedRoutingModule }       from './unauthorized-routing.module';
import { UnauthorizedComponent }       from './unauthorized.component';

@NgModule({
    imports: [
        UnauthorizedRoutingModule,
        HeaderModule
    ],
    declarations: [ UnauthorizedComponent ],
    exports: [UnauthorizedRoutingModule, UnauthorizedComponent]
})
export class UnauthorizedModule { }
