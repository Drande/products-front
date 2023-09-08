import { createActionGroup, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const routerActions = createActionGroup({
  source: "routerReducer",
  events: {
    go: props<{ path: any[]; query?: object; extras?: NavigationExtras; }>(),
    back: props<any>(),
    forward: props<any>(),
  }
});


