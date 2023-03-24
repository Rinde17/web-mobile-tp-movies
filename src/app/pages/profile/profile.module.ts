import { SharedModule } from 'src/app/pages/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileWatchlistComponent } from './profile-watchlist/profile-watchlist.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    ProfileHomeComponent,
    ProfileFavoritesComponent,
    ProfileWatchlistComponent,
  ],
    imports: [CommonModule, SharedModule, ProfileRoutingModule, FontAwesomeModule],
})
export class ProfileModule {}
