import { HttpClient } from '@angular/common/http';
import { Component, inject, resource } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { User } from '@users/shared';
import { firstValueFrom } from 'rxjs';

const matModules = [MatListModule];

interface UsersResponse {
  users: User[];
}

@Component({
  selector: 'lib-user-all',
  imports: [matModules],
  templateUrl: './user-all.html',
  styles: ``,
  standalone: true,
})
export class UserAll {
  private http = inject(HttpClient);

  public users = resource<User[], void>({
    loader: async () => {
      const response = await firstValueFrom(
        this.http.get<UsersResponse>('https://dummyjson.com/users')
      );
      return response.users;
    },
  });
}
