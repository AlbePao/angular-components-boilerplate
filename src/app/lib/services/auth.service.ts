import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRoles } from '@lib/types/user';
import { StorageService } from './storage.service';

interface LoginConfig {
  returnUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _router = inject(Router);
  private readonly _storageService = inject(StorageService);

  private readonly _user = signal<User | null>(this._storageService.getItem('appSession'));

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

    this._storageService.setItem('appSession', user);
    this._user.set(user);
    void this._router.navigateByUrl(config.returnUrl);
  }

  logout(): void {
    this._storageService.removeItem('appSession');
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
