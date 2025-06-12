import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { storage } from '@lib/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_ROLES = [
  'admins', // Admin role
  'viewers', // Base user role
] as const;

export type AuthRoles = (typeof AUTH_ROLES)[number];

export interface LoginConfig {
  returnUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router = inject(Router);

  isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getItem('appSession'));

  get isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }

  login(config: LoginConfig): void {
    storage.setItem('appSession', { user: 'some-user-id', token: 'abc' });
    this.isAuthenticated$.next(true);
    void this._router.navigateByUrl(config.returnUrl);
  }

  logout(): void {
    storage.removeItem('appSession');
    this.isAuthenticated$.next(false);
    void this._router.navigateByUrl('/auth/login');
  }

  getUserRoles(): Observable<AuthRoles[]> {
    return of(['admins'] satisfies AuthRoles[]);
  }

  getUserName(): Observable<string> {
    return of('TEST');
  }
}
