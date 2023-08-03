import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWindowComponent } from './main-window.component';

describe('MainWindowComponent', () => {
  let component: MainWindowComponent;
  let fixture: ComponentFixture<MainWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainWindowComponent]
    });
    fixture = TestBed.createComponent(MainWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
