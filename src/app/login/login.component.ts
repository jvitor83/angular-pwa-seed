import { MenuController } from 'ionic-angular';
import { Component, OnInit, ApplicationRef, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import UserModel from '../models/UserModel'

// import LoadImage from 'blueimp-load-image';
// import {PAGES, HEADER_HEIGHT} from '../shared/constants';
// import {setLiveCamera} from '../shared/config';
// import {showPage} from '../shared/helpers';
// import AnnotatePage from './annotate';
// import AboutPage from './about';

let inputPhoto = document.getElementById('file-input');
const user: UserModel = new UserModel();
@Component({
    moduleId: module.id,
    selector: 'my-app',
	template: `
	  <div>
	    <input type="text" id="email-field" (change)="onChangeEmail($event)"/>
	    <input type="password" id="password-field" (change)="onChangePassword($event)"/>
	  </div>
	`,
})

export class LoginComponent {


    constructor(public menu: MenuController, public zone: NgZone, public application: ApplicationRef) {
    }


  onChangeEmail(event) {
      console.log(event.target)
    //user.email = event.target.
  }
  onChangePassword(event) {
    console.log('onChange');
    var files = event.srcElement.files;

    console.log(event);
  }
}
