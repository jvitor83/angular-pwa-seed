import { Directive, Input } from '@angular/core';

@Directive({ selector: 'div' })
export class IonItem {
  @Input() id?: string;
}
