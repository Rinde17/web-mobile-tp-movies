import { IMovie } from '../../../interfaces/movie';
import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction(
  '[Movies List Component] Load Movies',
  props<{ filters: any }>()
);

export const loadMoviesSuccess = createAction(
  '[Movies List Component] Load Movies Success]',
  props<{ movies: IMovie[] }>()
);

export const loadMoviesFailure = createAction(
  '[Movies List Component] Load Movies Failure',
  props<{ error: any }>()
);

export const loadMovieDetails = createAction(
  '[Movies Details Component] Load Movie',
  props<{ id: any }>()
);

export const loadMovieDetailsSuccess = createAction(
  '[Movies Details Component] Load Movie Success',
  props<{ movie: IMovie }>()
);

export const loadMovieDetailsFailure = createAction(
  '[Movies Details Component] Load Movie Failure',
  props<{ error: any }>()
);
