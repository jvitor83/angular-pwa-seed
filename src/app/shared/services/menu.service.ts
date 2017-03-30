import { MenuController, SplitPane } from 'ionic-angular';
import { Injectable, ElementRef, ApplicationRef } from '@angular/core';

@Injectable()
export class MenuService {

  public isFixed = true;

  public splitPaneLeftMenu: SplitPane = null;

  constructor(private menuController: MenuController, private app: ApplicationRef) { }

  pinToggleMenu() {
    this.isFixed = !this.isFixed;
    console.log('Menu isFixed: ' + this.isFixed);
  }

  toggleMenu() {
    this.isFixed = false;
    this.menuController.toggle('leftMenu');
  }

}
