import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { AuthService } from './../../../shared/services/auth.service';
import { PopoverController, Platform, ToastController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'seed-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(private platform: Platform, private authService: AuthService, private popoverCtrl: PopoverController, private router: Router, private network: Network, public toastCtrl: ToastController) {

  }

  ngOnInit() {
  }

  get name() {
    if (this.authService.loggedIn) {
      return this.authService.currentUser.profile.name;
    } else {
      return 'Anonimous';
    }
  }


  static isUser(user: Oidc.User | void): user is Oidc.User {
    return (<Oidc.User>user) !== undefined;
  }

  get image() {
    let imageUrl: Array<string> = this.authService.currentUser && this.authService.currentUser.profile && this.authService.currentUser.profile.picture || null;
    if (imageUrl != null && imageUrl.length > 0) {
      return imageUrl[0];
    }
    return null;
  }

  get isLoggedIn() {
    return this.authService.loggedIn;
  }

  logout() {
    this.authService.startSignoutMainWindow();
    this.router.navigate(['']);
  }

  login() {
    var networkState = this.network.type;
    if (networkState !== 'none') {
      localStorage.removeItem(location.host + ':callback');
      this.authService.startSigninMainWindow();
    } else {
      this.toastCtrl.create({
        message: 'Impossible to Login without Internet connection!',
        duration: 3000
      }).present();
    }
  }

}
