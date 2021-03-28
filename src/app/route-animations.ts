import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
    animateChild,
    keyframes
} from '@angular/animations';

export const slider =
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isLeft => *', slideTo('right')),
        transition('isRight => *', slideTo('left'))
    ]);

// tslint:disable-next-line: typedef
function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: `${28.5}px`,
                [direction]: 0,
                width: 100 + '%',
                // height: 'calc(' + 100 + '% - ' + 57 + 'px)'
                height: `calc(${100}% - ${57}px)`
                // height: `${57}px`
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('1000ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('1000ms ease', style({ [direction]: '0%' }))
            ], optional),
        ]),
    ];
}
