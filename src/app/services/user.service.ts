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
    console.log('Token preview:', token?.substring(0, 50) + '...');
    console.log('Full token:', token);
    
    if (!token) {
      console.error('❌ No token found in localStorage');
      console.log('Available keys in localStorage:', Object.keys(localStorage));
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    console.log('Authorization header:', headers.get('Authorization'));
    console.log('==================');
    
    return headers;
  }

  getUserProfile(): Observable<UserSettings> {
    console.log('🔄 Making getUserProfile request...');
    const headers = this.getAuthHeaders();
    
    return this.http.get<UserSettings>(`${this.apiUrl}/settings`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('❌ getUserProfile error:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error body:', error.error);
          return throwError(() => error);
        })
      );
  }

  updateUserProfile(user: UserSettings): Observable<any> {
    console.log('🔄 Making updateUserProfile request...');
    const headers = this.getAuthHeaders();
    
    return this.http.post(`${this.apiUrl}/settings`, user, { headers })
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