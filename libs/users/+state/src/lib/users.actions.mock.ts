import { UserDomainModel, UserFormModel } from '@users/infrastructure';
import { Observable, of } from 'rxjs';

export const UsersMock: UserDomainModel[] = [
  {
    id: 1,
    firstName: 'John Doe',
    lastName: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: 2,
    firstName: 'John Doe',
    lastName: 'Jane Doe',
    email: 'jane@example.com',
  },
];

export class MockUsersFacade {
  getUsers(_: number): Observable<UserDomainModel[]> {
    return of(UsersMock);
  }

  getUserById(id: number): Observable<UserDomainModel> {
    return of({
      id: 1,
      firstName: 'John Doe',
      lastName: 'John Doe',
      email: 'john@example.com',
    });
  }

  saveUser(user: UserFormModel): Observable<any> {
    return of({
      id: 1,
      firstName: 'John Doe',
      lastName: 'John Doe',
      email: 'john@example.com',
    });
  }
}

export class MockRouter {
  navigateByUrl(url: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
