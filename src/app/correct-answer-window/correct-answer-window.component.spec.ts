import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectAnswerWindowComponent } from './correct-answer-window.component';

describe('CorrectAnswerWindowComponent', () => {
  let component: CorrectAnswerWindowComponent;
  let fixture: ComponentFixture<CorrectAnswerWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectAnswerWindowComponent]
    });
    fixture = TestBed.createComponent(CorrectAnswerWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
