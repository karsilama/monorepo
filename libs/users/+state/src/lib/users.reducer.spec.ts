import { UserDomainModel, UserFormModel } from '@users/infrastructure';
import * as UsersActions from './users.actions';
import { initialUsersState, usersReducer } from './users.reducer';

describe('Users Reducer', () => {
  const dummyUser: UserDomainModel = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
  };

  it('should return the initial state when action is unknown', () => {
    const action = { type: 'Unknown' } as any;
    const state = usersReducer(undefined, action);
    expect(state).toEqual(initialUsersState);
  });

  it('should set loaded to true on loadUsersSuccess', () => {
    const action = UsersActions.loadUsersSuccess({ users: [dummyUser] });
    const state = usersReducer(initialUsersState, action);
    expect(state.loaded).toBe(true);
    expect(state.ids.length).toBe(1);
    expect(state.entities['1']).toEqual(dummyUser);
    expect(state.selectedUser).toBeNull();
  });

  it('should set error on loadUsersFailure', () => {
    const error = 'Load failed';
    const action = UsersActions.loadUsersFailure({ error });
    const state = usersReducer(initialUsersState, action);
    expect(state.error).toBe(error);
    expect(state.selectedUser).toBeNull();
  });

  it('should set selectedUser on getUserByIdSuccess', () => {
    const action = UsersActions.getUserByIdSuccess({ user: dummyUser });
    const state = usersReducer(initialUsersState, action);
    expect(state.selectedUser).toEqual(dummyUser);
    expect(state.userByIdLoading).toBe(false);
  });

  it('should set userByIdLoading to true on getUserById', () => {
    const action = UsersActions.getUserById({ id: 1 });
    const state = usersReducer(initialUsersState, action);
    expect(state.userByIdLoading).toBe(true);
  });

  it('should update selectedUser on saveUserById', () => {
    const prevState = {
      ...initialUsersState,
      selectedUser: dummyUser,
      loaded: true,
    };
    const updatedForm: UserFormModel = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
    };
    const action = UsersActions.saveUserById({
      user: updatedForm,
    });
    const state = usersReducer(prevState, action);
    expect(state.selectedUser).toEqual({ ...dummyUser, ...updatedForm });
  });
});
