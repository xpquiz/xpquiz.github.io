import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTrifectaWindowComponent } from './question-trifecta-window.component';

describe('QuestionTrifectaWindowComponent', () => {
  let component: QuestionTrifectaWindowComponent;
  let fixture: ComponentFixture<QuestionTrifectaWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTrifectaWindowComponent]
    });
    fixture = TestBed.createComponent(QuestionTrifectaWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
