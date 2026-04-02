import { Component, inject, resource } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/domain';

const matModules = [MatButtonModule];
@Component({
  selector: 'app-home',
  imports: [matModules, RouterLink],
  template: `
    @if (user.value()?.accessToken) {
      <button mat-button routerLink="/users">Users page</button>
    } @else {
      <button mat-button>Loading..</button>
    }
  `,
})
export class Home {
  private auth = inject(AuthService);

  public user = resource({
    /***
     * Fake login with fake credentials
     * Angular Resource
     * Promise based
     */

    loader: async () =>
      this.auth.loginUser({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 60,
      }),
  });
}
