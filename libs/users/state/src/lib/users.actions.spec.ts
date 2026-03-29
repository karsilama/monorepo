import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { UserDomainModel, UserFormModel, UsersResponse } from '@users/domain';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';

class MockRouter {
  navigateByUrl(url: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe('UsersEffects', () => {
  let actions: Observable<Action>;
  let effects: UsersEffects;
  let router: MockRouter;
  let httpMock: HttpTestingController;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: Router, useClass: MockRouter },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    effects = TestBed.inject(UsersEffects);
    router = TestBed.inject(Router) as unknown as MockRouter;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('init$', () => {
    it('should dispatch requestUsers with pageSize 5 when initUsers is dispatched', () => {
      actions = hot('-a-|', { a: UsersActions.initUsers() });

      const expected = hot('-a-|', {
        a: UsersActions.requestUsers({ pageSize: 5 }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });

  describe('navigateUserAll$', () => {
    it('should navigate to users and dispatch requestUsers with pageSize 5', () => {
      const navigateSpy = jest
        .spyOn(router, 'navigateByUrl')
        .mockResolvedValue(true);

      actions = hot('-a-|', { a: UsersActions.navigateUserAll() });

      const expected = hot('-a-|', {
        a: UsersActions.requestUsers({ pageSize: 5 }),
      });

      expect(effects.navigateUserAll$).toBeObservable(expected);
      expect(navigateSpy).toHaveBeenCalledWith('users');
    });
  });

  describe('navigateUserEdit$', () => {
    it('should dispatch getUserById when navigateUserEdit is dispatched', () => {
      const userId = 123;

      actions = hot('-a-|', {
        a: UsersActions.navigateUserEdit({ id: userId }),
      });

      const expected = hot('-a-|', {
        a: UsersActions.getUserById({ id: userId }),
      });

      expect(effects.navigateUserEdit$).toBeObservable(expected);
    });
  });

  describe('loadUsers$', () => {
    it('should dispatch loadUsersSuccess on successful API call', (done) => {
      const mockUsersResponse: UsersResponse = {
        users: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          } as UserDomainModel,
        ],
        total: 1,
        skip: 0,
        limit: 10,
      };

      actions = of(UsersActions.requestUsers({ pageSize: 10 }));

      effects.loadUsers$.subscribe({
        next: (result) => {
          expect(result).toEqual(
            UsersActions.loadUsersSuccess({ users: mockUsersResponse.users }),
          );
          done();
        },
      });

      const req = httpMock.expectOne('https://dummyjson.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsersResponse);
    });

    it('should dispatch loadUsersFailure on API error', (done) => {
      actions = of(UsersActions.requestUsers({ pageSize: 10 }));

      effects.loadUsers$.subscribe({
        next: (result) => {
          expect(result).toMatchObject({
            type: '[Users/API] Load Users Failure',
            error: expect.objectContaining({
              status: 404,
              error: 'Failed to load users',
            }),
          });
          done();
        },
      });

      const req = httpMock.expectOne('https://dummyjson.com/users');
      req.flush('Failed to load users', {
        status: 404,
        statusText: 'Not Found',
      });
    });
  });

  describe('getUserById$', () => {
    const mockUser: UserDomainModel = {
      id: 1,
      firstName: 'John Doe',
      lastName: 'John Doe',
      email: 'john@example.com',
    } as UserDomainModel;

    it('should dispatch getUserByIdSuccess on successful API call', (done) => {
      actions = of(UsersActions.getUserById({ id: 1 }));

      effects.getUserById$.subscribe({
        next: (result) => {
          expect(result).toEqual(
            UsersActions.getUserByIdSuccess({ user: mockUser }),
          );
          done();
        },
      });

      const req = httpMock.expectOne((req) => req.url.includes('users/1'));
      req.flush(mockUser);
    });

    it('should dispatch getUserByIdFailure on API error', (done) => {
      actions = of(UsersActions.getUserById({ id: 9 }));

      effects.getUserById$.subscribe({
        next: (result) => {
          expect(result.type).toBe(
            '[Users/API] Get UserDomainModel by id Failure',
          );
          done();
        },
      });

      const req = httpMock.expectOne((req) => req.url.includes('users/9'));
      req.flush('User not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('saveUserById$', () => {
    const mockUserForm: UserFormModel = {
      firstName: 'John Doe',
      lastName: 'John Doe',
      email: 'john@example.com',
    } as UserFormModel;

    it('should dispatch saveUserByIdSuccess when saveUserById is dispatched', (done) => {
      actions = of(UsersActions.saveUserById({ user: mockUserForm }));

      effects.saveUserById$.subscribe({
        next: (result) => {
          expect(result).toEqual(UsersActions.saveUserByIdSuccess());
          done();
        },
      });
    });
  });
});
