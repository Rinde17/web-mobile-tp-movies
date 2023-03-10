import { IUser } from '../../../interfaces/user';
import { createReducer, on } from '@ngrx/store';
import * as authAction from './auth.actions';

export const authStateFeatureKey = 'authState';

export interface IAuthState {
  user: IUser;
  isLoading: boolean;
  provider?: string;
  error: any;
}

export const initialState: IAuthState = {
  user: null,
  isLoading: false,
  provider: null,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(authAction.getUser, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(authAction.getUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: null,
    };
  }),
  on(authAction.logInWithOauth, (state, action) => {
    return {
      ...state,
      isLoading: true,
      provider: action.provider,
    };
  }),
  on(authAction.authenticationFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(authAction.authenticationSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: action.user,
    };
  }),
  on(authAction.logOut, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(authAction.logOutFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(authAction.logOutSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: action.user,
    };
  })
);
