import { LeftMenuService, RightMenuService } from './../../shared/services/menu.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { InfoComponent } from './info/info.component';
import { PopoverController, Platform, MenuController } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, AfterContentInit, ApplicationRef, NgZone, ChangeDetectionStrategy, Inject } from '@angular/core';
import { AUTH_SERVICE, BaseAuthService } from "../../shared/services/base-auth.service";


@Component({
  moduleId: module.id,
  selector: 'seed-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  _name: string;

  get name() {
    if (this._name) {
      let splittedName = this._name.split(' ');
      if (splittedName) {
        let initialName = splittedName[0];
        return initialName;
      }else{
        return this._name;
      }
    }else{
      return 'Unidentified';
    }
  }

  ngOnInit(): void {
    this.authService.auth.subscribe(user => {
      this._name = user.identity.user.name;
    })
  }


  @Input() public infoAtRightMenu?: boolean = false;

  @Input() public showLeftMenuButton?: boolean = true;

  @Input() public showRightMenuButton?: boolean = true;

  constructor(public menu: MenuController, public leftMenuService: LeftMenuService, public rightMenuService: RightMenuService, private popoverController: PopoverController, @Inject(AUTH_SERVICE) private authService: BaseAuthService<any>) {
  }

  toggleMenu() {
    this.leftMenuService.toggleMenu();
  }

  toggleRightMenu() {
    this.rightMenuService.toggleMenu();
  }

  presentUserInfoPopover(event) {
    this.popoverController.create(UserinfoComponent).present({ ev: event });
  }
  presentInfoPopover(event) {
    this.popoverController.create(InfoComponent).present({ ev: event });
  }

}
