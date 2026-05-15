import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";

import { searchTermChanges } from "@lab/list-page/feature";
import { UserDomainModel } from "@users/infrastructure";
import * as UsersActions from "./users.actions";

export const USERS_FEATURE_KEY = "users";
export interface UsersState extends EntityState<UserDomainModel> {
  selectedId?: string | number;
  selectedUser: UserDomainModel | null;
  displayFields: (string | string[])[];
  loaded: boolean;
  searchTerm: string;
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
  searchTerm: "",

  /**
   * Must be requested
   * @todo
   */
  displayFields: [["company.name", "company.title"], "email"],
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(searchTermChanges, (state, { value }) => ({
    ...state,
    searchTerm: value,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true }),
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
  on(UsersActions.saveUserById, (state, formModel) => {
    return {
      ...state,
      /**
       * @todo
       * Real user by id update
       * Meanwhile, optimistic update
       */
      selectedUser: {
        ...state.selectedUser,
        firstName: formModel.formModel.firstName,
        lastName: formModel.formModel.lastName,
        email: formModel.formModel.email,
      },
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
