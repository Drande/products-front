import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerActions } from '../actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(routerActions.go),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  ));

  navigateBack$ = createEffect(() => this.actions$
    .pipe(
      ofType(routerActions.back),
      tap(() => this.location.back())
    ));

  navigateForward$ = createEffect(() => this.actions$
    .pipe(
      ofType(routerActions.forward),
      tap(() => this.location.forward())
    ));
}
