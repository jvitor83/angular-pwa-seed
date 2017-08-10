import { LayoutTabComponent, TabNone } from './layout-tab.component';
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
import { InfoComponent } from "./header/info/info.component";
import { LayoutBlankComponent } from "./layout-blank.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  declarations: [TabNone, LayoutComponent, LayoutBlankComponent,LayoutMenuComponent, LayoutTabComponent, HeaderComponent, MenuComponent, InfoComponent, UserinfoComponent, SysteminfoComponent, EnterpriseinfoComponent, BreadcrumbsComponent],
  providers: [LeftMenuService, RightMenuService],
  exports: [LayoutComponent, LayoutMenuComponent, LayoutBlankComponent, LayoutTabComponent, HeaderComponent, MenuComponent],
  entryComponents: [UserinfoComponent, InfoComponent, TabNone]
})
export class LayoutModule { }
