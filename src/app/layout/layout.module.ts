import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { NavbarModule } from './navbar/navbar.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { MenuModule } from './menu/menu.module';
import { UserinfoModule } from './userinfo/userinfo.module';
import { SysteminfoModule } from './systeminfo/systeminfo.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    SidenavModule,
    MenuModule,
    UserinfoModule,
    SysteminfoModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent, MenuModule]
})
export class LayoutModule { }
