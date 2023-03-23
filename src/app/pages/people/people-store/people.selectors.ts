import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IPeopleState,
  IPersonCombinedCreditsState,
  IPersonDetailsState,
  peopleCombinedCreditsStateFeatureKey,
  peopleDetailsStateFeatureKey,
  peopleStateFeatureKey,
} from './index';

export const selectPeopleFeature = createFeatureSelector<IPeopleState>(
  peopleStateFeatureKey
);

export const selectPeople = createSelector(
  selectPeopleFeature,
  (state: IPeopleState) => state.people
);

export const selectError = createSelector(
  selectPeopleFeature,
  (state: IPeopleState) => state.error
);

export const selectPeopleDetailsFeature =
  createFeatureSelector<IPersonDetailsState>(peopleDetailsStateFeatureKey);

export const selectPersonDetails = createSelector(
  selectPeopleDetailsFeature,
  (state: IPersonDetailsState) => state.personDetails
);

export const selectPersonDetailsFailure = createSelector(
  selectPeopleDetailsFeature,
  (state: IPersonDetailsState) => state.error
);

export const selectPersonCreitsFeature =
  createFeatureSelector<IPersonCombinedCreditsState>(
    peopleCombinedCreditsStateFeatureKey
  );

export const selectPersonCredits = createSelector(
  selectPersonCreitsFeature,
  (state: IPersonCombinedCreditsState) => state.personCombinedCredits
);

export const selectPersonCreditsFailure = createSelector(
  selectPersonCreitsFeature,
  (state: IPersonCombinedCreditsState) => state.error
);
