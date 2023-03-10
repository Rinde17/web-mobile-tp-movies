import { IUser } from '../../../interfaces/user';
import { createAction, props } from '@ngrx/store';

export const logInWithOauth = createAction(
  '[Authentication Component] Log In With Oauth',
  props<{ provider: string }>()
);

export const authenticationFailure = createAction(
  '[Authentication Component] Authentication Failure',
  props<{ error: any }>()
);
export const authenticationSuccess = createAction(
  '[Authentication Component] Authentication Success',
  props<{ user: IUser }>()
);

export const getUser = createAction('[Authentication Effect] Get User');
export const getUserFailure = createAction(
  '[Authentication Effect] Get User Failure'
);

export const logOut = createAction('[Authentication Effect] Log Out');

export const logOutFailure = createAction(
  '[Authentication Effect] Log Out Failure',
  props<{ error: string }>()
);

export const logOutSuccess = createAction(
  '[Authentication Effect] Log Out Success',
  props<{ user: IUser }>()
);
