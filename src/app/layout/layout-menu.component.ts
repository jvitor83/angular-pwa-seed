import { Platform, MenuController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { LayoutComponent } from "./layout.component";

@Component({
  moduleId: module.id,
  selector: 'seed-layout [type="menu"]',
  template:
  `
  <seed-menu *ngIf="visible; else hidden" [infoAtRightMenu]="infoAtRightMenu" [showRightMenuButton]="showRightMenuButton" >
    <div seed-menu-items>
      <ng-content select="[menu-items]"></ng-content>
    </div>
    <ng-content *ngTemplateOutlet="hidden"></ng-content>
  </seed-menu>
  <ng-template #hidden><ng-content></ng-content></ng-template>
  `
})
export class LayoutMenuComponent extends LayoutComponent {
}
