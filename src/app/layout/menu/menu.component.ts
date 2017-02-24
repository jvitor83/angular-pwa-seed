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


  }


  ngOnInit() {

  }




  ngAfterViewInit() {


  }

}
