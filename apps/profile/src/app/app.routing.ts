import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: Home,
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@users/feature').then((x) => x.UsersFeatureModule),
  },
];
