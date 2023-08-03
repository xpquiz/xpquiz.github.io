import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTitleBarComponent } from './window-title-bar.component';

describe('WindowTitleBarComponent', () => {
  let component: WindowTitleBarComponent;
  let fixture: ComponentFixture<WindowTitleBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindowTitleBarComponent]
    });
    fixture = TestBed.createComponent(WindowTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
