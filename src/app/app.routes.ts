import { Routes } from '@angular/router';
import { Claims } from './components/claims/claims';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard/claims/claim-processing', pathMatch: 'full' },
  { path: 'dashboard/claims/claim-processing', component: Claims },
];

