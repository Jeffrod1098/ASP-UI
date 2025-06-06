import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent}
];
