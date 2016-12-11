import { Platform, MenuController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seed-layout',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit {

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) { }

  ngOnInit() {
    // this.platform.ready().then(() => {
    //   if (this.platform.is('core')) {
    //     let leftMenu = this.menu.get('left');
    //     leftMenu.setOpen(true, false);
    //     this.menu.unregister(leftMenu);
    //     // leftMenu.swipeEnabled = false;

    //   }
    // });
  }

}
