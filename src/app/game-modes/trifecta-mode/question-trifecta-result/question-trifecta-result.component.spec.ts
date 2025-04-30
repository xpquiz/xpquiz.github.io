import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTrifectaResultComponent } from './question-trifecta-result.component';

describe('QuestionTrifectaResultComponent', () => {
  let component: QuestionTrifectaResultComponent;
  let fixture: ComponentFixture<QuestionTrifectaResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTrifectaResultComponent]
    });
    fixture = TestBed.createComponent(QuestionTrifectaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
