// import { Network } from '@ionic-native/network/ngx';
// import { IonicPageModule } from '@ionic/angular';
import { LayoutModule } from './../layout/layout.module';
import { NgModule }                 from '@angular/core';

import { UnauthorizedRoutingModule }       from './unauthorized-routing.module';
import { UnauthorizedComponent }       from './unauthorized.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        UnauthorizedRoutingModule,
        LayoutModule,
        // IonicPageModule.forChild(UnauthorizedComponent),
    ],
    // providers: [ Network ],
    declarations: [ UnauthorizedComponent ],
    exports: [UnauthorizedRoutingModule, UnauthorizedComponent]
})
export class UnauthorizedModule { }
