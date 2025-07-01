import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface UserSettings {
  email: string;
  phoneNumber: string;
  isSubscribedSMSDaily: boolean;
  isSubscribedSMSWeekly: boolean;
  isSubscribedEmailDaily: boolean;
  isSubscribedEmailWeekly: boolean;
}

// Create a separate interface for update requests
export interface UpdateSettingsRequest {
  phoneNumber: string;
  isSubscribedSMSDaily: boolean;
  isSubscribedSMSWeekly: boolean;
  isSubscribedEmailDaily: boolean;
  isSubscribedEmailWeekly: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7208/api/auth';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    console.log('=== TOKEN DEBUG ===');
    console.log('Token exists:', !!token);
    console.log('Token length:', token?.length || 0);
    
    if (!token) {
      console.error('❌ No token found in localStorage');
    }
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(): Observable<UserSettings> {
    console.log('🔄 Making getUserProfile request...');
    const headers = this.getAuthHeaders();
    
    return this.http.get<UserSettings>(`${this.apiUrl}/settings`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('❌ getUserProfile error:', error);
          return throwError(() => error);
        })
      );
  }

  updateUserProfile(user: UserSettings): Observable<any> {
    console.log('🔄 Making updateUserProfile request...');
    console.log('Full user object:', user);
    
    // Create the request object without email
    const updateRequest: UpdateSettingsRequest = {
      phoneNumber: user.phoneNumber,
      isSubscribedSMSDaily: user.isSubscribedSMSDaily,
      isSubscribedSMSWeekly: user.isSubscribedSMSWeekly,
      isSubscribedEmailDaily: user.isSubscribedEmailDaily,
      isSubscribedEmailWeekly: user.isSubscribedEmailWeekly
    };
    
    console.log('Update request (without email):', updateRequest);
    const headers = this.getAuthHeaders();
    
    return this.http.post(`${this.apiUrl}/settings`, updateRequest, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('❌ updateUserProfile error:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error body:', error.error);
          return throwError(() => error);
        })
      );
  }
}