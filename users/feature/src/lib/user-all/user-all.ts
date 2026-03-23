import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { editUser } from '../+state/users.actions';
import { UsersFacade } from '../+state/users.facade';

const matModules = [MatListModule, MatIconModule];

@Component({
  selector: 'lib-user-all',
  imports: [matModules],
  templateUrl: './user-all.html',
  styles: ``,
  standalone: true,
})
export class UserAll {
  private user = inject(UsersFacade);
  private store = inject(Store);

  public users = this.user.all;
  public error = this.user.error;
  public loaded = this.user.loaded;

  public navigate(id: string): void {
    this.store.dispatch(editUser({ id }));
  }
}
