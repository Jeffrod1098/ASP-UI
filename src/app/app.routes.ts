import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent},
    { path: 'userPage', component: UserSettingsComponent}
];
