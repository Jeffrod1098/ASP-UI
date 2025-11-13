import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, UserSettings } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  user: UserSettings = {
    email: '',
    phoneNumber: '',
    isSubscribedSMSDaily: false,
    isSubscribedSMSWeekly: false,
    isSubscribedEmailDaily: false,
    isSubscribedEmailWeekly: false
  };

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('UserSettings: Loading user profile...');
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('UserSettings: Profile loaded:', data);
        this.user = data;
      },
      error: (err) => {
        console.error('UserSettings: Failed to load profile:', err);
        this.errorMessage = 'Failed to load user info.';
      }
    });
  }

  updateUser() {
    console.log('UserSettings: Updating user settings...');
    console.log('User data to update:', this.user);
    
    // Clear previous messages
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;
    
    this.userService.updateUserProfile(this.user).subscribe({
      next: (response) => {
        console.log('UserSettings: Update successful:', response);
        this.successMessage = 'User settings updated successfully!';
        this.loading = false;
      },
      error: (err) => {
        console.error('UserSettings: Update failed:', err);
        this.loading = false;
        
        // More specific error messages
        if (err.status === 400) {
          this.errorMessage = 'Invalid data. Please check your input.';
        } else if (err.status === 401) {
          this.errorMessage = 'Session expired. Please log in again.';
        } else {
          this.errorMessage = 'Failed to update user settings. Please try again.';
        }
      }
    });
  }

  // Keep your test method
  testToken() {
    console.log('Manual token test...');
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      console.error('No token found for manual test');
      return;
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    this.http.get('https://localhost:7208/api/auth/settings', { headers })
      .subscribe({
        next: (data) => {
          console.log('Manual test successful:', data);
          this.user = data as any;
        },
        error: (err) => {
          console.error('Manual test failed:', err);
        }
      });
  }
}