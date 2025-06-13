import { NgIf } from '@angular/common';
import { Directive, Input, inject } from '@angular/core';
import { AuthRoles, AuthService } from '@lib/services/auth.service';
import { isArray } from '@lib/utils/value-checking';
import { take } from 'rxjs';

@Directive({
  selector: '[appIfUserRoles]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgIf, // TODO: convert into a pipe
      inputs: ['ngIf: appIfUserRoles'],
    },
  ],
})
export class IfUserRolesDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _authService = inject(AuthService);

  @Input({ alias: 'appIfUserRoles', required: true })
  set role(allowedRoles: AuthRoles | AuthRoles[]) {
    this._authService
      .getUserRoles()
      .pipe(take(1))
      .subscribe((userRoles) => {
        const canUserAccess = isArray(allowedRoles)
          ? allowedRoles.some((role) => userRoles.includes(role))
          : userRoles.includes(allowedRoles);

        this._ngIfDirective.ngIf = canUserAccess;
      });
  }
}
