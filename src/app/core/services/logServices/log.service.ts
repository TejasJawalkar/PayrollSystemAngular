import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CommonConstants } from '../../constants/commonConstants';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  BaseUrl: string = '';
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

  InsertUserLogs = (data: any): Observable<any> => {
    const body = new HttpParams({ fromObject: data });
    const options = { headers: this.headers };
    return this.http.post(`${this.BaseUrl}LoginUser/UserLogs`, body, options);
  };

  getBrowserDetails = async (): Promise<string> => {
    let browserDetails = '';
    let ua = navigator.userAgent;
    let browser = 'Unknown Browser';
    let browserVersion = navigator.appVersion;
    if (/Chrome/.test(ua) && !/Edge|Edg|OPR/.test(ua)) {
      browser = 'Chrome';
    } else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
      browser = 'Safari';
    } else if (/Firefox/.test(ua)) {
      browser = 'Firefox';
    } else if (/OPR/.test(ua) || /Opera/.test(ua)) {
      browser = 'Opera';
    } else if (/Edg/.test(ua) || /Edge/.test(ua)) {
      browser = 'Microsoft Edge';
    } else if (/MSIE/.test(ua) || /Trident\//.test(ua)) {
      browser = 'Internet Explorer';
    }
    browserDetails = `BrowserName= ${browser}, BrowserVersion= ${browserVersion}, Osv= ${ua}`;
    return browserDetails;
  };

  async getIpAddress(): Promise<string> {
    let ipaddress = '';
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    ipaddress = data.ip;
    return ipaddress;
  }

  saveExceptionLog(data: any) {
    var body = new HttpParams({ fromObject: data });
    var options = { headers: this.headers };

    return this.http.post(`${this.BaseUrl}UiExceptionLog`, body, options);
  }
}
