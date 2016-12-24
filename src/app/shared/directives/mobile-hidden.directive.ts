import { Platform } from 'ionic-angular';
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[mobile-hidden]' })
export class MobileHiddenDirective {
  constructor(el: ElementRef, renderer: Renderer, platform: Platform) {
    console.log('mobile-hidden');
    if (!platform.is('core')) {
      renderer.setElementAttribute(el.nativeElement, 'hidden', 'true');
    }
  }
}
