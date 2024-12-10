import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './shared/reusable/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MaterialModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PayrollSystemAngular';

  constructor() {}
}
