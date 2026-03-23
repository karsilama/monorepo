import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UsersFacade } from '../+state/users.facade';

const matModules = [MatListModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'lib-user-all',
  imports: [matModules],
  templateUrl: './user-all.html',
  styles: ``,
  standalone: true,
})
export class UserAll {
  private user = inject(UsersFacade);

  public users = this.user.all;
  public error = this.user.error;
  public loaded = this.user.loaded;

  public editUser(id: number): void {
    this.user.editUser(id);
  }
}
