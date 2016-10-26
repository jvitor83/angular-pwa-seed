import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'seed-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     state('false', style({ width: '50px' })),
  //     state('true', style({ width: '300px' })),
  //     transition('false <=> true', animate('100ms ease-in-out'))
  //   ])
  // ]
})
export class SidenavComponent {

  @Input() isOpen: boolean = false;

}
