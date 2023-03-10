import { SharedModule } from 'src/app/pages/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  declarations: [
    ProfileHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
})
export class ProfileModule {}
