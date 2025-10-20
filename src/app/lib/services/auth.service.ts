import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { storage } from '@lib/storage';
import { User, UserRoles } from '@lib/types/user';

interface LoginConfig {
  returnUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router = inject(Router);

  private readonly _user = signal<User | null>(storage.getItem('appSession'));

  get isAuthenticated(): boolean {
    return !!this._user();
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
    this._user.set(user);
    void this._router.navigateByUrl(config.returnUrl);
  }

  logout(): void {
    storage.removeItem('appSession');
    this._user.set(null);
    void this._router.navigateByUrl('/auth/login');
  }

  getUserRoles(): UserRoles[] {
    return this._user()?.roles ?? [];
  }

  getUserName(): string | null {
    return this._user()?.username ?? null;
  }

  getUserEmail(): string | null {
    return this._user()?.email ?? null;
  }
}
