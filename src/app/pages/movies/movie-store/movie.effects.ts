import { TmdbService } from './../../../services/tmdb/tmdb.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as movieActions from './movie.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadMoviesFailure, loadMoviesSuccess } from './movie.actions';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(movieActions.loadMovies),
      mergeMap((payload) =>
        this._tmdbService.discoverMovie(payload.filters).pipe(
          map((response) => loadMoviesSuccess({ movies: response.results })),
          catchError((error) => of(loadMoviesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private _actions$: Actions, private _tmdbService: TmdbService) {}
}
