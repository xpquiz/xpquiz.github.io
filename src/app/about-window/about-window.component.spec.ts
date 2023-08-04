import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWindowComponent } from './about-window.component';

describe('AboutWindowComponent', () => {
  let component: AboutWindowComponent;
  let fixture: ComponentFixture<AboutWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutWindowComponent]
    });
    fixture = TestBed.createComponent(AboutWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
