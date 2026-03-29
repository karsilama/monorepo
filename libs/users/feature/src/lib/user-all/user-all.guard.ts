import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  canActivate(currentUser: UserToken): boolean {
    return !!currentUser;
  }
  canMatch(currentUser: UserToken): boolean {
    return !!currentUser;
  }
}

export const canActivateTeam: CanActivateFn = () => {
  return inject(PermissionsService).canActivate(inject(UserToken));
};
