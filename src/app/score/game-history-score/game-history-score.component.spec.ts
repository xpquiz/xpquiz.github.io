import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHistoryScoreComponent } from './game-history-score.component';

describe('GameHistoryScoreComponent', () => {
  let component: GameHistoryScoreComponent;
  let fixture: ComponentFixture<GameHistoryScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameHistoryScoreComponent]
    });
    fixture = TestBed.createComponent(GameHistoryScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
