import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UsersEffects, fromUsers } from '@users/state';
import { UsersRoutes } from './users.routes';

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  providers: [
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    provideEffects(UsersEffects),
  ],
})
export class UsersFeatureModule {}
