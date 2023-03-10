import { IPersonCombinedCreditsResponse } from '../../../interfaces/response';
import { IPerson, IPersonDetails } from 'src/app/interfaces/person';
import { createAction, props } from '@ngrx/store';

export const loadPeople = createAction(
  '[People List Component] Load People',
  props<{ filters: any }>()
);

export const loadPeopleSuccess = createAction(
  '[People List Component] Load People Success',
  props<{ people: IPerson[] }>()
);

export const loadPeopleFailure = createAction(
  '[People List Component] Load People Failure',
  props<{ error: any }>()
);

export const loadPersonDetails = createAction(
  '[Person Details Component] Load Person Details',
  props<{ id: any }>()
);

export const loadPersonDetailsSuccess = createAction(
  '[Person Details Component] Load Person Details Success',
  props<{ personDetails: IPersonDetails }>()
);

export const loadPersonDetailsFailure = createAction(
  '[Person Details Component] Load Person Details Failure',
  props<{ error: any }>()
);

export const loadPersonCombinedCredits = createAction(
  '[Person Details Component] Load Person Combined Credits',
  props<{ id: any }>()
);

export const loadPersonCombinedCreditsSuccess = createAction(
  '[Person Details Component] Load Person Combined Credits Success',
  props<{ personCombinedCredits: IPersonCombinedCreditsResponse }>()
);

export const loadPersonCombinedCreditsFailure = createAction(
  '[Person Details Component] Load Person Combined Credits Failure',
  props<{ error: any }>()
);
