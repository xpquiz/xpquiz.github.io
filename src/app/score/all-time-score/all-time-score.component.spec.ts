import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeScoreComponent } from './all-time-score.component';

describe('AllTimeScoreComponent', () => {
  let component: AllTimeScoreComponent;
  let fixture: ComponentFixture<AllTimeScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTimeScoreComponent]
    });
    fixture = TestBed.createComponent(AllTimeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
