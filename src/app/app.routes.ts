import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { userauthGuard } from './core/guards/userauth.guard';

export const routes: Routes = [
  { path: 'login', component: UserloginComponent }, // Normal route
  {
    path: 'user',
    canActivate: [userauthGuard],
    loadChildren: () =>
      import('./components/userroute.module').then((m) => m.UserrouteModule),
  }, // lazy loading
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirection route
  // { path: '**', component: NotFoundComponent }
];
