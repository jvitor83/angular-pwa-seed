import { Router } from '@angular/router';
import { Platform, MenuController, IonicModule } from 'ionic-angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ApplicationRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'seed-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, AfterViewInit {

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer,
    public application: ApplicationRef,
    public router: Router
  ) {

    router.events.subscribe((val) => {
      // see also
      if (!platform.is('core')) {
        if (menu.isOpen()) {
          menu.close();
        }
      }
    });

    this.platform.ready().then(() => {

      if (this.platform.is('core')) {

        let leftMenu = this.menu.get('leftMenu');
        this.renderer.setElementAttribute(this.leftMenu.nativeElement, 'type', 'push');
        leftMenu.type = 'push';
        leftMenu.open();

        let drop = function (ev: UIEvent) {
          ev.preventDefault();
          //ev.stopPropagation();
          //this._menuCtrl.close();

          return true;
        };

        
        leftMenu.onBackdropClick = drop;
        //leftMenu.backdrop = null;




        let rightMenu = this.menu.get('rightMenu');
        this.renderer.setElementAttribute(this.rightMenu.nativeElement, 'type', 'overlay');
        rightMenu.type = 'overlay';
        // rightMenu.onBackdropClick = drop;
        //rightMenu.open();






        //leftMenu.getContentElement().style.pointerEvents = 'none';
        //leftMenu.enable(false);
        //this.menu.unregister(leftMenu);
        // leftMenu.swipeEnabled = false;

        //this.emptyBackdrop = leftMenu.backdrop;

        // let rightMenu = this.menu.get('rightMenu');
        // this.emptyElementContent = rightMenu.content;
        // this.emptyElementBackdrop = rightMenu.backdrop;

        // this.contentElementContent = leftMenu.content;
        // this.contentElementBackdrop = leftMenu.backdrop;

        // leftMenu.content = this.emptyElementContent;
        // leftMenu.backdrop = this.emptyElementBackdrop;

        //leftMenu.enable(false);
        //this.menu.unregister(leftMenu);
        //leftMenu.backdrop = this.emptyElement.nativeElement;

      }
    });

  }

  width() {

    let isDesktop = this.platform.is('core');
    if (isDesktop) {


      let leftMenu = this.menu.get('leftMenu');
      let rightMenu = this.menu.get('rightMenu');

      if (leftMenu.isOpen && (!rightMenu.isOpen)) {
        console.log('leftMenu.isOpen && (!rightMenu.isOpen)');
        leftMenu.enable(true);
        this.renderer.setElementClass(this.content.nativeElement, 'menu-content-open', false);
        return this.platform.width() - leftMenu.width();
        // } else if (rightMenu.isOpen && (!leftMenu.isOpen)) {
        //   console.log('rightMenu.isOpen && (!leftMenu.isOpen)');
        //   this.renderer.setElementClass(this.content.nativeElement, 'menu-content-open', false);
        //   this.renderer.setElementStyle(this.content.nativeElement, 'transform', 'translateX(-' + rightMenu.width() + 'px)');
        //   return this.platform.width() - rightMenu.width();
      } else if (leftMenu.isOpen && rightMenu.isOpen) {
        leftMenu.enable(false);
        //   console.log('leftMenu.isOpen && rightMenu.isOpen');
        //   this.renderer.setElementClass(this.content.nativeElement, 'menu-content-open', false);
        //   this.renderer.setElementStyle(this.content.nativeElement, 'transform', 'translateX(' + (leftMenu.width() + rightMenu.width()) + 'px)');
        //   return this.platform.width() - (leftMenu.width() + rightMenu.width());
      } else {
        this.platform.width();
      }



      // let offset = 0;
      // if (this.menu.get('leftMenu').isOpen) {
      //   offset = offset + this.menu.get('leftMenu').width();
      // }
      // if (this.menu.get('rightMenu').isOpen) {
      //   this.renderer.setElementStyle(this.content.nativeElement, 'transform', 'translateX(-' + offset + 'px)');
      //   offset = offset + this.menu.get('rightMenu').width();
      // }


      // return this.platform.width() - offset;


    } else {
      return this.platform.width();
    }
  }

  setContentFullWidth() {
    this.application.tick();
  }



  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  @ViewChild('leftMenu', { read: ElementRef }) leftMenu: ElementRef;

  @ViewChild('rightMenu', { read: ElementRef }) rightMenu: ElementRef;


  ngOnInit() {

  }




  ngAfterViewInit() {


  }

}
