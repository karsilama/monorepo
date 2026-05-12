import { InjectionToken } from '@angular/core';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export const AUTH_USER = new InjectionToken<AuthUser>('AUTH_USER');
