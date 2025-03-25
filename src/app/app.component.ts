import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './shared/reusable/loader/loader.component';
import { NetworkService } from './shared/reusable/nointernet/network.service';
import { Router } from '@angular/router';
import { AuthService } from './core/services/authServices/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MaterialModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PayrollSystemAngular';
  isOnline: boolean;

  constructor(
    private networkService: NetworkService,
    private router: Router,
    private authService:AuthService
    ) {
    this.GetInternetConnectivity();
  }

  GetInternetConnectivity(): void {
    this.networkService.getIsOnline().subscribe((res: boolean) => {
      this.isOnline = res;
      if (!this.isOnline) {
        this.router.navigate(['/no-internet']);
      } else {
        if(this.authService.isLoggedIn())
        {
          this.router.navigate(['user'])
        }
        else
        {
          this.router.navigate(['/login'])
        }
      }
    });
  }
}
