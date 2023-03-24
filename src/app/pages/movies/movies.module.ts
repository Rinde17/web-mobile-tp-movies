import { MovieEffects } from './movie-store/movie.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from 'src/app/pages/shared/shared.module';
import * as movieState from './movie-store';
import { DatePipe } from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    MovieListComponent,
    MovieListItemComponent,
    MovieDetailsComponent,
  ],
    imports: [
        MoviesRoutingModule,
        SharedModule,
        FontAwesomeModule,
        StoreModule.forFeature(
            movieState.moviesStateFeatureKey,
            movieState.reducers
        ),
        EffectsModule.forFeature([MovieEffects]),
        DatePipe,
        MatPaginatorModule,
    ],
})
export class MoviesModule {}
