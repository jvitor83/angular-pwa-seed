import { Platform, MenuController } from 'ionic-angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ApplicationRef } from '@angular/core';

@Component({
  selector: 'seed-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer,
    public application: ApplicationRef) { }

  width() {
    if (this.platform.is('core')) {
      return this.platform.width() - this.menu.get('leftMenu').width();
    } else {
      return this.platform.width();
    }
  }

  setContentFullWidth() {
    this.application.tick();
  }

  @ViewChild('emptyElement') emptyElement: ElementRef;

  @ViewChild('content') content: ElementRef;

  emptyElementContent: any;
  emptyElementBackdrop: any;

  contentElementContent: any;
  contentElementBackdrop: any;

  emptyContent: any;

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.platform.ready().then(() => {

      if (this.platform.is('core')) {
        let leftMenu = this.menu.get('leftMenu');
        leftMenu.open();

        //leftMenu.getBackdropElement().style.pointerEvents = 'none';
        leftMenu.getContentElement().style.pointerEvents = 'none';
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

}
