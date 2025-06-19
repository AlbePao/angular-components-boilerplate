import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { storage } from '@lib/storage';
import { User, UserRoles } from '@lib/types/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface LoginConfig {
  returnUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router = inject(Router);

  private readonly _user$ = new BehaviorSubject<User | null>(storage.getItem('appSession'));

  get isAuthenticated(): boolean {
    return !!this._user$.getValue();
  }

  login(config: LoginConfig): void {
    const user: User = {
      id: 'some-user-id',
      username: 'Lorem Ipsum',
      email: 'lorem@ipsum.com',
      token: 'abc',
      roles: ['admin'],
    };

    storage.setItem('appSession', user);
    this._user$.next(user);
    void this._router.navigateByUrl(config.returnUrl);
  }

  logout(): void {
    storage.removeItem('appSession');
    this._user$.next(null);
    void this._router.navigateByUrl('/auth/login');
  }

  getUserRoles(): Observable<UserRoles[]> {
    return this._user$.pipe(map((user) => user?.roles ?? []));
  }

  getUserName(): Observable<string | null> {
    return this._user$.pipe(map((user) => user?.username ?? null));
  }

  getUserEmail(): Observable<string | null> {
    return this._user$.pipe(map((user) => user?.email ?? null));
  }
}
