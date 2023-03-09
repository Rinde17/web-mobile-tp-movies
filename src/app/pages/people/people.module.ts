import { SharedModule } from 'src/app/pages/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleListItemComponent } from './people-list-item/people-list-item.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { StoreModule } from '@ngrx/store';
import * as peopleState from './people-store';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './people-store/people.effects';

@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleListItemComponent,
    PeopleDetailsComponent,
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule,
    StoreModule.forFeature(peopleState.peopleStateFeatureKey, [
      peopleState.reducers,
      peopleState.personDetailsReducer,
      peopleState.personCombinedCreditsReducer,
    ]),
    EffectsModule.forFeature([PeopleEffects]),
  ],
})
export class PeopleModule {}
