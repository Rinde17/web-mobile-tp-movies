import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IPeopleState,
  IPersonCombinedCreditsState,
  IPersonDetailsState,
  peopleStateFeatureKey,
} from './index';

export const selectPeopleFeature = createFeatureSelector<IPeopleState>(
  peopleStateFeatureKey
);

export const selectPeople = createSelector(
  selectPeopleFeature,
  (state: IPeopleState) => state[0].people
);

export const selectError = createSelector(
  selectPeopleFeature,
  (state: IPeopleState) => state[0].error
);

export const selectPeopleDetailsFeature =
  createFeatureSelector<IPersonDetailsState>(peopleStateFeatureKey);

export const selectPersonDetails = createSelector(
  selectPeopleDetailsFeature,
  (state: IPersonDetailsState) => state[1].personDetails
);

export const selectPersonDetailsFailure = createSelector(
  selectPeopleDetailsFeature,
  (state: IPersonDetailsState) => state[1].error
);

export const selectPersonCreitsFeature =
  createFeatureSelector<IPersonCombinedCreditsState>(peopleStateFeatureKey);

export const selectPersonCredits = createSelector(
  selectPersonCreitsFeature,
  (state: IPersonCombinedCreditsState) => state[2].personCombinedCredits
);

export const selectPersonCreditsFailure = createSelector(
  selectPersonCreitsFeature,
  (state: IPersonCombinedCreditsState) => state[2].error
);
