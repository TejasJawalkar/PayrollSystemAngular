import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickbuttonsComponent } from './clickbuttons.component';

describe('ClickbuttonsComponent', () => {
  let component: ClickbuttonsComponent;
  let fixture: ComponentFixture<ClickbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickbuttonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
