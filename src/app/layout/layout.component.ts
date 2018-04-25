import { Router, NavigationEnd } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Component, OnInit, Input, Injector, ApplicationRef, OnChanges, SimpleChanges, AfterViewInit, NgZone, AfterContentInit, AfterViewChecked } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})
export class LayoutComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.rightMenuButton(this.menuController);
  }

  constructor(public router: Router, public injector: Injector, public zone: NgZone,
    public platform: Platform, public menuController: MenuController, public application: ApplicationRef) {

    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {
        this.rightMenuButton(menuController);
      });
  }

  protected rightMenuButton(menuController: MenuController) {
    setTimeout(() => {
      const menuC = menuController;

      menuC.getMenus().then((menus: Array<HTMLIonMenuElement>) => {
        menus.forEach(m => m.disabled = false);

        const hasRightMenu = menus.filter(m => {
          const bool = (m.side === 'end') && (!m.disabled);
          return bool;
        }).length > 0;

        // //Configure LeftMenu (fix)
        // const leftMenu = menus.filter(m => {
        //   const bool = !m.isRightSide;
        //   return bool;
        // })[0];
        // if (leftMenu) {
        //   leftMenu.swipeEnable(true);
        // }



        // console.log(event);
        // console.log("hasRightMenu: " + hasRightMenu);
        this.showRightMenuButton = hasRightMenu;
        this.application.tick();
      });
    }, 1000);
  }

  @Input() public infoAtRightMenu?: boolean = false;
  @Input() public showRightMenuButton?: boolean = false;
}
