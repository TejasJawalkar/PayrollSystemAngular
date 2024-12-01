import { Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: UserloginComponent,
  },
  // {
  //   path: 'user',
  //   component:
  // },
];
