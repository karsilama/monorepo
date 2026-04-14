import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { UserDomainModel } from '@users/infrastructure';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';
export interface UsersState extends EntityState<UserDomainModel> {
  selectedId?: string | number;
  selectedUser: UserDomainModel | null;
  displayFields: (string | string[])[];
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

  /**
   * Must be requested
   * @todo
   */
  displayFields: [['company.name', 'company.title'], 'email'],
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true, selectedUser: null }),
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.getUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    userByIdLoading: false,
  })),
  on(UsersActions.getUserByIdFailure, (state) => ({
    ...state,
    userByIdLoading: false,
  })),
  on(UsersActions.getUserById, (state) => ({
    ...state,
    userByIdLoading: true,
  })),
  on(UsersActions.saveUserById, (state) => {
    return {
      ...state,
      /**
       * @todo
       * Real user by id update
       */
      userByIdLoading: true,
    };
  }),
  on(UsersActions.saveUserByIdFailure, (state) => {
    return {
      ...state,
      userByIdLoading: false,
    };
  }),
  on(UsersActions.saveUserByIdSuccess, (state) => {
    return {
      ...state,
      userByIdLoading: false,
    };
  }),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
