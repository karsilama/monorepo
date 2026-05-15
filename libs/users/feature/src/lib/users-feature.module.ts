import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { provideRouter } from "@angular/router";
import { AuthInterceptor, ErrorInterceptor } from "@auth/domain";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { fromUsers, UsersEffects } from "@users/+state";
import { UsersRoutes } from "./users.routes";

@NgModule({
  providers: [
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    provideEffects(UsersEffects),
    provideRouter(UsersRoutes),
    provideHttpClient(withInterceptors([AuthInterceptor, ErrorInterceptor])),
  ],
})
export class UsersFeatureModule {}
