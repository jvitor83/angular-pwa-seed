import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'seed-info',
  templateUrl: './info.component.html',
  styles: [
    `
    [center] {
      text-align: center !important;
    }
    `
  ]
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
