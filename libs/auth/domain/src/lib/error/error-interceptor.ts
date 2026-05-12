import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      switch (e.status) {
        case 0:
          console.error("Network or CORS error");
          break;

        case 400:
          console.error("Bad Request");
          break;

        case 401:
          console.error("Unauthorized");
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Not Found");
          break;

        case 500:
          console.error("Server Error");
          break;
      }
      return throwError(() => e);
    }),
  );
