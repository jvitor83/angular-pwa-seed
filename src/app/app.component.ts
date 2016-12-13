import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, AfterContentInit, ApplicationRef } from '@angular/core';

import { Platform, MenuController } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';





@Component({
  templateUrl: 'app.html',
  styleUrls: ['app.scss']
})
export class MyApp {

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public application: ApplicationRef
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.platform.onResize(() => {
        this.application.tick();
      });
    });
  }

  closeMenu() {
    // close the menu when clicking a link from the menu
    //this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
  }

}
