import { ITvSerie } from 'src/app/interfaces/tvseries';
import { createAction, props } from '@ngrx/store';

export const loadShows = createAction(
  '[Tv-Shows List Component] Load Tv-Shows',
  props<{ filters: any }>()
);

export const loadShowsSuccess = createAction(
  '[Tv-Shows List Component] Load Tv-Shows Success',
  props<{ tvShows: ITvSerie[] }>()
);

export const loadShowsFailure = createAction(
  '[Tv-Shows List Component] Load Tv-Shows Failure',
  props<{ error: any }>()
);

export const loadDetailsShow = createAction(
  '[Tv-Shows Details Component] Load Tv-Show',
  props<{ id: any }>()
);

export const loadShowDetailsSuccess = createAction(
  '[Tv-Shows Details Component] Load Tv-Show Success',
  props<{ tvShow: ITvSerie }>()
);

export const loadShowDetailsFailure = createAction(
  '[Tv-Shows Details Component] Load Tv-Show Failure',
  props<{ error: any }>()
);
