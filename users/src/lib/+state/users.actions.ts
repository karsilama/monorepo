import { createAction, props } from '@ngrx/store';
import { UserDomainModel, UserFormModel } from './users.models';

export const initUsers = createAction('[Users Page] Init');

export const navigateUserAll = createAction('[Users/API] Navigate user all');

export const navigateUserEdit = createAction(
  '[Users/API] Navigate user edit',
  props<{ id: number }>(),
);

export const getUserById = createAction(
  '[Users/API] Get UserDomainModel by id',
  props<{
    id: number;
  }>(),
);

export const saveUserById = createAction(
  '[Users/API] Save UserDomainModel by id',
  props<{
    user: UserFormModel;
  }>(),
);

export const saveUserByIdSuccess = createAction(
  '[Users/API] Save UserDomainModel by id succeed',
);

export const saveUserByIdFailure = createAction(
  '[Users/API] Save UserDomainModel by id failure',
  props<{
    error: string;
  }>(),
);

export const getUserByIdSuccess = createAction(
  '[Users/API] Select UserDomainModel by id Failure',
  props<{ user: UserDomainModel }>(),
);

export const getUserByIdFailure = createAction(
  '[Users/API] Get UserDomainModel by id Failure',
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
  props<{ users: UserDomainModel[] }>(),
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: string }>(),
);
