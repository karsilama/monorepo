import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/domain';

interface CanUserEdit {
  canUserEdit(auth: AuthService): boolean;
}

@Injectable({
  providedIn: 'root',
})
class PermissionsService implements CanUserEdit {
  canActivate(auth: AuthService): boolean {
    return !!auth.validateToken();
  }
  canMatch(auth: AuthService): boolean {
    return !!auth.validateToken();
  }
  public canUserEdit(auth: AuthService): boolean {
    return !!auth.userCanEdit();
  }
}

export const canActivateEdition: CanActivateFn = () => {
  return inject(PermissionsService).canActivate(inject(AuthService));
};
