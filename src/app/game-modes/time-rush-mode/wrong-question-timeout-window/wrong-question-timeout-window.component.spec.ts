import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongQuestionTimeoutWindowComponent } from './wrong-question-timeout-window.component';

describe('WrongQuestionTimeoutWindowComponent', () => {
  let component: WrongQuestionTimeoutWindowComponent;
  let fixture: ComponentFixture<WrongQuestionTimeoutWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrongQuestionTimeoutWindowComponent]
    });
    fixture = TestBed.createComponent(WrongQuestionTimeoutWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
