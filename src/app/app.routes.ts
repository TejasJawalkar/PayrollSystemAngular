import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { userauthGuard } from './core/guards/userauth.guard';
import { NoInternetPageComponent } from './shared/reusable/nointernet/no-internet-page/no-internet-page.component';

export const routes: Routes = [
  { path: 'login', component: UserloginComponent },
  {
    path: 'user',
    canActivate: [userauthGuard],
    loadChildren: () =>
      import('./components/userroute.module').then((m) => m.UserrouteModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'no-internet', component: NoInternetPageComponent }, // Explicit route for No Internet Page
  { path: '**', component: NoInternetPageComponent } // Catch-all 404
];
