import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email = '';
  phoneNumber = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user = {
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed.';
        console.error(err);
      }
    });
  }
}