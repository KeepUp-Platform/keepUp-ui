import { trigger, transition, style, query, animate } from '@angular/animations';


export const fadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0, 
      })
    ], { optional: true }),

    query(':enter', [
      style({ 
        opacity: 0, 
        transform: 'translateY(10px)'
      })
    ], { optional: true }),

    query(':enter', [
      animate('395ms ease-out', style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      }))
    ], { optional: true })
  ])
]);