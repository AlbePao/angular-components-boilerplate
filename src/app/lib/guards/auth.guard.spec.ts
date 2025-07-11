/* eslint-disable @typescript-eslint/unbound-method */
// src/app/lib/guards/auth.guard.spec.ts
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GuardResult, MaybeAsync, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '@lib/services/auth.service';
import { authGuard } from './auth.guard';

// A simple stub with a mutable `isAuthenticated` field
class MockAuthService {
  isAuthenticated = false;
}

describe('authGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let authService: MockAuthService;
  let injector: Injector;

  const dummyRoute: Route = {};
  const segments = [new UrlSegment('foo', {}), new UrlSegment('bar', {})];

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    injector = TestBed.inject(Injector);
    authService = TestBed.inject(AuthService);
  });

  function runGuard(options?: { requiresAuthentication: boolean }): MaybeAsync<GuardResult> {
    const guardFn = options ? authGuard(options) : authGuard();
    return runInInjectionContext(injector, () => guardFn(dummyRoute, segments));
  }

  it('should allow navigation when requiresAuthentication=true and user is authenticated', () => {
    authService.isAuthenticated = true;
    const result = runGuard();
    expect(result).toBeTrue();
  });

  it('should redirect to /auth/login when requiresAuthentication=true and user is not authenticated', () => {
    authService.isAuthenticated = false;
    const fakeTree = {} as UrlTree;
    mockRouter.createUrlTree.and.returnValue(fakeTree);

    const result = runGuard();

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/auth/login'], { queryParams: { returnUrl: 'foo/bar' } });
    expect(result).toBe(fakeTree);
  });

  it('should allow navigation when requiresAuthentication=false and user is not authenticated', () => {
    authService.isAuthenticated = false;
    const result = runGuard({ requiresAuthentication: false });
    expect(result).toBeTrue();
  });

  it('should redirect to root ("/") when requiresAuthentication=false but user is authenticated', () => {
    authService.isAuthenticated = true;
    const fakeTree = {} as UrlTree;
    mockRouter.createUrlTree.and.returnValue(fakeTree);

    const result = runGuard({ requiresAuthentication: false });

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
    expect(result).toBe(fakeTree);
  });
});
