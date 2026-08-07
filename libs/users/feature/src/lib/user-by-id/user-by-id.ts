import { Component, effect, inject, injectAsync, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { LabButton } from "@lab/buttons/ui";
import { DialogService } from "@lab/dialog/feature";
import { Divider } from "@lab/ui";
import { trimString } from "@lab/util";
import { PushPipe } from "@ngrx/component";
import { UsersFacade } from "@users/+state";
import { map, Observable } from "rxjs";
import { UserEditDialog } from "../user-by-id-dialog/user-by-id-dialog";
import { USER_BY_ID_DIALOG } from "./user-by-id.constant";

export interface UseData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: "users-by-id",
  templateUrl: "./user-by-id.html",
  imports: [MatCardModule, LabButton, Divider, MatIconModule, PushPipe],
  host: {
    class: "block w-full md:max-w-[300px] m-auto p-4",
  },
})
export class UserById {
  public id = input.required({
    transform: trimString,
  });

  public user = inject(UsersFacade);

  private dialog = inject(DialogService<UseData>);

  public readonly notificationService = injectAsync(() =>
    import("./notifications.service").then((x) => x.NotificationService),
  );

  protected notifications: Observable<number> = new Observable();

  public readonly selectedUser = this.user.selectedUser;
  public readonly isLoading = this.user.isUserByIdLoading;

  /**
   * Represents a User edition
   * Gets user id from router snapshot
   * Show user by id information
   * Register a new edition dialog
   * @constructor
   */
  constructor() {
    this.dialog.register({
      id: USER_BY_ID_DIALOG,
      component: UserEditDialog,
    });

    effect(() => {
      const id = this.id();
      this.user.getUserById(id);
      this.getNotifications(id);
    });
  }

  public async getNotifications(id: string) {
    const service = await this.notificationService();
    this.notifications = service.getNotifications(id).pipe(map((x) => x.stock));
  }

  /**
   * Back main User list
   */
  public navigateUsers(): void {
    this.user.navigateUserAll();
  }

  /**
   * Open registered dialog for edition
   * */

  public editUser() {
    this.dialog.openDialog(USER_BY_ID_DIALOG, this.selectedUser());
  }
}
