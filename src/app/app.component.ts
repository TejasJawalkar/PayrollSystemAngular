import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PayrollSystemAngular';
}
