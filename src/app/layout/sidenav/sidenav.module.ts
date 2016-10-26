import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from '../menu/menu.module';
import { SidenavComponent } from './sidenav.component';


@NgModule({
  imports: [
    CommonModule,
    MenuModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class SidenavModule { }
