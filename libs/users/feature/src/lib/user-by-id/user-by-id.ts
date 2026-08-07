import {
  Component,
  effect,
  inject,
  injectAsync,
  Injector,
  input,
  signal,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { LabButton } from "@lab/buttons/ui";
import { DialogService } from "@lab/dialog/feature";
import { Divider } from "@lab/ui";
import { trimString } from "@lab/util";
import { PushPipe } from "@ngrx/component";
import { UsersFacade } from "@users/+state";
import { UserEditDialog } from "../user-by-id-dialog/user-by-id-dialog";
import { USER_ID } from "../users-feature.module";
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

  private readonly parentInjector = inject(Injector);

  public readonly stockService = injectAsync(() =>
    import("./stock.service").then((x) => x.StockService),
  );

  protected readonly stock = signal<string | null>(null);

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

    effect(async () => {
      const id = this.id();

      const injector = Injector.create({
        parent: this.parentInjector,
        providers: [
          {
            provide: USER_ID,
            useValue: id,
          },
        ],
      });

      const service = await this.stockService();

      this.stock.set(await service.getStock(injector));
      this.user.getUserById(id);
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
}
