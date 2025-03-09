import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnswersCorrectWindowComponent } from './all-answers-correct-window.component';

describe('AllAnswersCorrectWindowComponent', () => {
  let component: AllAnswersCorrectWindowComponent;
  let fixture: ComponentFixture<AllAnswersCorrectWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAnswersCorrectWindowComponent]
    });
    fixture = TestBed.createComponent(AllAnswersCorrectWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
