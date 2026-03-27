import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserToken } from '../services/user-token.service';

interface CanUserEdit {
  canUserEdit(id: string): boolean;
}

@Injectable({
  providedIn: 'root',
})
class PermissionsService implements CanUserEdit {
  public canActivate(currentUser: UserToken): boolean {
    return !!currentUser;
  }
  public canMatch(currentUser: UserToken): boolean {
    return !!currentUser;
  }
  public canUserEdit(id: string): boolean {
    return !!id;
  }
}

export const canActivateEdition: CanActivateFn = () => {
  return inject(PermissionsService).canActivate(inject(UserToken));
};
