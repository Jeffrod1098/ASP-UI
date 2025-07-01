import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- Add this
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule if needed
import { JwtModule } from '@auth0/angular-jwt';
import { importProvidersFrom } from '@angular/core';


export function tokenGetter() {
  return localStorage.getItem('jwt');
}

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideHttpClient(),
//     provideRouter(routes),
//     importProvidersFrom(
//       JwtModule.forRoot({
//         config: {
//           tokenGetter: tokenGetter,
//           allowedDomains: ['localhost:7208'], // Your API domain
//           disallowedRoutes: [
//             'https://localhost:7208/api/auth/login',
//             'https://localhost:7208/api/auth/register'
//           ]
//         }
//       })
//     )
//   ]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes)
  ]
};
