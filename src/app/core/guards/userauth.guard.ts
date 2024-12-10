import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/authServices/auth.service';

export const userauthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const routerservice = inject(Router);
  const authservice = inject(AuthService);
  const tokendata = sessionStorage.getItem('UserToken');
  debugger;

  if (tokendata == null) {
    authservice.removeSessions();
    routerservice.navigate(['login']);
    return false;
  }

  try {
    if (tokendata != null) {
      const decoded = jwtDecode<{ exp: number }>(tokendata); // Decode the token
      const isExpired = decoded.exp < Date.now() / 1000; // Check if the token is expired

      if (isExpired) {
        alert('Session Expired Login Again');
        authservice.removeSessions();
        routerservice.navigate(['login']);
        return false;
      } else {
        return true;
      }
    }
    return false;
  } catch (error) {
    routerservice.navigate(['login']);
    return false;
  }
};
