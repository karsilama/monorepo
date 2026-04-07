import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListRow } from '@lab/list-page-infrastructure';
import { ListPage } from '@lab/list-page/feature';
import { Divider } from '@lab/ui';
import { getUserAllLines } from '@users/domain';
import { UsersFacade } from 'libs/users/+state/src';
import { USERS_LIST_PAGE_ID } from './user-all.constant';

@Component({
  selector: 'users-all',
  imports: [RouterModule, ListPage, Divider],
  templateUrl: './user-all.html',
  host: {
    class: 'flex justify-center items-center',
  },
  standalone: true,
})
export class UserAll {
  /**
   * The User facade service for store interactions
   */
  public userFacade = inject(UsersFacade);

  /**
   * Reactive selectors from signal store
   */
  public users = this.userFacade.all;
  public error = this.userFacade.error;
  public loaded = this.userFacade.loaded;

  /**
   * Mapping users data in order to fit
   * with the ListPage Api
   */

  public listPageData = computed(() => {
    const users = this.users();
    const displayFields = this.userFacade.displayFields();

    return {
      id: USERS_LIST_PAGE_ID,
      rows: users.map((row) => ({
        id: String(row.id),
        lines: getUserAllLines(row, displayFields),
      })),
    };
  });

  /**
   * Navigate to de User edition page
   * @param {ListRow} row  list row with user id
   */
  public navigateUserEdit(row: ListRow): void {
    this.userFacade.navigateUserEdit(row.id);
  }
}
