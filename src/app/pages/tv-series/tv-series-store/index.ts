import { ITvSerie } from 'src/app/interfaces/tvseries';
import { createReducer, on } from '@ngrx/store';
import * as tvShowsAction from './tv-series.actions';

export const tvShowsStateFeatureKey = 'tvShowsState';
export const tvShowsDetailsStateFeatureKey = 'tvShowsDetailsState';

export interface ITvShowsState {
  tvShows: ITvSerie[];
  error: any;
  isLoading: boolean;
}

export const initialState: ITvShowsState = {
  tvShows: [],
  error: null,
  isLoading: false,
};

export const reducers = createReducer(
  initialState,
  on(tvShowsAction.loadShows, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(tvShowsAction.loadShowsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      tvShows: action.tvShows,
    };
  }),
  on(tvShowsAction.loadShowsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);
export interface ITvShowDetailsState {
  tvShow: ITvSerie | null;
  error: any;
  isLoading: boolean;
}

export const initialTvShowDetailsState: ITvShowDetailsState = {
  tvShow: null,
  error: null,
  isLoading: false,
};

export const tvShowDetailsReducer = createReducer(
  initialTvShowDetailsState,
  on(tvShowsAction.loadDetailsShow, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(tvShowsAction.loadShowDetailsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      tvShow: action.tvShow,
    };
  }),
  on(tvShowsAction.loadShowDetailsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);
