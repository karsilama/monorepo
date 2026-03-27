import { Route } from '@angular/router';
import { UserAll } from './user-all/user-all';
import { canActivateTeam } from './user-all/user-all.guard';
import { UserEdit } from './user-edit/user-edit.component';
import { canActivateEdition } from './user-edit/user-edit.guard';

export const UsersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => UserAll,
    canActivate: [canActivateTeam],
  },
  {
    path: ':id',
    canActivate: [canActivateEdition],
    loadComponent: () => UserEdit,
  },
];
