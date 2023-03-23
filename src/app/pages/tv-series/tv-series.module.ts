import * as tvShowState from './tv-series-store';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { TvSeriesRoutingModule } from './tv-series-routing.module';
import { TvSeriesListComponent } from './tv-series-list/tv-series-list.component';
import { TvSeriesListItemComponent } from './tv-series-list-item/tv-series-list-item.component';
import { TvSeriesDetailsComponent } from './tv-series-details/tv-series-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TvSeriesEffects } from './tv-series-store/tv-series.effects';
import { tvShowsDetailsStateFeatureKey } from './tv-series-store';

@NgModule({
  declarations: [
    TvSeriesListComponent,
    TvSeriesListItemComponent,
    TvSeriesDetailsComponent,
  ],
  imports: [
    TvSeriesRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      tvShowState.tvShowsStateFeatureKey,
      tvShowState.reducers
    ),
    StoreModule.forFeature(
      tvShowState.tvShowsDetailsStateFeatureKey,
      tvShowState.tvShowDetailsReducer
    ),
    EffectsModule.forFeature([TvSeriesEffects]),
  ],
})
export class TvSeriesModule {}
