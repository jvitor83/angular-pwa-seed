import { Router, NavigationEnd } from '@angular/router';
import { Platform, MenuController } from 'ionic-angular';
import { Component, OnInit, Input, Injector, ApplicationRef, OnChanges, SimpleChanges, AfterViewInit, NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})
export class LayoutComponent {

  constructor(public router: Router, public injector: Injector, public zone: NgZone, public platform: Platform, public menuController: MenuController, public application: ApplicationRef) {

    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {
        setTimeout(() => {



          const menuC = menuController;

          menuC.getMenus().forEach(m => m.enable(true));

          const menus = menuC.getMenus();
          const hasRightMenu = menus.filter(m => {
            const bool = m.isRightSide && m.enabled;
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

        }, 100);
      });
  }



  @Input() public infoAtRightMenu?: boolean = false;
  @Input() public showRightMenuButton?: boolean = false;
}
