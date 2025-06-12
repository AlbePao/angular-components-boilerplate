import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@lib/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const isRequestAuthorized = authService.isAuthenticated;

  if (isRequestAuthorized) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${'JWT TOKEN'}`,
      },
    });

    return next(clonedRequest);
  }

  return next(request);
};
