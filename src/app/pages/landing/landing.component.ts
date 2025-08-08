import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  parkingMessage: any = {};
  isLoading = true;
  error = '';
  showContactModal = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch parking information
    this.http.get(`${environment.apiUrl}/WebScrapper/latest`)
      .subscribe({
        next: (response: any) => {
          this.parkingMessage = response;
          this.isLoading = false;
          console.log(response.message)
        },
        error: (err) => {
          console.error('API error:', err);
          this.error = 'Failed to fetch parking info.';
          this.isLoading = false;
        }
      });
  }

  // Same authentication check method as navbar
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

  // Getter for authentication status (same as navbar)
  get isAuthenticated(): boolean {
    return this.checkAuthStatus();
  }

  openContactModal() {
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;
  }

  sendEmail() {
    const mailtoLink = 'mailto:aspnycnotifier@gmail.com?subject=Support/Feedback - ASP NYC Notifier';
    window.location.href = mailtoLink;
    this.closeContactModal();
  }
}