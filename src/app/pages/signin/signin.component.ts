import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  login() {
    // Clear previous errors
    this.errorMessage = '';
    
    // Validate inputs
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    const user = {
      email: this.email,
      password: this.password
    };

    console.log('🔄 Attempting login with:', { email: this.email, password: '***' });
    
    this.http.post<{ token: string }>('https://localhost:7208/api/auth/login', user)
      .pipe(
        tap(response => {
          console.log('✅ Login response received:', response);
          console.log('Token from response:', response.token);
          
          // Clear localStorage first
          localStorage.removeItem('jwt');
          
          // Store the new token
          localStorage.setItem('jwt', response.token);
          
          // Verify it was stored
          const storedToken = localStorage.getItem('jwt');
          console.log('Token stored successfully:', !!storedToken);
          console.log('Stored token matches:', storedToken === response.token);
        })
      )
      .subscribe({
        next: () => {
          console.log('✅ Login successful, navigating...');
          this.router.navigate(['/userPage']);
        },
        error: err => {
          console.error('❌ Login failed', err);
          this.loading = false;
          
          // Handle different error types
          if (err.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else if (err.status === 0) {
            this.errorMessage = 'Cannot connect to server. Please check if the API is running.';
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}