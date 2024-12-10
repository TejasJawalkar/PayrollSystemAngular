import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  imports: [MaterialModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
})
export class SideNavbarComponent {
  readonly panelOpenState = signal(false);
}
