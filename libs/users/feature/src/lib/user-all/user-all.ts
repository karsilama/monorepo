import { Component, computed, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListPage } from "@lab/list-page/feature";
import { List, ListRow } from "@lab/list-page/infrastructure";
import { Divider } from "@lab/ui";
import { getUserAllLines } from "@users/domain";
import { UsersFacade } from "libs/users/+state/src";
import { UserCustomColumn } from "../user-custom-column/user-custom-column";
import { USERS_LIST_PAGE_ID } from "./user-all.constant";

@Component({
  selector: "users-all",
  imports: [RouterModule, ListPage, Divider],
  templateUrl: "./user-all.html",
  host: {
    class: "flex justify-center items-center",
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
   *
   * @Optional component List shows row key:value instead
   */

  public listPageData = computed(() => {
    const users = this.users();
    const displayFields = this.userFacade.displayFields();

    return {
      id: USERS_LIST_PAGE_ID,
      rows: users.map((user) => ({
        id: String(user.id),
        lines: getUserAllLines(user, displayFields),
        component: UserCustomColumn,
        metadata: user,
      })),
    } as List;
  });

  /**
   * Navigate to de User edition page
   * @param {ListRow} row  list row with user id
   */
  public navigateUserEdit(row: ListRow): void {
    this.userFacade.navigateUserEdit(row.id);
  }
}
