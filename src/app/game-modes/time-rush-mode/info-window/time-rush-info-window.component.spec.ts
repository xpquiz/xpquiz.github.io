import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRushInfoWindowComponent } from './time-rush-info-window.component';

describe('QuestionTimeRushWindowComponent', () => {
  let component: TimeRushInfoWindowComponent;
  let fixture: ComponentFixture<TimeRushInfoWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeRushInfoWindowComponent]
    });
    fixture = TestBed.createComponent(TimeRushInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
