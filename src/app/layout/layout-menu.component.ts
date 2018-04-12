import { Platform, MenuController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { LayoutComponent } from "./layout.component";

@Component({
  moduleId: module.id,
  selector: 'seed-layout [type="menu"]',
  template:
  `
  <seed-menu [infoAtRightMenu]="infoAtRightMenu" [showRightMenuButton]="showRightMenuButton" >
    <div seed-menu-items>
      <ng-content select="[menu-items]"></ng-content>
    </div>
    <ng-content></ng-content>
  </seed-menu>
  `
})
export class LayoutMenuComponent extends LayoutComponent {
}
