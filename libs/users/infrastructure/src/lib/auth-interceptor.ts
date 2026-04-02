import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/domain';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authUser = inject(AuthService).getAuthToken();
  const authToken = authUser?.accessToken || '';
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}
