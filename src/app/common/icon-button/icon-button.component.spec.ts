import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IconButtonComponent} from './icon-button.component';
import spyOn = jest.spyOn;
import SpyInstance = jest.SpyInstance;
import {NgOptimizedImage} from "@angular/common";

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconButtonComponent],
      imports: [NgOptimizedImage]
    });
    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onButtonClick when clicking on the button', () => {
    const onButtonClickSpy: SpyInstance = spyOn(component.onButtonClick, 'emit');

    component.onClick();

    expect(onButtonClickSpy).toBeCalled();
  })
});
