import { Route } from '@angular/router';
import { UserAll } from './user-all/user-all';
import { canActivateTeam } from './user-all/user-all.guard';

export const UsersRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'all',
        loadComponent: () => UserAll,
        canActivate: [canActivateTeam],
      },
    ],
  },
];
