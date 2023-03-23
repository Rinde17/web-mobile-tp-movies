import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ITvShowDetailsState,
  ITvShowsState,
  tvShowsStateFeatureKey,
  tvShowsDetailsStateFeatureKey,
} from './index';

export const selectTvShowFeature = createFeatureSelector<ITvShowsState>(
  tvShowsStateFeatureKey
);

export const selectTvShow = createSelector(
  selectTvShowFeature,
  (state: ITvShowsState) => state.tvShows
);

export const selectError = createSelector(
  selectTvShowFeature,
  (state: ITvShowsState) => state.error
);

export const selectTvShowDetailsFeature =
  createFeatureSelector<ITvShowDetailsState>(tvShowsDetailsStateFeatureKey);

export const selectTvShowDetails = createSelector(
  selectTvShowDetailsFeature,
  (state: ITvShowDetailsState) => state.tvShow
);

export const selectTvShowDetailsError = createSelector(
  selectTvShowDetailsFeature,
  (state: ITvShowDetailsState) => state.error
);
