import { MenuController, SplitPane } from 'ionic-angular';
import { Injectable, ElementRef, ApplicationRef } from '@angular/core';


abstract class MenuService {

  public isFixed = true;

  public abstract menuSide: 'left' | 'right';

  private get menuSideName() {
    return this.menuSide + 'Menu';
  }

  constructor(public menuController: MenuController) {
    
  }

  pinToggleMenu() {
    this.isFixed = !this.isFixed;
    console.log('Menu isFixed: ' + this.isFixed);
  }

  toggleMenu() {
    this.isFixed = false;
    //this.menuController.toggle(this.menuSideName);
    const menus = this.menuController.getMenus();
    const menusFilter = menus.filter(m => m.side == this.menuSide);

    if(menusFilter && menusFilter.length > 0){
      const menu = menusFilter[0];
      menu.enable(true);
      menu.toggle();
      //this.menuController.toggle(menu.id);
    }
  }

}



@Injectable()
export class LeftMenuService extends MenuService {
  public menuSide: 'left' | 'right' = 'left';

  constructor(public menuController: MenuController) {
    super(menuController);
  }
}

@Injectable()
export class RightMenuService extends MenuService {
  public menuSide: 'left' | 'right' = 'right';

  constructor(public menuController: MenuController) {
    super(menuController);
  }
}
