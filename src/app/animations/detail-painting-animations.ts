import { trigger, state, style, animate, transition } from '@angular/animations';

export const appearance =
    trigger('appearance', [
        state('left', style({  transform: "translateX(-130%)", opacity:'0' })),
        state('right', style({ transform: "translateX(130%)", opacity: '0'  })),
        state('center', style({ transform: "translateX(0)" })),
        transition('* => center', [
            animate(800), style({ transform: "translateX(0)" })]),
        transition('center => left', [
            animate(800, style({ transform: "translateX(-130%)" })),
        ]),
        transition('center => right', [
            animate(800, style({ transform: "translateX(130%)" })),
        ])
    ])
