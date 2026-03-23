import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UsersActions from './users.actions';
import { SelectUserResponse, UsersResponse } from './users.models';

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

  selectUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.selectUser),
        mergeMap(({ id }) =>
          this.http
            .get<SelectUserResponse>(`https://dummyjson.com/users/${+id}`)
            .pipe(
              map(({ selectedUser }) =>
                UsersActions.selectUserSuccess({ selectedUser }),
              ),
              catchError((error) =>
                of(
                  UsersActions.selectUserFailure({
                    error,
                  }),
                ),
              ),
            ),
        ),
      ),
    { dispatch: true },
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
