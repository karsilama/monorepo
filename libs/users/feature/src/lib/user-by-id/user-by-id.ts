import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { LabButton } from 'libs/lab/buttons/ui/src';
import { DialogService } from 'libs/lab/dialog/feature/src';
import { UsersFacade } from 'libs/users/+state/src';
import { UserEditDialog } from '../edit-dialog/edit-dialog';
import { USER_BY_ID_DIALOG } from './user-by-id.constant';

export interface UseData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'users-by-id',
  templateUrl: './user-by-id.html',
  imports: [MatCardModule, LabButton],
  host: {
    class: 'block w-full md:max-w-[300px] m-auto p-4',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserById {
  private dialog = inject(DialogService<UseData>);
  private user = inject(UsersFacade);
  private route = inject(ActivatedRoute);

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
      const id = this.params()?.get('id');
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
    this.dialog.openDialog('user-edit', this.selectedUser());
  }
}
