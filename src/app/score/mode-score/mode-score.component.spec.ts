import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeScoreComponent } from './mode-score.component';

describe('ModeScoreComponent', () => {
  let component: ModeScoreComponent;
  let fixture: ComponentFixture<ModeScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeScoreComponent]
    });
    fixture = TestBed.createComponent(ModeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
