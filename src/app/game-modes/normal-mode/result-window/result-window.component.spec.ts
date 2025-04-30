import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWindowComponent } from './result-window.component';

describe('ResultWindowComponent', () => {
  let component: ResultWindowComponent;
  let fixture: ComponentFixture<ResultWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultWindowComponent]
    });
    fixture = TestBed.createComponent(ResultWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
