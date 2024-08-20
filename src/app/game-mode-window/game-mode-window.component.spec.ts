import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModeWindowComponent } from './game-mode-window.component';

describe('GameModeWindowComponent', () => {
  let component: GameModeWindowComponent;
  let fixture: ComponentFixture<GameModeWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameModeWindowComponent]
    });
    fixture = TestBed.createComponent(GameModeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
