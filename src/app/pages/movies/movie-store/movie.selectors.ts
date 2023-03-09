import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesState, moviesStateFeatureKey } from '.';

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

export const selectMovieDetailsFeature = createFeatureSelector<IMoviesState>(
  moviesStateFeatureKey
);

export const selectMovieDetails = createSelector(
  selectMovieDetailsFeature,
  (state: IMoviesState) => state[1].movie
);

export const selectMovieDetailsError = createSelector(
  selectMovieDetailsFeature,
  (state: IMoviesState) => state[1].error
);
