import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authStateFeatureKey, IAuthState } from './index';

export const selectAuthFeature =
  createFeatureSelector<IAuthState>(authStateFeatureKey);

export const selectUser = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.user
);
