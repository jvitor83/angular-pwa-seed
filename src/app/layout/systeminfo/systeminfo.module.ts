import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysteminfoComponent } from './systeminfo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SysteminfoComponent],
  exports: [SysteminfoComponent]
})
export class SysteminfoModule { }
