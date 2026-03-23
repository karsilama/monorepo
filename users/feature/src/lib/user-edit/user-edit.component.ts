import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsersFacade } from '../+state/users.facade';

export interface UserEditState {
  id?: string;
  name?: string;
  email?: string;
}

@Component({
  templateUrl: './user-edit.component.html',
  selector: 'lib-user-edit',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEdit {
  private user = inject(UsersFacade);
  public readonly selectedUser = this.user.selectedUser;
}
