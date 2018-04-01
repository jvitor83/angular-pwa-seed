import { LayoutModule } from './../layout/layout.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';


import { IonicModule, IonicPageModule } from 'ionic-angular';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        //IonicModule,
        //IonicModule.forRoot(LoginComponent),
        IonicPageModule.forChild(LoginComponent),
        ChartsModule,
        LayoutModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
