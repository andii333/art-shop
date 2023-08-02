import { trigger, style, animate, transition } from '@angular/animations';

export const headerAnimations =
    trigger('addPainting', [
        transition('*<=>*', [
            animate(400, style({ transform: "scale(2.5)" })),
            animate(400, style({ transform: "scale(1)" })),
        ] )
    ])