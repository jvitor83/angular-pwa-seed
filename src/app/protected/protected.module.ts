import { NgModule }                 from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';

import { ProtectedComponent }       from './protected.component';

@NgModule({
    imports: [
        CommonModule,
        ProtectedRoutingModule
    ],
    declarations: [ ProtectedComponent ],
    exports: [ProtectedRoutingModule, ProtectedComponent]
})
export class ProtectedModule { }
