import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConstants } from '../../constants/commonConstants';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BaseUrl: string = '';
  envprodtype: boolean = environment.production;
  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.BaseUrl = environment.local_base_url;
    } else {
      this.BaseUrl = environment.prod_base_url;
    }
  }

  headers = new HttpHeaders({
    'Content-Type': CommonConstants.CONTENT_TYPE,
    apikeyvalue: environment.apikey,
    Accept: '*/*',
  });

  LoginUser = (data: any): Observable<any> => {
    const body = new HttpParams({ fromObject: data });
    const options = { headers: this.headers };

    return this.http.post(`${this.BaseUrl}Employee/Login`, body, options);
  };

  setToken(token: any): void {
    sessionStorage.setItem('UserToken', token);
  }

  getToken(): string {
    const token = sessionStorage.getItem('UserToken');
    if (token != null) {
      return token.toString();
    }
    return '';
  }

  isLoggedIn(): Boolean {
    return this.getToken() != null;
  }

  removeSessions = () => {
    sessionStorage.removeItem('UserToken');
    sessionStorage.removeItem('OrgnisationId');
    sessionStorage.removeItem('EmployeeId');
    sessionStorage.removeItem('Role');
    sessionStorage.clear();
  };
}
