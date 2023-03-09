import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ITvShowDetailsState,
  ITvShowsState,
  tvShowsStateFeatureKey,
} from './index';

export const selectTvShowFeature = createFeatureSelector<ITvShowsState>(
  tvShowsStateFeatureKey
);

export const selectTvShow = createSelector(
  selectTvShowFeature,
  (state: ITvShowsState) => state[0].tvShows
);

export const selectError = createSelector(
  selectTvShowFeature,
  (state: ITvShowsState) => state[0].error
);

export const selectTvShowDetailsFeature =
  createFeatureSelector<ITvShowDetailsState>(tvShowsStateFeatureKey);

export const selectTvShowDetails = createSelector(
  selectTvShowDetailsFeature,
  (state: ITvShowDetailsState) => state[1].tvShow
);

export const selectTvShowDetailsError = createSelector(
  selectTvShowDetailsFeature,
  (state: ITvShowDetailsState) => state[1].error
);
