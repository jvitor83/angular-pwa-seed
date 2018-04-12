import { IdentityService } from './../../shared/auth/authentication/identity.service';
import { LeftMenuService, RightMenuService } from './../../shared/services/menu.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { InfoComponent } from './info/info.component';
import { PopoverController, Platform, MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, AfterContentInit, ApplicationRef, NgZone, ChangeDetectionStrategy, Inject } from '@angular/core';
import { PopoverOptions, Popover } from '@ionic/core';


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
      } else {
        return this._name;
      }
    } else {
      return 'Unidentified';
    }
  }

  ngOnInit(): void {
    this.identityService.user.subscribe(user => {
      this._name = user.name;
    });
  }


  @Input() public infoAtRightMenu?: boolean = false;

  @Input() public showLeftMenuButton?: boolean = true;

  @Input() public showRightMenuButton?: boolean = true;

  constructor(public menu: MenuController, public leftMenuService: LeftMenuService,
    public rightMenuService: RightMenuService, private popoverController: PopoverController,
    private identityService: IdentityService) {
  }

  toggleMenu() {
    this.leftMenuService.toggleMenu();
  }

  toggleRightMenu() {
    this.rightMenuService.toggleMenu();
  }

  presentUserInfoPopover(event) {
    const popover = new Popover();
    popover.component = UserinfoComponent;
    this.popoverController.create(popover).then(element => element.present());
  }
  presentInfoPopover(event) {
    const popover = new Popover();
    popover.component = InfoComponent;
    this.popoverController.create(popover).then(element => element.present());
  }

}
