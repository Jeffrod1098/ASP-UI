import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user has a token (simple authentication check)
    this.checkAuthStatus();
  }

  checkAuthStatus(): boolean {
    const token = localStorage.getItem('jwt');
    if (!token) return false;

    // Simple token expiration check
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  get isAuthenticated(): boolean {
    return this.checkAuthStatus();
  }

  logout() {
    console.log('🔄 Navbar: Logging out...');
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }

  navigateHome() {
    // Navigate to home/landing page
    this.router.navigate(['/']);
  }
}