import { IonicPageModule } from 'ionic-angular';
import { LayoutModule } from './../layout/layout.module';
import { NgModule }                 from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';

import { ProtectedComponent }       from './protected.component';

@NgModule({
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        IonicPageModule.forChild(ProtectedComponent),
        LayoutModule
    ],
    declarations: [ ProtectedComponent ],
    exports: [ProtectedRoutingModule, ProtectedComponent]
})
export class ProtectedModule { }
