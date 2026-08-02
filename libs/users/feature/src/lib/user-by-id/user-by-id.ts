import { AsyncPipe } from "@angular/common";
import { Component, effect, inject, injectAsync, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatAnchor } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { LabButton } from "@lab/buttons/ui";
import { DialogService } from "@lab/dialog/feature";
import { Divider } from "@lab/ui";
import { UsersFacade } from "@users/+state";
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
  imports: [
    MatCardModule,
    LabButton,
    Divider,
    MatIconModule,
    AsyncPipe,
    MatAnchor,
  ],
  host: {
    class: "block w-full md:max-w-[300px] m-auto p-4",
  },
})
export class UserById {
  private dialog = inject(DialogService<UseData>);
  private user = inject(UsersFacade);
  private route = inject(ActivatedRoute);

  public stock = signal(0);

  public userByIdService = injectAsync(() =>
    import("./user-by-id.service").then((x) => x.UserByIdService),
  );

  public params = toSignal(this.route.paramMap);

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
      const id = this.params()?.get("id");
      if (id) {
        this.user.getUserById(id);
      }
    });
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

  public async checkStock(): Promise<void> {
    const service = await this.userByIdService();
    const value = service.status.value() as { stock: number };
    console.log(value?.stock ?? 0);
    this.stock.set(value?.stock ?? 0);
  }
}
