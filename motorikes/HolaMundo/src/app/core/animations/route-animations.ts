import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative', minHeight: '100vh' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        boxSizing: 'border-box'
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateY(15px)', opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateY(-15px)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('400ms 150ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);
