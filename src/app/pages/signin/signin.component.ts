import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient) {}

  login() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.http.post<{ token: string }>('https://localhost:5001/api/auth/login', user)
      .pipe(
        tap(response => {
          // Save token in localStorage
          localStorage.setItem('jwt', response.token);
        })
      )
      .subscribe({
        next: () => {
          console.log('Login successful');
          // redirect or show UI feedback
        },
        error: err => {
          console.error('Login failed', err);
        }
      });
  }  
}
