import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongAnswerWindowComponent } from './wrong-answer-window.component';

describe('WrongAnswerWindowComponent', () => {
  let component: WrongAnswerWindowComponent;
  let fixture: ComponentFixture<WrongAnswerWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrongAnswerWindowComponent]
    });
    fixture = TestBed.createComponent(WrongAnswerWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
