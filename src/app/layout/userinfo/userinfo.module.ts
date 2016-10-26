import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserinfoComponent } from './userinfo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserinfoComponent],
  exports: [UserinfoComponent]
})
export class UserinfoModule { }
