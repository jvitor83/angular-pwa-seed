import { Platform, MenuController, Item } from 'ionic-angular';
import { Component, OnInit, Input, forwardRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { LayoutComponent } from "./layout.component";
import { MenuItemComponent } from "../shared/components/menu-item/menu-item.component";
import { Router } from "@angular/router";

@Component({ template: `<ion-content></ion-content>` })
export class TabNone { }

@Component({
  selector: 'seed-layout [type="tab"]',
  template:
  `
    <seed-header [showLeftMenuButton]="false" [showRightMenuButton]="true">
      <ion-tabs [hidden]="showToolbarTab" layout-tabs tabsLayout="icon-top" tabsPlacement="top">
        <ion-tab [root]="dummyTab" layout-tab *ngFor="let menuItem of menuItems; let i = index;" (ionSelect)="navigateTo(menuItem.link)" tabTitle="{{menuItem.title}}" tabIcon="{{menuItem.icon}}"></ion-tab>
      </ion-tabs>
    </seed-header>

    <div [hidden]="true">
      <ng-content select="[menu-items]"></ng-content>
    </div>

    <ion-toolbar [hidden]="!showToolbarTab">
      <ion-tabs tabsLayout="icon-top" tabsPlacement="top">
        <ion-tab [root]="dummyTab" *ngFor="let menuItem of menuItems; let i = index;" (ionSelect)="navigateTo(menuItem.link)" tabTitle="{{menuItem.title}}" tabIcon="{{menuItem.icon}}"></ion-tab>
      </ion-tabs>
    </ion-toolbar>

    <ion-content main #content>
      <div padding>
        <ng-content></ng-content>
      </div>
    </ion-content>
  `,
})
export class LayoutTabComponent extends LayoutComponent {

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

  constructor(private router: Router, public platform: Platform) {
    super();
    this.dummyTab = TabNone;
  }

  navigateTo(link: string) {
    const routerLink = JSON.parse(link.replace(/'/g, '"'));
    this.router.navigate(routerLink);
  }
}
