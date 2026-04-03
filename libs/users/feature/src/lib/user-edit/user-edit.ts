import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { LabButton } from 'libs/lab/buttons/ui/src';
import { DialogService } from 'libs/lab/dialog/feature/src';
import { UsersFacade } from 'libs/users/+state/src';
import { UserEditDialog } from '../edit-dialog/edit-dialog';

export interface UseData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'users-edit',
  templateUrl: './user-edit.html',
  imports: [MatCardModule, LabButton],
  host: {
    class: 'block w-full md:max-w-[300px] m-auto',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit {
  private dialog = inject(DialogService<UseData>);
  private user = inject(UsersFacade);
  private route = inject(ActivatedRoute);

  public readonly selectedUser = this.user.selectedUser;
  public readonly isLoading = this.user.isUserByIdLoading;

  constructor() {
    /**
     *
     * Gets user id from router snapshot
     */
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.user.getUserById(+id);
    }

    /**
     * Register a new dialog into a static Dialog Record
     * @param id an identifier
     * @param component component node for rendering
     */
    this.dialog.register({
      id: 'user-edit',
      component: UserEditDialog,
    });
  }

  /**
   * Back main User list
   *
   */
  public navigateUsers(): void {
    this.user.navigateUserAll();
  }

  /**
   * Open registered dialog for edition
   *
   */

  public editUser() {
    this.dialog.openDialog('user-edit', this.selectedUser());
  }
}
