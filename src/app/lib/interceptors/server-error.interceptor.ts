import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@lib/services/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const serverErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(error.status)) {
        authService.logout();
      }

      return throwError(() => error);
    }),
  );
};
