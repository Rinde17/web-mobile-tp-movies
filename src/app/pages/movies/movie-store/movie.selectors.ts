import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IMoviesState,
  IMovieDetailsState,
  moviesStateFeatureKey,
  movieStateDetailsFeatureKey,
} from './index';

export const selectMoviesFeature = createFeatureSelector<IMoviesState>(
  moviesStateFeatureKey
);

export const selectMovies = createSelector(
  selectMoviesFeature,
  (state: IMoviesState) => state.movies
);

export const selectError = createSelector(
  selectMoviesFeature,
  (state: IMoviesState) => state.error
);

export const selectMovieDetailsFeature =
  createFeatureSelector<IMovieDetailsState>(movieStateDetailsFeatureKey);

export const selectMovieDetails = createSelector(
  selectMovieDetailsFeature,
  (state: IMovieDetailsState) => state.movie
);

export const selectMovieDetailsError = createSelector(
  selectMovieDetailsFeature,
  (state: IMovieDetailsState) => state.error
);
