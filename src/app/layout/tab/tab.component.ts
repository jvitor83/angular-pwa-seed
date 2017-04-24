import { Router } from '@angular/router';
import { Component, OnInit, Directive, Input, ContentChildren, QueryList, ViewChild, AfterViewInit, AfterContentInit, forwardRef, ViewChildren, ViewContainerRef, ElementRef, Renderer } from '@angular/core';
import { List, Item, Tabs, Tab } from 'ionic-angular';
import { MenuItemComponent } from "../../shared/components/menu-item/menu-item.component";


@Component({
  selector: 'seed-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterContentInit {
  ngAfterContentInit(): void {

    console.log('this.menuItems.length');
    console.log(this.menuItems.length);
  }


  protected items: Iterable<Item>;

  @ContentChildren(forwardRef(() => MenuItemComponent), { descendants: true }) menuItems: QueryList<MenuItemComponent>;
  //@ViewChild(forwardRef(() => Tabs)) tabs: Tabs;

  ngAfterViewInit() {
    // console.log('this.tabs');
    // console.log(this.tabs);


    // this.tabs.setElementClass('tab-button', true);



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
