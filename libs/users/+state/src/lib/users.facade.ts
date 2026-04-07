import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserDomainModel, UserFormModel } from '@users/infrastructure';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private store = inject(Store);

  /**
   * @return {string[]} recursive key.value string ex: 'field.subField.anotherSubField'
   */
  public readonly displayFields = this.store.selectSignal(
    UsersSelectors.selectDisplayFields,
  );

  /**
   * @return {boolean[]} boolean Flag
   */

  public readonly isUserByIdLoading = this.store.selectSignal(
    UsersSelectors.userByIdLoading,
  );

  /**
   * @return {boolean[]} boolean Flag
   */

  public readonly loaded = this.store.selectSignal(
    UsersSelectors.selectUsersLoaded,
  );

  /**
   * The user by id selected
   * @return {UserDomainModel[]}
   */
  public readonly selectedUser = this.store.selectSignal(
    UsersSelectors.selectSelectedUser,
  );

  /**
   * A simple error string
   * @return {string}
   */

  public readonly error = this.store.selectSignal(
    UsersSelectors.selectUsersError,
  );

  /**
   * All user from dummy json
   * @return {UserDomainModel[]}
   */

  public readonly all = this.store.selectSignal(UsersSelectors.selectAllUsers);

  /***
   * @params {string} id
   * @returns {void}
   * * */

  public navigateUserEdit(id: string): void {
    this.store.dispatch(UsersActions.navigateUserEdit({ id }));
  }
  /***
   * @returns {void}
   * * */

  public navigateUserAll(): void {
    this.store.dispatch(UsersActions.navigateUserAll());
  }
  /***
   * @params {string} id
   * @returns {void}
   * * */

  public getUserById(id: string): void {
    this.store.dispatch(UsersActions.getUserById({ id }));
  }
  /**
   *
   * @params {UserDomainModel} user
   * @returns {void}
   * * */

  public saveUserById(formModel: UserFormModel): void {
    this.store.dispatch(UsersActions.saveUserById({ formModel }));
  }
}
