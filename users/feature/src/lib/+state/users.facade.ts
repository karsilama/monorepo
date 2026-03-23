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
  public readonly error = this.store.selectSignal(
    UsersSelectors.selectUsersError,
  );
  public readonly all = this.store.selectSignal(UsersSelectors.selectAllUsers);
  public readonly selected = this.store.selectSignal(
    UsersSelectors.selectEntity,
  );

  init() {
    this.store.dispatch(UsersActions.initUsers());
  }
}
