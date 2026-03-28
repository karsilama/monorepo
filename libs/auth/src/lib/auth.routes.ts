import { Route } from '@angular/router';
import { Login } from './login/login';

export const AuthRoutes: Route[] = [
  {
    path: '',
    component: Login,
  },
];
