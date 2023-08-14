import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutWindowComponent} from './about-window.component';
import {WindowTitleBarComponent} from "../common/window-title-bar/window-title-bar.component";
import {IconButtonComponent} from "../common/icon-button/icon-button.component";
import {NgOptimizedImage} from "@angular/common";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppRoutingModule} from "../app-routing.module";
import spyOn = jest.spyOn;
import SpyInstance = jest.SpyInstance;

describe('AboutWindowComponent', () => {
  let component: AboutWindowComponent;
  let fixture: ComponentFixture<AboutWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutWindowComponent,
        WindowTitleBarComponent,
        IconButtonComponent
      ],
      imports: [
        NgOptimizedImage,
        AppRoutingModule
      ]
    });
    fixture = TestBed.createComponent(AboutWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return home when clicked on the button', async () => {
    const routerSpy: SpyInstance = spyOn(component['router'], "navigateByUrl");

    await component.returnHome();

    expect(routerSpy).toBeCalledWith(PathsEnum.HOME);
  });
});
