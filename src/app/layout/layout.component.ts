import { Platform, MenuController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  template: `no layout type configured`
})
export class LayoutComponent {

  @Input() type: 'menu' | 'tab' = 'menu';

}
