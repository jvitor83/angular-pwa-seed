import { LayoutTabComponent } from './layout-tab.component';
import { LayoutMenuComponent } from './layout-menu.component';
import { LeftMenuService, RightMenuService } from './../shared/services/menu.service';
import { BreadcrumbsComponent } from './../shared/components/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { IonicModule, Item } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { UserinfoComponent } from './header/userinfo/userinfo.component';
import { SysteminfoComponent } from './header/systeminfo/systeminfo.component';
import { EnterpriseinfoComponent } from './header/enterpriseinfo/enterpriseinfo.component';
import { TabComponent } from './tab/tab.component';
import { IonItem } from './ion-item.directive';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  declarations: [LayoutComponent, LayoutMenuComponent, LayoutTabComponent, HeaderComponent, MenuComponent, UserinfoComponent, SysteminfoComponent, EnterpriseinfoComponent, BreadcrumbsComponent, TabComponent, IonItem],
  providers: [LeftMenuService, RightMenuService],
  exports: [LayoutComponent, LayoutMenuComponent, LayoutTabComponent, HeaderComponent, MenuComponent],
  entryComponents: [UserinfoComponent]
})
export class LayoutModule { }
