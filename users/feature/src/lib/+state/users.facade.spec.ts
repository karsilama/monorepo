import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';
import { UsersFacade } from './users.facade';
import { User } from './users.models';
import { USERS_FEATURE_KEY, UsersState, usersReducer } from './users.reducer';

interface TestSchema {
  users: UsersState;
}

describe('UsersFacade', () => {
  let facade: UsersFacade;
  let store: Store<TestSchema>;
  const createUsersEntity = (id: string, name = ''): User =>
    ({
      id,
      name: name || `name-${id}`,
    }) as unknown as User;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),
          EffectsModule.forFeature([UsersEffects]),
        ],
        providers: [UsersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UsersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', () => {
      let list = facade.all();
      let isLoaded = facade.loaded();

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = facade.all();
      isLoaded = facade.loaded();

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadUsersSuccess` to manually update list
     */
    it('all should return the loaded list; and loaded flag == true', () => {
      let list = facade.all();
      let isLoaded = facade.loaded();

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        UsersActions.loadUsersSuccess({
          users: [createUsersEntity('AAA'), createUsersEntity('BBB')],
        }),
      );

      list = facade.all();
      isLoaded = facade.loaded();

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
