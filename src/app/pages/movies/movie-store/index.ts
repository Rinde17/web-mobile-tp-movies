import { IMovie } from '../../../interfaces/movie';
import { createReducer, on } from '@ngrx/store';
import * as movieAction from './movie.actions';

export const moviesStateFeatureKey = 'moviesState';

export interface IMoviesState {
  movies: IMovie[];
  error: any;
  isLoading: boolean;
}

export const initialState: IMoviesState = {
  movies: null,
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

export interface IMovieState {
  movie: IMovie;
  error: any;
  isLoading: boolean;
}

export const initialMovieState: IMovieState = {
  movie: null,
  error: null,
  isLoading: false,
};

export const MovieDetailsReducers = createReducer(
  initialMovieState,
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
