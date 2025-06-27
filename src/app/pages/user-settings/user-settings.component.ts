import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService,UserSettings } from '../../services/user.service';
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

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (data) => this.user = data,
      error: (err) => this.errorMessage = 'Failed to load user info.'
    });
  }

  updateUser() {
    this.userService.updateUserProfile(this.user).subscribe({
      next: () => this.successMessage = 'User settings updated successfully!',
      error: () => this.errorMessage = 'Failed to update user settings.'
    });
  }

  // Add this to your UserSettingsComponent
testToken() {
  console.log('🧪 Manual token test...');
  const token = localStorage.getItem('jwt');
  
  if (!token) {
    console.error('❌ No token found for manual test');
    return;
  }
  
  // Test with manual headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  
  this.http.get('https://localhost:7208/api/auth/settings', { headers })
    .subscribe({
      next: (data) => {
        console.log('✅ Manual test successful:', data);
        this.user = data as any;
      },
      error: (err) => {
        console.error('❌ Manual test failed:', err);
      }
    });
}
}