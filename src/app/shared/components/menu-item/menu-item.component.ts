import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'seed-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Input() icon?: string;

  @Input() link?: any;

  @Input() title: string;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(link: string) {
    if (link) {
      const routerLink = JSON.parse(link.replace(/'/g, '"'));
      this.router.navigate(routerLink);
    }
  }
}
