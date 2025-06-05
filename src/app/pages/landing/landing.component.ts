import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  parkingMessage: any= {};
  isLoading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7208/api/WebScrapper/latest')
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
}
