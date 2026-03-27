import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UsersEffects } from './+state/users.effects';
import * as fromUsers from './+state/users.reducer';
import { UsersRoutes } from './users.routes';

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  providers: [
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    provideEffects(UsersEffects),
  ],
})
export class UsersFeatureModule {}
