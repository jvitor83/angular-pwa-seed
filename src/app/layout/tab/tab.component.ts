import { Router } from '@angular/router';
import { Component, OnInit, Directive, Input, ContentChildren, QueryList, ViewChild, AfterViewInit, AfterContentInit, forwardRef, ViewChildren, ViewContainerRef, ElementRef, Renderer } from '@angular/core';
import { List, Item, Tabs, Tab } from 'ionic-angular';
import { IonItem } from "../ion-item.directive";


@Component({
  selector: 'seed-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterViewInit {

  protected items: Iterable<Item>;

  @ViewChild(forwardRef(() => Tabs)) tabs: Tabs;

  ngAfterViewInit() {
    console.log('this.tabs');
    console.log(this.tabs);


    this.tabs.setElementClass('tab-button', true);


    //this.tabs.forEach((tab) => tab.setElementClass('tab-button', true));
    // this.tabs.setElementClass('tab-button', true);
    // const listNativeElement = <HTMLElement>this.list.getNativeElement();
    // const items = listNativeElement.querySelectorAll('[ion-item]');
    // this.items = <any>items;
  }

  constructor(private router: Router, private renderer: Renderer) { }

  log(item) {
    console.log(item);
  }

  navigate(item) {
    console.log(item);

    //const link = item.;
    //console.log(link);
    //this.router.navigate([link]);
    //this.router.navigateByUrl(href);
  }

}
