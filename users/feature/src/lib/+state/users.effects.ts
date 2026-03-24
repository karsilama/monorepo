import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as UsersActions from './users.actions';
import { User, UsersResponse } from './users.models';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);

  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.requestUsers),
        mergeMap(() =>
          this.http.get<UsersResponse>('https://dummyjson.com/users').pipe(
            map(({ users }) => UsersActions.loadUsersSuccess({ users })),
            catchError((error) =>
              of(
                UsersActions.loadUsersFailure({
                  error,
                }),
              ),
            ),
          ),
        ),
      ),
    { dispatch: true },
  );

  getUserById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.getUserById),
        mergeMap(({ id }) =>
          this.http
            .get<User>(`https://dummyjson.com/users/${+id}?t=${Date.now()}`)
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
        tap(() => {
          this.router.navigateByUrl('users');
        }),
      ),
    { dispatch: false },
  );

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
