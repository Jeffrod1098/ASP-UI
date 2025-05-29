import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  parkingMessage: string = '';
  isLoading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7208/api/WebScrapper/scrape', { responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          this.parkingMessage = response;
          this.isLoading = false;
          console.log(response)
        },
        error: (err) => {
          console.error('API error:', err);
          this.error = 'Failed to fetch parking info.';
          this.isLoading = false;
        }
      });
  }
}
