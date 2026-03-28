import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import * as fromAuth from './+state/auth.reducer';
import { AuthRoutes } from './auth.routes';

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  providers: [
    AuthFacade,
    provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    provideEffects(AuthEffects),
  ],
})
export class AuthFeatureModule {}
