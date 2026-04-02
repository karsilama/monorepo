import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { UserDomainModel, UserFormModel } from '@users/infrastructure';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<UserDomainModel> {
  selectedId?: string | number;
  selectedUser: UserDomainModel | null;
  loaded: boolean;
  userByIdLoading: boolean;
  error?: string | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UserDomainModel> =
  createEntityAdapter<UserDomainModel>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  userByIdLoading: false,
  selectedUser: null,
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
    selectedUser: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true, selectedUser: null }),
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    selectedUser: null,
  })),
  on(UsersActions.getUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    userByIdLoading: false,
  })),
  on(UsersActions.getUserByIdFailure, (state) => ({
    ...state,
    selectedUser: null,
    userByIdLoading: false,
  })),
  on(UsersActions.getUserById, (state) => ({
    ...state,
    userByIdLoading: true,
  })),
  on(UsersActions.saveUserById, (state, { user }) => {
    return {
      ...state,
      selectedUser: formToDomainModel(user, state.selectedUser),
      isUserByIdLoading: true,
    };
  }),
  on(UsersActions.saveUserByIdFailure, (state) => {
    return {
      ...state,
      selectedUser: null,
      isUserByIdLoading: false,
    };
  }),
  on(UsersActions.saveUserByIdSuccess, (state) => {
    return {
      ...state,
      isUserByIdLoading: false,
    };
  }),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}

const formToDomainModel = (
  user: UserFormModel,
  selectedUser: UserDomainModel | null,
): UserDomainModel | null =>
  selectedUser
    ? {
        ...selectedUser,
        ...user,
      }
    : null;
