import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { UserDomainModel } from '@users/infrastructure';
import { DEFAULT_AVATAR } from './user-custom-column.constant';

@Component({
  selector: 'users-custom-column',
  templateUrl: './user-custom-column.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule],
})
export class UserCustomColumn {
  public user = input.required<UserDomainModel>();
  public defaultAvatar = DEFAULT_AVATAR;
}
