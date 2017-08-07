import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'seed-enterpriseinfo',
  templateUrl: './enterpriseinfo.component.html',
  styles: [`
  ion-icon { 
    font-size: 100px; 
    color : white; 
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

.wrap {
    word-wrap: break-word !important;
}
  `]
})
export class EnterpriseinfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
