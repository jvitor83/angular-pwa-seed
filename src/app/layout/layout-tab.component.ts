import { Platform, MenuController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { LayoutComponent } from "./layout.component";

@Component({
  selector: 'seed-layout [type="tab"]',
  template:
  `
  <seed-tab>
    <div seed-menu-items>
      <ng-content select="[menu-items]"></ng-content>
    </div>
    <ng-content></ng-content>
  </seed-tab>
  `
})
export class LayoutTabComponent extends LayoutComponent {
}
