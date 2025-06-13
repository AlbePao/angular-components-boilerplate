import { Pipe, PipeTransform } from '@angular/core';
import { AuthRoles } from '@lib/services/auth.service';
import { isArray } from '@lib/utils/value-checking';

@Pipe({
  name: 'ifUserRoles',
})
export class IfUserRolesPipe implements PipeTransform {
  transform(userRoles: AuthRoles[], allowedRoles: AuthRoles | AuthRoles[]): boolean {
    return isArray(allowedRoles)
      ? allowedRoles.some((role) => userRoles.includes(role))
      : userRoles.includes(allowedRoles);
  }
}
