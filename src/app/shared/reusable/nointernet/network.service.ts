import { isPlatformBrowser } from '@angular/common';
import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private onlineServices = new BehaviorSubject<boolean>(navigator.onLine);
 
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.onlineServices.next(navigator.onLine);
      window.addEventListener('online', () => this.UpdateNetworkService(true));
      window.addEventListener('offline', () => this.UpdateNetworkService(false));
    }
  }


  UpdateNetworkService(status: any) {
    this.onlineServices.next(status);
  }

  getIsOnline()
  {
    return this.onlineServices.asObservable()
  }
}
