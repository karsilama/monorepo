import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserFormModel } from '@users/domain';
import * as UsersActions from './users.actions';
import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  let facade: UsersFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersFacade, provideMockStore()],
    });

    facade = TestBed.inject(UsersFacade);
    store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
  });

  it('should dispatch navigateUserEdit', () => {
    const id = 123;
    facade.navigateUserEdit(id);
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.navigateUserEdit({ id }),
    );
  });

  it('should dispatch navigateUserAll', () => {
    facade.navigateUserAll();
    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.navigateUserAll());
  });

  it('should dispatch getUserById', () => {
    const id = 123;
    facade.getUserById(id);
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.getUserById({ id }),
    );
  });

  it('should dispatch saveUserById', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    } as UserFormModel;
    facade.saveUserById(user);
    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.saveUserById({ user }),
    );
  });
});
