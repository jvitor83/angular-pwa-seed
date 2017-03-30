import { UserinfoComponent } from './userinfo/userinfo.component';
import { PopoverController } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuService } from 'app/shared/services/menu.service';

@Component({
  selector: 'seed-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(public menuService: MenuService, private popoverCtrl: PopoverController) { }

  //@ViewChild('content', { read: ElementRef }) content: ElementRef;
  //@ViewChild('splitPaneLeftMenu', { read: ElementRef }) content: ElementRef;

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  get name() {
    return 'Anonimous';
  }

  // presentPopover(ev) {

  //     let popover = this.popoverCtrl.create(UserinfoComponent);

  //     popover.present({
  //       ev: ev
  //     });
  //   }

}
