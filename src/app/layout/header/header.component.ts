import { UserinfoComponent } from './userinfo/userinfo.component';
import { PopoverController, Platform } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuService } from 'app/shared/services/menu.service';

@Component({
  selector: 'seed-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(public menuService: MenuService, private platform: Platform, private popoverCtrl: PopoverController) { }

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

  get canShowUserComponentInHeader() {
    if (this.platform.width() >= 1440) { return true; } else { return false; }
  }



}
