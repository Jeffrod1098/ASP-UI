import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard: Checking authentication...');
    
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      console.log('AuthGuard: No token found, redirecting to signin');
      this.router.navigate(['/signin']);
      return false;
    }

    // Simple token expiration check
    if (this.isTokenExpired(token)) {
      console.log('AuthGuard: Token expired, redirecting to signin');
      localStorage.removeItem('jwt');
      this.router.navigate(['/signin']);
      return false;
    }

    console.log('AuthGuard: Authentication successful');
    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
}