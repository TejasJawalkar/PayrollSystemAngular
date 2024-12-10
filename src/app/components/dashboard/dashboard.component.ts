import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SideNavbarComponent } from '../../shared/reusable/side-navbar/side-navbar.component';
import { Route, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderComponent } from '../../shared/reusable/loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authServices/auth.service';
import { LogService } from '../../core/services/logServices/log.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideNavbarComponent,
    RouterOutlet,
    MaterialModule,
    LoaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  logFromGroup!: FormGroup;
  EmploeeId: Number = 0;
  browserused: String = '';
  ipaddress: String = '';

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private logServices: LogService,
    private router: Router
  ) {
    const e_id = sessionStorage.getItem('EmployeeId');
    this.EmploeeId = e_id ? parseInt(e_id) : 0;
  }
  ngAfterViewInit(): void {
    this.spinner.hide();
  }
  async ngOnInit() {
    this.spinner.show();
    this.ipaddress = await this.logServices.getIpAddress();
    this.browserused = await this.logServices.getBrowserDetails();
    this.spinner.hide();
  }

  logoutclick = () => {
    try {
      this.logFromGroup = new FormGroup({
        UserId: new FormControl(this.EmploeeId),
        BrowswerUsed: new FormControl(this.browserused),
        IdAddress: new FormControl(this.ipaddress),
        Flag: new FormControl(2), 
      });
      this.authService.removeSessions();
      this.router.navigate(['/login']);
    } catch (error) {}
  };
}
