import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SuiteMiniFabButton } from '@suite/buttons/ui';
import { UsersFacade } from 'libs/users/+state/src';

@Component({
  selector: 'users-all',
  imports: [MatListModule, RouterModule, SuiteMiniFabButton],
  templateUrl: './user-all.html',
  host: {
    class: 'flex justify-center items-center',
  },
  standalone: true,
})
export class UserAll {
  /**
   * The User facade service for store interactions
   */
  private user = inject(UsersFacade);

  /**
   * Reactive selectors from signal store
   */
  public users = this.user.all;
  public error = this.user.error;
  public loaded = this.user.loaded;

  /**
   * Navigate to de User edition page
   * @param id  identifier
   */
  public navigateUserEdit(id: number): void {
    this.user.navigateUserEdit(id);
  }
}
