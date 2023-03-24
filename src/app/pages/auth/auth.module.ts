import { AlertModule } from 'ngx-bootstrap/alert';
import { AuthEffects } from './auth-store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as authState from './auth-store';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    StoreModule.forFeature(authState.authStateFeatureKey, authState.reducers),
    EffectsModule.forFeature([AuthEffects]),
    ButtonsModule.forRoot(),
    WebcamModule,
  ],
})
export class AuthModule {}
