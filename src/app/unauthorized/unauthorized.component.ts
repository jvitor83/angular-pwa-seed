import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';

import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { AUTH_SERVICE, NewBaseAuthService, IAuthenticated } from "../shared/services/base-auth.service";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit {

  constructor(@Inject(AUTH_SERVICE) private authService: NewBaseAuthService<any>, private location: Location, private network: Network, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  Login() {
    const networkState = this.network.type;
    if (networkState !== 'none') {

      this.authService.login();
    } else {
      this.toastCtrl.create({
        message: 'Impossible to Login without Internet connection!',
        duration: 3000
      }).present();
    }

  }
  goback() {
    this.location.back();
  }
}
