import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserSettings {
  email: string;
  phoneNumber: string;
  isSubscribedSMSDaily: boolean;
  isSubscribedSMSWeekly: boolean;
  isSubscribedEmailDaily: boolean;
  isSubscribedEmailWeekly: boolean;
}
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
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    
    if (!token) {
    }
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(): Observable<UserSettings> {
    const headers = this.getAuthHeaders();
    
    return this.http.get<UserSettings>(`${this.apiUrl}/settings`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  updateUserProfile(user: UserSettings): Observable<any> {
    
    const updateRequest: UpdateSettingsRequest = {
      phoneNumber: user.phoneNumber,
      isSubscribedSMSDaily: user.isSubscribedSMSDaily,
      isSubscribedSMSWeekly: user.isSubscribedSMSWeekly,
      isSubscribedEmailDaily: user.isSubscribedEmailDaily,
      isSubscribedEmailWeekly: user.isSubscribedEmailWeekly
    };
    
    const headers = this.getAuthHeaders();
    
    return this.http.post(`${this.apiUrl}/settings`, updateRequest, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }
}