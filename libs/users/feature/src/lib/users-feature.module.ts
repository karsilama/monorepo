import {
  provideHttpClient,
  withInterceptors,
  withXhr,
} from "@angular/common/http";
import { InjectionToken, NgModule } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { AuthInterceptor, ErrorInterceptor } from "@auth/domain";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { fromUsers, UsersEffects } from "@users/+state";
import { UsersRoutes } from "./users.routes";

export const USER_ID = new InjectionToken<string>("USER_ID");

@NgModule({
  providers: [
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    provideEffects(UsersEffects),
    provideRouter(UsersRoutes, withComponentInputBinding()),
    provideHttpClient(
      withXhr(),
      withInterceptors([AuthInterceptor, ErrorInterceptor]),
    ),
  ],
})
export class UsersFeatureModule {}
