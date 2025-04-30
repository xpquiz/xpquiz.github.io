import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRushQuestionWindowComponent } from './time-rush-question-window.component';

describe('QuestionWindowComponent', () => {
  let component: TimeRushQuestionWindowComponent;
  let fixture: ComponentFixture<TimeRushQuestionWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeRushQuestionWindowComponent]
    });
    fixture = TestBed.createComponent(TimeRushQuestionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
