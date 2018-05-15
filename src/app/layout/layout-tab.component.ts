import { Platform, MenuController, Item } from '@ionic/angular';
import { Component, OnInit, Input, forwardRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { LayoutComponent } from "./layout.component";
import { MenuItemComponent } from "../shared/components/menu-item/menu-item.component";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  template: `<ion-content></ion-content>`
})
export class TabNone { }

@Component({
  moduleId: module.id,
  selector: 'seed-layout [type="tab"]',
  template:
  `
    <ion-header>
    <seed-header [showLeftMenuButton]="false" [showRightMenuButton]="showRightMenuButton" [infoAtRightMenu]="false">
      <ion-tabs [hidden]="showToolbarTab" layout-tabs tabsLayout="icon-top" >
        <ion-tab [component]="dummyTab" layout-tab *ngFor="let menuItem of menuItems; let i = index;"
         (ionSelect)="navigateTo(menuItem.link)" label="{{menuItem.title}}" icon="{{menuItem.icon}}"></ion-tab>
      </ion-tabs>
    </seed-header>

    <div [hidden]="true">
      <ng-content select="[menu-items]"></ng-content>
    </div>

    <ion-toolbar [hidden]="!showToolbarTab">
      <ion-tabs tabsLayout="icon-top" >
        <ion-tab [component]="dummyTab" *ngFor="let menuItem of menuItems; let i = index;"
        (ionSelect)="navigateTo(menuItem.link)" label="{{menuItem.title}}" icon="{{menuItem.icon}}"></ion-tab>
      </ion-tabs>
    </ion-toolbar>
    </ion-header>
    <ion-content main #content>
        <ng-content></ng-content>
    </ion-content>
  `,
})
export class LayoutTabComponent extends LayoutComponent implements OnInit {

  @Input() showMenuItemsAtHeader?: boolean = true;

  protected dummyTab;

  @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

  get showToolbarTab() {
    if (this.showMenuItemsAtHeader == true) {
      if (this.platform.width() < 768) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

    ngOnInit(): void {
this.dummyTab = TabNone;
  }


  navigateTo(link: string) {
    const routerLink = JSON.parse(link.replace(/'/g, '"'));
    this.router.navigate(routerLink);
  }
}
