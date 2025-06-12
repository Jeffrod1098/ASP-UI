import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  user = {
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
    private userService: UserService
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
}