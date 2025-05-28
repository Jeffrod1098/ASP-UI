import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'landing', component: LandingComponent }
];
