import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { storage } from '@lib/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_ROLES = [
  'admin', // Admin role
  'user', // Base user role
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

  private _isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getItem('appSession'));

  get isAuthenticated(): boolean {
    return this._isAuthenticated$.getValue();
  }

  login(config: LoginConfig): void {
    storage.setItem('appSession', { user: 'some-user-id', token: 'abc' });
    this._isAuthenticated$.next(true);
    void this._router.navigateByUrl(config.returnUrl);
  }

  logout(): void {
    storage.removeItem('appSession');
    this._isAuthenticated$.next(false);
    void this._router.navigateByUrl('/auth/login');
  }

  getUserRoles(): Observable<AuthRoles[]> {
    return of(['admin'] satisfies AuthRoles[]);
  }

  getUserName(): Observable<string> {
    return of('TEST');
  }
}
