import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-clickbuttons',
  imports: [MaterialModule],
  templateUrl: './clickbuttons.component.html',
  styleUrl: './clickbuttons.component.scss',
})
export class ClickbuttonsComponent {
  @Input() ButtonText: string = '';
  @Output() event = new EventEmitter<any>();

  handleEvent = (e: any) => {
    this.event.emit(e);
  };
}
