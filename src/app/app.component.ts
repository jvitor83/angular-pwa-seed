import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, AfterContentInit, ApplicationRef, NgZone, Inject } from '@angular/core';

import { Platform, MenuController } from 'ionic-angular';

import { routerTransition } from './fade.animations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AUTH_SERVICE, BaseAuthService } from './shared/services/base-auth.service';
import { YoloBaseAuthService } from './shared/services/yolo-auth.service';





@Component({
  moduleId: module.id,
  templateUrl: './app.html',
  animations: [routerTransition]
})
export class MyApp implements OnInit {

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public application: ApplicationRef,
    public router: Router,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    @Inject(AUTH_SERVICE) private yoloAuthService: BaseAuthService<any>,
    //private yoloAuthService: YoloAuthService
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.resize.asObservable().subscribe((event) => {
        this.zone.run(() => {
          this.application.tick();
        });
      });



      // this.outlet.activateEvents.subscribe(event => {
      //   const mc = this.outlet.locationInjector.get(MenuController);
      //   const hasRightMenu = mc.getMenus().length;
      //   console.log("----lenght: " + hasRightMenu);
      // });
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menu.close();
      }
    });

    // this.router.events.filter(event => event instanceof NavigationEnd)
    // .map(() => this.activatedRoute)
    // .subscribe((event) => {
    //   this.menu.close();
    // });

    this.platform.ready().then(() => {
      // Try the autoLogin silently if the authService is YOLO
      if (this.yoloAuthService instanceof YoloBaseAuthService) {
        if (!this.yoloAuthService.auth.value.isAuthenticated) {
          this.yoloAuthService.login(false);
        }
      }

    });
  }

  closeMenu() {
    // close the menu when clicking a link from the menu
    // this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
  }

}
