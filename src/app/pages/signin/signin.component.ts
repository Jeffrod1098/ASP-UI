import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

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
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    const user = {
      email: this.email,
      password: this.password
    };

    console.log('Attempting login with:', { email: this.email, password: '***' });
    
    this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        tap(response => {         
          // Clear localStorage first
          localStorage.removeItem('jwt');
          
          localStorage.setItem('jwt', response.token);
          
          const storedToken = localStorage.getItem('jwt');
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/userPage']);
        },
        error: err => {
          console.error('Login failed', err);
          this.loading = false;
          
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