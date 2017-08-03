import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        animate('0.3s', style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        animate('0.1s', style({ opacity: 0 }))
      ], { optional: true }),
    ])
  ])

])