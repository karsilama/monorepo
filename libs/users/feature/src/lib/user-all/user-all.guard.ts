import { inject, Injectable } from '@angular/core';
import { CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { AuthService } from '@auth/domain';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  canActivate(auth: AuthService): MaybeAsync<GuardResult> {
    /**
     * Fake API with fake credentials
     */
    return !!auth.validateToken();
  }
}

export const canActivateTeam: CanActivateFn = () => {
  return inject(PermissionsService).canActivate(inject(AuthService));
};
