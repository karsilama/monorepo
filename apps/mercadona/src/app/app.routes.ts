import { Route } from '@angular/router';
import { Home } from './home/home';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => Home,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('@auth').then((x) => x.AuthFeatureModule),
  },
];
