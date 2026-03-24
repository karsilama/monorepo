import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  private store = inject(Store);

  public readonly loaded = this.store.selectSignal(
    UsersSelectors.selectUsersLoaded,
  );

  public readonly selectedUser = this.store.selectSignal(
    UsersSelectors.selectSelectedUser,
  );

  public readonly error = this.store.selectSignal(
    UsersSelectors.selectUsersError,
  );

  public readonly all = this.store.selectSignal(UsersSelectors.selectAllUsers);

  public readonly selected = this.store.selectSignal(
    UsersSelectors.selectEntity,
  );

  public navigateUserEdit(id: number): void {
    this.store.dispatch(UsersActions.navigateUserEdit({ id }));
  }

  public navigateUserAll(): void {
    this.store.dispatch(UsersActions.navigateUserAll());
  }

  public getUserById(id: number): void {
    this.store.dispatch(UsersActions.getUserById({ id }));
  }
}
