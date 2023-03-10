import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as peopleActions from './people.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadPeopleFailure,
  loadPeopleSuccess,
  loadPersonCombinedCreditsFailure,
  loadPersonCombinedCreditsSuccess,
  loadPersonDetailsFailure,
  loadPersonDetailsSuccess,
} from './people.actions';

@Injectable()
export class PeopleEffects {
  loadPeople$ = createEffect(() =>
    this._actions$.pipe(
      ofType(peopleActions.loadPeople),
      mergeMap((payload) =>
        this._tmdbService.discoverPeople().pipe(
          map((response) => loadPeopleSuccess({ people: response.results })),
          catchError((error) => of(loadPeopleFailure({ error: error.message })))
        )
      )
    )
  );

  loadPersonDetails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(peopleActions.loadPersonDetails),
      mergeMap((payload) =>
        this._tmdbService.personDetails(payload.id).pipe(
          map((response) =>
            loadPersonDetailsSuccess({ personDetails: response })
          ),
          catchError((error) => of(loadPersonDetailsFailure(error)))
        )
      )
    )
  );

  loadPersonCombinedCredits$ = createEffect(() =>
    this._actions$.pipe(
      ofType(peopleActions.loadPersonCombinedCredits),
      mergeMap((payload) =>
        this._tmdbService.personCombinedCredits(payload.id).pipe(
          map((response) =>
            loadPersonCombinedCreditsSuccess({
              personCombinedCredits: response,
            })
          ),
          catchError((error) =>
            of(loadPersonCombinedCreditsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private _actions$: Actions, private _tmdbService: TmdbService) {}
}
