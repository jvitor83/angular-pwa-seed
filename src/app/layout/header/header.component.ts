import { MenuController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seed-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public menu: MenuController) { }

  ngOnInit() {
  }

  toggleMenu(menuId: string) {
     console.log(menuId);
    let menuToToggle = this.menu.get(menuId);
    menuToToggle = menuToToggle.enable(true);
    menuToToggle.toggle();
  }

}
