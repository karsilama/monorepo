import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import * as fromUsers from './+state/users.reducer';
import { UserAll } from './user-all/user-all';
import { canActivateTeam } from './user-all/user-all.guard';

export const UsersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => UserAll,
    canActivate: [canActivateTeam],
    providers: [
      UsersFacade,
      provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
      provideEffects(UsersEffects),
    ],
  },
];
