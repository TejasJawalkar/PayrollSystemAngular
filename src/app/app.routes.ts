import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { userauthGuard } from './core/guards/userauth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: UserloginComponent,
  },
  {
    path: 'user',
    canActivate: [userauthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
