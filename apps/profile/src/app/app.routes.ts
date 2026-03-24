import { Route } from '@angular/router';
import { Home } from './home/home';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => Home,
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@users/feature').then((x) => x.UsersFeatureModule),
  },
];
