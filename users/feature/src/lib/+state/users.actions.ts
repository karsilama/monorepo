import { createAction, props } from '@ngrx/store';
import { User } from './users.models';

export const initUsers = createAction('[Users Page] Init');

export const navigateUserAll = createAction('[Users/API] Navigate user all');

export const navigateUserEdit = createAction(
  '[Users/API] Navigate user edit',
  props<{ id: number }>(),
);

export const getUserById = createAction(
  '[Users/API] Get User by id',
  props<{
    id: number;
  }>(),
);

export const getUserByIdSuccess = createAction(
  '[Users/API] Select User by id Failure',
  props<{ user: User }>(),
);

export const getUserByIdFailure = createAction(
  '[Users/API] Get User by id Failure',
  props<{ error: string }>(),
);

export const requestUsers = createAction(
  '[Users/API] Request Users',
  props<{
    pageSize: number;
  }>(),
);

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: User[] }>(),
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: string }>(),
);
