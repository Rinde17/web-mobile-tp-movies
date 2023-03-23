import { IMovie } from '../../../interfaces/movie';
import { createReducer, on } from '@ngrx/store';
import * as movieAction from './movie.actions';

export const moviesStateFeatureKey = 'moviesState';
export const movieStateDetailsFeatureKey = 'movieStateDetails';

export interface IMoviesState {
  movies: IMovie[];
  error: any;
  isLoading: boolean;
}

export const initialState: IMoviesState = {
  movies: [],
  error: null,
  isLoading: false,
};

export const reducers = createReducer(
  initialState,
  on(movieAction.loadMovies, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(movieAction.loadMoviesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      movies: action.movies,
    };
  }),
  on(movieAction.loadMoviesFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);

export interface IMovieDetailsState {
  movie: IMovie | null;
  error: any;
  isLoading: boolean;
}

export const initialMovieDetailsState: IMovieDetailsState = {
  movie: null,
  error: null,
  isLoading: false,
};

export const MovieDetailsReducers = createReducer(
  initialMovieDetailsState,
  on(movieAction.loadMovieDetails, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(movieAction.loadMovieDetailsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      movie: action.movie,
    };
  }),
  on(movieAction.loadMovieDetailsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      movie: action.error,
    };
  })
);
