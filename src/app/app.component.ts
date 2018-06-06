import { Platform, MenuController, ToastController } from '@ionic/angular';
import { AUTHENTICATION_SERVICE } from './shared/auth/authentication/authentication-service.token';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet, NavigationStart } from '@angular/router';
import {
  Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, AfterContentInit,
  ApplicationRef, NgZone, Inject, AfterViewInit, Optional
} from '@angular/core';


import { routerTransition } from './fade.animations';
//import { AUTH_SERVICE, BaseAuthService } from './shared/services/base-auth.service';
//import { YoloBaseAuthService } from './shared/services/yolo-auth.service';
import { SwUpdate } from '@angular/service-worker';
import { Http } from '@angular/http';
import { IdentityService } from './shared/auth/authentication/identity.service';
import { YoloAuthenticationService } from './shared/auth/authentication-yolo/base-yolo-authentication.service';
import { ProviderAuthenticationService } from './shared/auth/authentication/provider-authentication.service';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs';

export const ComponentName = 'ion-app';
@Component({
  moduleId: module.id,
  selector: ComponentName,
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
    @Inject(AUTHENTICATION_SERVICE) private authenticationService: ProviderAuthenticationService,
    private identityService: IdentityService,
    @Optional() private swUpdate: SwUpdate,
    public toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  @ViewChild(RouterOutlet) public outlet: RouterOutlet;

  getState(outlet) {
    const ret = outlet.activatedRouteData.title;
    return ret;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  updateNetworkStatusUI() {
    if (navigator.onLine) {
      // You might be online
      (document.querySelector("body") as any).style = "";
    } else {
      // 100% Sure you are offline
      (document.querySelector("body") as any).style = "filter: grayscale(0.8)";
    }
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
    if (this.authenticationService instanceof YoloAuthenticationService) {
      if (!this.identityService.userValue.isAuthenticated) {
        this.authenticationService.login(false);
      }
    }
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

    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);


    this.router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event) => this.menu.close());


    if (this.swUpdate && this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {

        console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
        const snackBarRef = this.toastCtrl.create({
          message: 'A newer version of the app is available!',
          position: 'bottom', duration: 5000,
          closeButtonText: 'Update', showCloseButton: true
        });
        snackBarRef.then((toastElement: HTMLIonToastElement) => {
          toastElement.onDidDismiss(det => {
            this.swUpdate.activateUpdate().then(() => {
              location.reload(true);
            });
          });
          toastElement.present();
        });

      });

      this.swUpdate.activated.subscribe(event => {
        console.log('[App] Old version was', event.previous);
        console.log('[App] New version is', event.current);
      });

      // Why zone outside? See https://github.com/angular/angular/issues/20970#issuecomment-353093686
      this.zone.runOutsideAngular(() => {
        const timeToCheckUpdate = 1 * 60 * 1000;
        timer(1 * 1000, timeToCheckUpdate).subscribe(value => {
          this.zone.run(() => {
            this.swUpdate.checkForUpdate()
              .then(() => {
                console.log('[App] checkForUpdate completed!')
              })
              .catch(err => {
                console.error(err);
              });
          });
        });
      });

      // this.router.events.filter(event => event instanceof NavigationEnd)
      // .map(() => this.activatedRoute)
      // .subscribe((event) => {
      //   this.menu.close();
      // });

    }

  }
}