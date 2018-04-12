import { LeftMenuService, RightMenuService } from './../../shared/services/menu.service';
import { Router } from '@angular/router';
import { Platform, MenuController, IonicModule, SplitPane } from '@ionic/angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ApplicationRef, AfterContentInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  moduleId: module.id,
  selector: 'seed-menu',
  templateUrl: './menu.component.html',
  animations: [
    trigger('leftMenuState', [
      state('fixed', style({
        transformOrigin: 'center', transform: 'rotate(-10deg)'
      })),
      state('unfixed', style({
        transformOrigin: 'center', transform: 'rotate(10deg)'
      })),
      transition('fixed <=> unfixed', animate('50ms ease-in'))
    ]),
    trigger('rightMenuState', [
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

  @Input() public showRightMenuButton?: boolean = true;

  @Input() public infoAtRightMenu?: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer,
    public application: ApplicationRef,
    public router: Router,
    public leftMenuService: LeftMenuService,
    public rightMenuService: RightMenuService
  ) {


  }


  ngOnInit() {
    // Default is not fixed for the RightMenu
    this.rightMenuService.pinToggleMenu();
  }


  whenSplitPaneShow(width: number) {
    if (this.platform.width() < width) {
      return false;
     }

    let whenShow = true;
    if (this.leftMenuService.isFixed) {
      whenShow = true;
    } else {
      whenShow = false;
    }
    return whenShow;

  }


  whenRightSplitPaneShow(width: number) {
    if (this.platform.width() < width) {
      return false;
     }

    let whenShow = true;
    if (this.rightMenuService.isFixed) {
      whenShow = true;
    } else {
      whenShow = false;
    }
    return whenShow;

  }



  get leftMenuState() {
    if (this.leftMenuService.isFixed) { return 'fixed'; } else { return 'unfixed'; }
  }

  get rightMenuState() {
    if (this.rightMenuService.isFixed) { return 'fixed'; } else { return 'unfixed'; }
  }


  ngAfterViewInit() {
  }

  fixMenu() {
    this.leftMenuService.pinToggleMenu();
  }

  fixRightMenu() {
    this.rightMenuService.pinToggleMenu();
  }

  toggleMenu() {
    this.leftMenuService.toggleMenu();
  }

}
