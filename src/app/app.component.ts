import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, AfterContentInit, ApplicationRef, NgZone, Inject, AfterViewInit, Optional } from '@angular/core';

import { Platform, MenuController, ToastController } from 'ionic-angular';

import { routerTransition } from './fade.animations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AUTH_SERVICE, BaseAuthService } from './shared/services/base-auth.service';
import { YoloBaseAuthService } from './shared/services/yolo-auth.service';
import { SwUpdate } from '@angular/service-worker';
import { ToastOptions } from 'ionic-angular/components/toast/toast-options';
import { Http } from '@angular/http';


@Component({
  moduleId: module.id,
  templateUrl: './app.html',
  animations: [routerTransition]
})
export class MyApp implements OnInit, AfterViewInit {

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
    @Optional() private swUpdate: SwUpdate,
    public toastCtrl: ToastController,
    public http: Http,
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


  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  ngAfterViewInit() {
    this.loadScript('https://smartlock.google.com/client').then(() => {
      // Try the autoLogin silently if the authService is YOLO
      if ((<any>window).googleyolo) {
        if (this.yoloAuthService instanceof YoloBaseAuthService) {
          if (!this.yoloAuthService.auth.value.isAuthenticated) {
            this.yoloAuthService.login(false);
          }
        }
      }
    });
  }


  isCordova(platform?: Platform): boolean {
    try {
      const isCordovaVar = !!((<any>window).cordova);
      let isDesktop = false;
      if (platform != null) {
        isDesktop = platform.is('core');
      }
      return isCordovaVar && (!isDesktop);
    } catch (e) { return false; }
  }

  public get isPlatformWeb(): Boolean {
    const isCordovaVar = this.isCordova(this.platform);
    if (isCordovaVar != null && isCordovaVar && this.platform.is('mobileweb') === false) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menu.close();
      }
    });


    if (this.swUpdate) {
      this.swUpdate.available.subscribe(event => {

        console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
        const snackBarRef = this.toastCtrl.create({
          message: 'A newer version of this app is available!',
          position: 'bottom', duration: 7000,
          closeButtonText: 'UPDATE', showCloseButton: true
        });

        snackBarRef.onDidDismiss((data, role) => {
          if (role == 'close') {
            location.reload(true);
          }
        });

        snackBarRef.present();

      });
    }

    // this.router.events.filter(event => event instanceof NavigationEnd)
    // .map(() => this.activatedRoute)
    // .subscribe((event) => {
    //   this.menu.close();
    // });

  }

  closeMenu() {
    // close the menu when clicking a link from the menu
    // this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
  }

}
