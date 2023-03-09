import { AuthService } from '../../../services/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as authActions from './auth.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(authActions.getUser),
      switchMap((payload) =>
        this._angularFireAuth.authState.pipe(
          map((response) => {
            if (response) {
              const { photoURL, uid, email } = response;
              return authActions.authenticationSuccess({
                user: { uid, email, photoURL },
              });
            } else {
              authActions.getUserFailure();
            }
          }),
          catchError((error) => {
            console.log(error);
            return of(authActions.authenticationFailure({ error }));
          })
        )
      )
    );
  });

  logOut$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.logOut),
      mergeMap((payload) =>
        of(this._authService.logOut()).pipe(
          map((response) => authActions.logOutSuccess({ user: null })),
          catchError((error) => of(authActions.logOutFailure({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _angularFireAuth: AngularFireAuth
  ) {}
}
