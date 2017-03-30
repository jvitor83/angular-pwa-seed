import { Router } from '@angular/router';
import { Platform, MenuController, IonicModule, SplitPane } from 'ionic-angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ApplicationRef, AfterContentInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuService } from 'app/shared/services/menu.service';

@Component({
  selector: 'seed-menu',
  templateUrl: './menu.component.html',
  animations: [
    trigger('menuState', [
      state('fixed', style({
        transformOrigin: 'center', transform: 'rotate(-10deg)'
      })),
      state('unfixed', style({
        transformOrigin: 'center', transform: 'rotate(10deg)'
      })),
      transition('fixed <=> unfixed', animate('50ms ease-in'))
    ])
  ]
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
  }


  whenSplitPaneShow() {
    if (this.platform.width() < 768) {
      return false;
     }

    let whenShow = true;
    if (this.menuService.isFixed) {
      whenShow = true;
    } else {
      whenShow = false;
    }
    return whenShow;

  }

  get menuState() {
    if (this.menuService.isFixed) { return 'fixed'; } else { return 'unfixed'; }
  }


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
