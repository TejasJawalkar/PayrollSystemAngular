import { Component } from '@angular/core';
import { SideNavbarComponent } from '../../shared/reusable/side-navbar/side-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SideNavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
