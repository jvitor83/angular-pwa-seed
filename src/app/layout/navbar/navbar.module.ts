import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from '../menu/menu.module';
import { UserinfoModule } from '../userinfo/userinfo.module';
import { SysteminfoModule } from '../systeminfo/systeminfo.module';

import { NavbarComponent } from './navbar.component';


@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    UserinfoModule,
    SysteminfoModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
