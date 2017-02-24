import { UserinfoComponent } from './userinfo/userinfo.component';
import { MenuController, PopoverController } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'seed-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public menu: MenuController, private popoverCtrl: PopoverController) { }

  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  ngOnInit() {
  }

  get name(){
    return 'Anonimous';
  }

// presentPopover(ev) {

//     let popover = this.popoverCtrl.create(UserinfoComponent);

//     popover.present({
//       ev: ev
//     });
//   }

}
