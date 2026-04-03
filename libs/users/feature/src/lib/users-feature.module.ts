import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from '@auth/domain';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { fromUsers, UsersEffects } from 'libs/users/+state/src';
import { UsersRoutes } from './users.routes';

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  providers: [
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    provideEffects(UsersEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
})
export class UsersFeatureModule {}
