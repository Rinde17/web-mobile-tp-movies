import { IPersonCombinedCreditsResponse } from './../../../interfaces/response';
import { createReducer, on } from '@ngrx/store';
import * as personAction from './people.actions';
import { IPerson, IPersonDetails } from '../../../interfaces/person';

export const peopleStateFeatureKey = 'peopleState';

export interface IPeopleState {
  people: IPerson[];
  error: any;
  isLoading: boolean;
}

export const initialState: IPeopleState = {
  people: null,
  error: null,
  isLoading: false,
};

export const reducers = createReducer(
  initialState,
  on(personAction.loadPeople, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(personAction.loadPeopleSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      people: action.people,
    };
  }),
  on(personAction.loadPeopleFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);

export interface IPersonDetailsState {
  personDetails: IPersonDetails;
  error: any;
  isLoading: boolean;
}

export const initialPersonDetailsState: IPersonDetailsState = {
  personDetails: null,
  error: null,
  isLoading: false,
};

export const personDetailsReducer = createReducer(
  initialPersonDetailsState,
  on(personAction.loadPersonDetails, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(personAction.loadPersonDetailsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      personDetails: action.personDetails,
    };
  }),
  on(personAction.loadPersonDetailsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);

export interface IPersonCombinedCreditsState {
  personCombinedCredits: IPersonCombinedCreditsResponse;
  error: any;
  isLoading: boolean;
}

export const initialPersonCombinedCreditsState: IPersonCombinedCreditsState = {
  personCombinedCredits: null,
  error: null,
  isLoading: false,
};

export const personCombinedCreditsReducer = createReducer(
  initialPersonCombinedCreditsState,
  on(personAction.loadPersonCombinedCredits, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(personAction.loadPersonCombinedCreditsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      personCombinedCredits: action.personCombinedCredits,
    };
  }),
  on(personAction.loadPersonCombinedCreditsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);
