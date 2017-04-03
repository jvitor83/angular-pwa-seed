import { style } from '@angular/animations';
import { AuthService } from './../../../shared/services/auth.service';
import { PopoverController, Platform } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'seed-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  @Input()
  public summary = false;

  constructor(private platform: Platform, private authService: AuthService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  get name() {
    if (this.authService.loggedIn) {
      return this.authService.currentUser.profile.name;
    } else {
      return 'Anonimous';
    }
  }

  get isLoggedIn() {
    return this.authService.loggedIn;
  }

  logout() {
    this.authService.startSignoutMainWindow();
  }

  login() {
    localStorage.removeItem(location.host + ':callback');
    this.authService.startSigninMainWindow();
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(UserinfoComponent);

    popover.present({
      ev: ev
    });
  }
}
