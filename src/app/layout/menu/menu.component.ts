import { LeftMenuService, RightMenuService } from './../../shared/services/menu.service';
import { Router } from '@angular/router';
import { Platform, MenuController, IonicModule, SplitPane, Menu } from '@ionic/angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ApplicationRef, Input, Renderer2, Directive, NgZone } from '@angular/core';
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

  @ViewChild('leftMenu')
  private leftMenu: ElementRef<Menu>;

  @ViewChild('rightMenu')
  private rightMenu: ElementRef<Menu>;


  @Input() public showRightMenuButton?: boolean = true;

  @Input() public infoAtRightMenu?: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer2,
    public application: ApplicationRef,
    public router: Router,
    public leftMenuService: LeftMenuService,
    public rightMenuService: RightMenuService,
    private zone: NgZone
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

  menuChanged() {
    // Fix for the multiple menu opened
    setTimeout(() => {
      if (this.leftMenuService.isFixed) {
        // console.log('left is fixed');
        this.renderer.addClass(this.leftMenu.nativeElement, 'menu-pane-visible');
      } else {
        // console.log('left is NOT fixed');
        this.renderer.removeClass(this.leftMenu.nativeElement, 'menu-pane-visible');
      }
    });
    setTimeout(() => {
      if (this.rightMenuService.isFixed) {
        // console.log('right is fixed');
        this.renderer.addClass(this.rightMenu.nativeElement, 'menu-pane-visible');
      } else {
        // console.log('right is NOT fixed');
        this.renderer.removeClass(this.rightMenu.nativeElement, 'menu-pane-visible');
      }
    });
  }

  ngAfterViewInit() {
    console.log('init after menu');


    // this.leftMenu.nativeElement.ionMenuChange.asObservable().subscribe(() => {
    //   console.log('menu changed');
    //   if (this.leftMenuState === 'fixed') {
    //     this.renderer.addClass(this.leftMenu.nativeElement, 'menu-pane-visible');
    //   } else {
    //     this.renderer.removeClass(this.leftMenu.nativeElement, 'menu-pane-visible');
    //   }
    // });
    // this.rightMenu.nativeElement.ionMenuChange.asObservable().subscribe(() => {
    //   console.log('menu changed');
    //   if (this.rightMenuState === 'fixed') {
    //     this.renderer.addClass(this.rightMenu.nativeElement, 'menu-pane-visible');
    //   } else {
    //     this.renderer.removeClass(this.rightMenu.nativeElement, 'menu-pane-visible');
    //   }
    // });
  }

  fixMenu() {
    this.menuChanged();
    this.leftMenuService.pinToggleMenu();
    // setTimeout(() => {
    //   if (this.rightMenuState === 'fixed') {
    //     this.renderer.addClass(this.rightMenu.nativeElement, 'menu-pane-visible');
    //   } else {
    //     this.renderer.removeClass(this.rightMenu.nativeElement, 'menu-pane-visible');
    //   }
    // });
  }

  fixRightMenu() {
    this.menuChanged();
    this.rightMenuService.pinToggleMenu();
    // setTimeout(() => {
    //   if (this.rightMenuState === 'fixed') {
    //     this.renderer.addClass(this.rightMenu.nativeElement, 'menu-pane-visible');
    //   } else {
    //     this.renderer.removeClass(this.rightMenu.nativeElement, 'menu-pane-visible');
    //   }
    // });
  }

  toggleMenu() {
    this.leftMenuService.toggleMenu();
  }

}
