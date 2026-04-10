import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '@configuration/domain';
import { DialogService } from '@lab/dialog/feature';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserDomainModel, UsersResponse } from '@users/infrastructure';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);
  private dialog = inject(DialogService);
  private configurationService = inject(ConfigurationService);

  /**
   * Request dummy Users all
   * Http Adapter
   */
  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.requestUsers),
        switchMap(() =>
          this.http
            .get<UsersResponse>(
              `${this.configurationService.getBaseConfiguration().api.url}/users`,
            )
            .pipe(
              map(({ users }) => UsersActions.loadUsersSuccess({ users })),
              catchError((error) => {
                return of(
                  UsersActions.loadUsersFailure({
                    error,
                  }),
                );
              }),
            ),
        ),
      ),
    { dispatch: true },
  );

  /**
   * Request dummy User by id
   * Http Adapter
   */

  getUserById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.getUserById),
        switchMap(({ id }) =>
          this.http
            .get<UserDomainModel>(
              `https://dummyjson.com/users/${+id}?t=${Date.now()}`,
            )
            .pipe(
              map((user) => UsersActions.getUserByIdSuccess({ user })),
              catchError((error) =>
                of(
                  UsersActions.getUserByIdFailure({
                    error,
                  }),
                ),
              ),
            ),
        ),
      ),
    { dispatch: true },
  );

  /**
   * Request dummy save User
   * No Logic added
   */

  saveUserById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.saveUserById),

        map(() =>
          /**
           * @TODO Must!!
           * - Save data on database
           * - CatchErrors by using UsersActions.saveUserByIdFailure
           */
          UsersActions.saveUserByIdSuccess(),
        ),
      ),
    { dispatch: true },
  );

  /**
   * Router Navigation
   */
  saveUserByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.saveUserByIdSuccess),
        tap(() => {
          this.dialog.close();
        }),
      ),
    { dispatch: false },
  );

  navigateUserEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.navigateUserEdit),
        map(({ id }) => {
          this.router.navigateByUrl(`users/${id}`);
          return UsersActions.getUserById({ id });
        }),
      ),
    { dispatch: true },
  );

  navigateUserAll$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.navigateUserAll),
        map(() => {
          this.router.navigateByUrl('users');
          return UsersActions.requestUsers({ pageSize: 5 });
        }),
      ),
    { dispatch: true },
  );

  /**
   * Initialize Users List
   */

  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.initUsers),
        map(() => UsersActions.requestUsers({ pageSize: 5 })),
      ),
    {
      dispatch: true,
    },
  );

  ngrxOnInitEffects() {
    return UsersActions.initUsers();
  }
}
