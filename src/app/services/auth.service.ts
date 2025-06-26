import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7208/api/auth';  // Your ASP.NET API base URL

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

login(user: { email: string; password: string }) {
  return this.http.post<{ token: string }>('https://localhost:5001/api/auth/login', user)
    .pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }
}