import { TmdbService } from 'src/app/services/tmdb/tmdb.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as tvShowAction from './tv-series.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadShowDetailsFailure,
  loadShowDetailsSuccess,
  loadShowsFailure,
  loadShowsSuccess,
} from './tv-series.actions';

@Injectable()
export class TvSeriesEffects {
  loadTvShows$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tvShowAction.loadShows),
      switchMap((payload) =>
        this._tmdbService.discoverTvShow(payload.filters).pipe(
          map((response) => loadShowsSuccess({ tvShows: response.results })),
          catchError((error) => of(loadShowsFailure({ error: error.message })))
        )
      )
    )
  );

  loadTvShow$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tvShowAction.loadDetailsShow),
      mergeMap((payload) =>
        this._tmdbService.tvseries(payload.id).pipe(
          map((response) => loadShowDetailsSuccess({ tvShow: response })),
          catchError((error) => of(loadShowDetailsFailure(error)))
        )
      )
    )
  );

  constructor(private _actions$: Actions, private _tmdbService: TmdbService) {}
}
