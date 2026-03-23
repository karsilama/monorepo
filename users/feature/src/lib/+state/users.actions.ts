import { createAction, props } from '@ngrx/store';
import { User } from './users.models';

export const initUsers = createAction('[Users Page] Init');

export const selectUser = createAction(
  '[Users/API] Select User',
  props<{
    id: number;
  }>(),
);

export const selectUserSuccess = createAction(
  '[Users/API] Select User Success',
  props<{ selectedUser: User }>(),
);

export const selectUserFailure = createAction(
  '[Users/API] Select User Failure',
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

export const editUser = createAction(
  '[Users/API] Edit User',
  props<{ id: number }>(),
);
