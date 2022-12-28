import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

/**
 * Router transition constant.
 * Right to left.
 */
export const ROUTER_RTL_TRANSITION_CONSTANT = trigger('routerTransitionRtL', [
  transition('* <=> *', [
    /* order */
    /* 1 */
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    /* 2 */
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
]);

/**
 * Router transition constant.
 * Left to right.
 */
export const ROUTER_LTR_TRANSITION_CONSTANT = trigger('routerTransitionLtR', [
  transition('* <=> *', [
    /* order */
    /* 1 */
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    /* 2 */
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ], { optional: true }),
    ])
  ])
]);
