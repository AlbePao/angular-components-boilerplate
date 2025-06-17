import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@lib/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const serverErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        [(HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden)].includes(error.status)
      ) {
        authService.logout();

        return throwError(() => new Error(error.message));
      }

      return throwError(() => new Error('Something went wrong'));
    }),
  );
};
