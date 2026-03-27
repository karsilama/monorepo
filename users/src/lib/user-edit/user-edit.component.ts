import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@suite/feature';
import { SuiteButton } from '@suite/ui';
import { UsersFacade } from '../+state/users.facade';
import { UserEditDialog } from '../user-edit-dialog/user-edit-dialog.component';

export interface UseData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  imports: [MatCardModule, SuiteButton],
  host: {
    class: 'lg:w-[640px] flex justify-center items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit {
  private dialog = inject(DialogService<UseData>);
  private user = inject(UsersFacade);
  private route = inject(ActivatedRoute);

  public readonly selectedUser = this.user.selectedUser;

  constructor() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.user.getUserById(+id);
    }
    this.dialog.register({
      id: 'user-edit',
      component: UserEditDialog,
    });
  }

  public navigateUsers(): void {
    this.user.navigateUserAll();
  }

  public editUser() {
    this.dialog.openDialog('user-edit', this.selectedUser());
  }
}
