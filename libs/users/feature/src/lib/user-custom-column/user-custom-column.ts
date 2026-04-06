import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LabAvatar } from '@lab/ui';
import { UserDomainModel } from '@users/infrastructure';
import { DEFAULT_AVATAR } from './user-custom-column.constant';

@Component({
  selector: 'users-custom-column',
  templateUrl: './user-custom-column.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LabAvatar],
})
export class UserCustomColumn {
  public context = input.required<UserDomainModel>();
  public defaultAvatar = DEFAULT_AVATAR;
}
