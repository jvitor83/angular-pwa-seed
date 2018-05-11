import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

// Fade Animation between router
export const routerTransition = trigger('routerTransition', [
  transition('* => *', [
    query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 }), { optional: true }),
    query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 }), { optional: true }),
    query(':leave', animate('0.2s', style({ opacity: 0 })), { optional: true }),
    query(':enter', animate('0.4s', style({ opacity: 1 })), { optional: true })
  ])
]);



// // Slide Animation between router
// export const routerTransition = trigger('routerTransition', [
//   transition('* <=> *', [
//     /* order */
//     /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
//       , { optional: true }),
//     /* 2 */ group([  // block executes in parallel
//       query(':enter', [
//         style({ transform: 'translateX(100%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//       ], { optional: true }),
//       query(':leave', [
//         style({ transform: 'translateX(0%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
//       ], { optional: true }),
//     ])
//   ])
// ]);
