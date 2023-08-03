import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionWindowComponent } from './question-window.component';

describe('MainWindowComponent', () => {
  let component: QuestionWindowComponent;
  let fixture: ComponentFixture<QuestionWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionWindowComponent]
    });
    fixture = TestBed.createComponent(QuestionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
