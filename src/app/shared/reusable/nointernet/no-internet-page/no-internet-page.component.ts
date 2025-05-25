import { Component } from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-no-internet-page',
  imports: [
    LoaderComponent
  ],
  templateUrl: '.. /no-internet-page.component.html',
  styleUrl: './no-internet-page.component.scss'
})
export class NoInternetPageComponent {
  /**
   *
   */
  constructor(
    private spinner: NgxSpinnerService,
  ) {
  }

}
