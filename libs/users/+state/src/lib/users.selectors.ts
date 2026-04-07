import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';

export const selectUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const userByIdLoading = createSelector(
  selectUsersState,
  (state: UsersState) => state.userByIdLoading,
);

export const selectSelectedUser = createSelector(
  selectUsersState,
  (state: UsersState) => state.selectedUser,
);

export const selectUsersLoaded = createSelector(
  selectUsersState,
  (state: UsersState) => state.loaded,
);

export const selectDisplayFields = createSelector(
  selectUsersState,
  (state: UsersState) => state.displayFields,
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error,
);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => selectAll(state),
);

export const selectUsersEntities = createSelector(
  selectUsersState,
  (state: UsersState) => selectEntities(state),
);

export const selectSelectedId = createSelector(
  selectUsersState,
  (state: UsersState) => state.selectedId,
);

export const selectEntity = createSelector(
  selectUsersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
