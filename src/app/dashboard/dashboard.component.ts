import { MenuController } from 'ionic-angular';
import { Component, OnInit, ApplicationRef, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// import LoadImage from 'blueimp-load-image';
// import {PAGES, HEADER_HEIGHT} from '../shared/constants';
// import {setLiveCamera} from '../shared/config';
// import {showPage} from '../shared/helpers';
// import AnnotatePage from './annotate';
// import AboutPage from './about';

let inputPhoto = document.getElementById('file-input');

@Component({
    moduleId: module.id,
    selector: 'my-app',
	template: `
	  <div>
	    <input type="file" (change)="onChange($event)"/>
      <img id="img-content"/>
	  </div>
	`,
})

export class DashboardComponent {


    constructor(public menu: MenuController, public zone: NgZone, public application: ApplicationRef) {
    }


onChange(event) {
    console.log('onChange');
    var files = event.srcElement.files;

    console.log(event);
  }
}
