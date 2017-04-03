import { IonicModule } from 'ionic-angular';
import { LayoutModule } from './../layout/layout.module';
import { NgModule }                 from '@angular/core';

import { UnauthorizedRoutingModule }       from './unauthorized-routing.module';
import { UnauthorizedComponent }       from './unauthorized.component';

@NgModule({
    imports: [
        UnauthorizedRoutingModule,
        LayoutModule,
        IonicModule
    ],
    declarations: [ UnauthorizedComponent ],
    exports: [UnauthorizedRoutingModule, UnauthorizedComponent]
})
export class UnauthorizedModule { }
