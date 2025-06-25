import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserSettings {
  email: string;
  phoneNumber: string;
  isSubscribedSMSDaily: boolean;
  isSubscribedSMSWeekly: boolean;
  isSubscribedEmailDaily: boolean;
  isSubscribedEmailWeekly: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://localhost:5001/api/user';

  constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // getUserProfile(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/profile`);
  // }

    getUserProfile(): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${this.apiUrl}/settings`, {
      headers: this.getAuthHeaders()
    });
  }

  // updateUserProfile(userData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/update`, userData);
  // }

    updateUserProfile(settings: UserSettings): Observable<any> {
    return this.http.post(`${this.apiUrl}/updatesettings`, settings, {
      headers: this.getAuthHeaders()
    });
  }
}