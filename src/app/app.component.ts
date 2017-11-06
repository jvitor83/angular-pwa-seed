import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, AfterContentInit, ApplicationRef, NgZone } from '@angular/core';

import { Platform, MenuController } from 'ionic-angular';

// import { StatusBar, Splashscreen } from 'ionic-native';
import { routerTransition } from "app/fade.animations";





@Component({
  moduleId: module.id,
  templateUrl: './app.html',
  animations: [routerTransition]
})
export class MyApp {

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public application: ApplicationRef,
    public router: Router,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeApp();
  }

  @ViewChild(RouterOutlet) public outlet: RouterOutlet;

  getState(outlet) {
    let ret = outlet.activatedRouteData.title;
    return ret;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
      this.platform.resize.asObservable().subscribe((event) => {
        this.zone.run(() => {
          this.application.tick();
        });
      });

      this.router.events.filter(event => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .subscribe((event) => {
          this.menu.close();
        });


      // this.outlet.activateEvents.subscribe(event => {
      //   const mc = this.outlet.locationInjector.get(MenuController);
      //   const hasRightMenu = mc.getMenus().length;
      //   console.log("----lenght: " + hasRightMenu);
      // });
    });
  }

  closeMenu() {
    // close the menu when clicking a link from the menu
    // this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
  }

}
