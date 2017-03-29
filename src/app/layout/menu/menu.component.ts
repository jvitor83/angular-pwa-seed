import { Router } from '@angular/router';
import { Platform, MenuController, IonicModule, SplitPane } from 'ionic-angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ApplicationRef, AfterContentInit } from '@angular/core';
import { MenuService } from 'app/shared/services/menu.service';

@Component({
  selector: 'seed-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild('splitPaneLeftMenu')
  private splitPaneLeftMenu: SplitPane;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer,
    public application: ApplicationRef,
    public router: Router,
    public menuService: MenuService
  ) {


  }


  ngOnInit() {
    // this.platform.resize.subscribe(() => {
    //   if (this.platform.width() <= 768) {
    //     this.application.tick();
    //   }
    // });
  }


  whenSplitPaneShow() {
    if (this.platform.is('mobileweb')) {
      return false;
     }


    let whenShow = true;
    // if (this.platform.width() <= 768) {
    //   whenShow = false;
    //   //this.menu.close('leftMenu');
    // } else {
    if (this.menuService.isFixed) {
      whenShow = true;
    } else {
      whenShow = false;
    }
    // }
    return whenShow;



    // if (this.menuService.isFixed) {
    //   return 'md';
    // } else {
    //   return 'xs';
    // }


    // console.log(this.platform.width());
    // if (this.platform.width() <= 768) {
    //   return 'md';
    // } else {
    //   return 'xs';
    // }
  }

  // if (this.menuService.isFixed) {
  //   if (this.platform.width() <= 768) {
  //     return 'md';
  //   }
  // }
  // return 'xs';
  //   }


  ngAfterViewInit() {
    let splm = this.splitPaneLeftMenu;
    this.menuService.splitPaneLeftMenu = splm;
  }

  fixMenu() {
    this.menuService.pinToggleMenu();
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

}
