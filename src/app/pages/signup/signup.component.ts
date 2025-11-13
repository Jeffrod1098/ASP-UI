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
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  registrationSuccess = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  // Validate phone number format
  // isValidPhone(): boolean {
  //   if (!this.phoneNumber) return true; // Optional field
  //   const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,15}$/;
  //   return phoneRegex.test(this.phoneNumber);
  // }

  getPasswordStrength(): number {
    let strength = 0;
    if (this.password.length >= 8) strength += 25;
    if (/[a-z]/.test(this.password)) strength += 25;
    if (/[A-Z]/.test(this.password)) strength += 25;
    if (/[\d\W]/.test(this.password)) strength += 25;
    return strength;
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-yellow-500';
    if (strength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  }

  getPasswordStrengthTextClass(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 25) return 'text-red-500';
    if (strength <= 50) return 'text-yellow-500';
    if (strength <= 75) return 'text-blue-500';
    return 'text-green-500';
  }

isFormValid(): boolean {
  const hasEmail = this.email.trim().length > 0;
  const hasValidEmail = this.isValidEmail();
  const hasPassword = this.password.length > 0;
  const hasMinPasswordLength = this.password.length >= 8;
  const passwordsDoMatch = this.passwordsMatch();
  // const hasValidPhone = this.isValidPhone();

  return (
    hasEmail && 
    hasValidEmail && 
    hasPassword && 
    hasMinPasswordLength && 
    passwordsDoMatch 
    // hasValidPhone
  );
}

  register() {
    // Clear previous errors
    this.errorMessage = '';

    if (!this.isFormValid()) {
      this.errorMessage = 'Please fix or complete any form before submitting.';
      return;
    }

    this.loading = true;
    
    const user = {
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.registrationSuccess = true;
        this.successMessage = 'User registered successfully!';
        this.loading = false;
        
        setTimeout(() => {
          this.goToSettings();
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.errorMessage = 'Registration failed. Please try again.';
        
        if (err.error) {
          if (typeof err.error === 'string') {
            this.errorMessage = err.error;
          } else if (err.error.message) {
            this.errorMessage = err.error.message;
          } else if (err.error.error) {
            this.errorMessage = err.error.error;
          }
        }
      }
    });
  }

  goToSettings() {
    this.router.navigate(['/signin']);
  }
}