import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListRow } from '@lab/list-page-infrastructure';
import { ListPage } from '@lab/list-page/feature';
import { Divider } from '@lab/ui';
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
  public user = inject(UsersFacade);

  /**
   * Reactive selectors from signal store
   */
  public users = this.user.all;
  public error = this.user.error;
  public loaded = this.user.loaded;

  /**
   * Mapping users data in order to fit
   * with the ListPage Api
   */

  public listPageData = computed(() => {
    const users = this.users();
    console.log(users);
    return {
      id: USERS_LIST_PAGE_ID,
      rows: users.map((row) => {
        const rowData: Record<string, unknown> = row as unknown as Record<
          string,
          unknown
        >;
        return {
          id: String(row.id),
          lines: Object.entries(rowData)
            .slice(0, 3)
            .map(([key, value]) => ({
              key,
              value: String(value),
            })),
        } as ListRow;
      }),
    };
  });

  /**
   * Navigate to de User edition page
   * @param row  list row with user id
   */
  public navigateUserEdit(row: ListRow): void {
    this.user.navigateUserEdit(row.id);
  }
}
