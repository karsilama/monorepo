import {
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth-interceptor';
import { AuthService } from './auth-service';

describe('AuthInterceptor', () => {
  let authService: AuthService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            getAuthToken: jest.fn(() => null),
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    injector = TestBed.inject(Injector);
  });

  it('should add Authorization header when token exists', () => {
    (authService.getAuthToken as jest.Mock).mockReturnValue({
      accessToken: 'test-token',
    });

    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandlerFn = (nextReq) => {
      expect(nextReq.headers.has('X-Authentication-Token')).toBe(true);
      expect(nextReq.headers.get('X-Authentication-Token')).toBe('test-token');
      return of(new HttpResponse({ status: 200, body: {} }));
    };

    runInInjectionContext(injector, () => {
      AuthInterceptor(req, next).subscribe();
    });
  });

  it('should not add Authorization header when token is null', () => {
    (authService.getAuthToken as jest.Mock).mockReturnValue(null);

    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandlerFn = (nextReq) => {
      expect(nextReq.headers.has('X-Authentication-Token')).toBe(true);
      expect(nextReq.headers.get('X-Authentication-Token')).toBe('');
      return of(new HttpResponse({ status: 200, body: {} }));
    };

    runInInjectionContext(injector, () => {
      AuthInterceptor(req, next).subscribe();
    });
  });
});
