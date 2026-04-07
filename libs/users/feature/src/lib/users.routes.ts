import { Route } from '@angular/router';
import { UserAll } from './user-all/user-all';
import { canActivateTeam } from './user-all/user-all.guard';
import { UserById } from './user-by-id/user-by-id';
import { canActivateEdition } from './user-by-id/user-by-id.guard';

export const UsersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => UserAll,
    canActivate: [canActivateTeam],
  },
  {
    path: ':id',
    canActivate: [canActivateEdition],
    loadComponent: () => UserById,
  },
];
