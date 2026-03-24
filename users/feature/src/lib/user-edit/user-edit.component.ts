import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SuiteDialog } from '@suite/util';
import { UsersFacade } from '../+state/users.facade';

export interface UserEditState {
  id?: string;
  name?: string;
  email?: string;
}

@Component({
  templateUrl: './user-edit.component.html',
  selector: 'lib-user-edit',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit extends SuiteDialog {
  private user = inject(UsersFacade);
  private route = inject(ActivatedRoute);

  public readonly selectedUser = this.user.selectedUser;

  constructor() {
    super();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.user.getUserById(+id);
    }
  }

  public navigateUsers(): void {
    this.user.navigateUserAll();
  }
}
