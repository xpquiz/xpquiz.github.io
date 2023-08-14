import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MainWindowComponent} from './main-window.component';
import {WindowTitleBarComponent} from "../common/window-title-bar/window-title-bar.component";
import {IconButtonComponent} from "../common/icon-button/icon-button.component";
import {NgOptimizedImage} from "@angular/common";
import {AppStorageService} from "../../service/app-storage.service";
import {WeekScore} from "../../model/AppStorage";
import moment from "moment";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppRoutingModule} from "../app-routing.module";

describe('MainWindowComponent', () => {
  let component: MainWindowComponent;
  let fixture: ComponentFixture<MainWindowComponent>;
  let appStorageService: AppStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainWindowComponent, WindowTitleBarComponent, IconButtonComponent],
      imports: [NgOptimizedImage, AppRoutingModule]
    });
    fixture = TestBed.createComponent(MainWindowComponent);
    appStorageService = TestBed.inject(AppStorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable new quiz button when quiz can be answered', async () => {
    const startCountdownSpy: jest.SpyInstance = jest.spyOn(component as any, 'startCountdown').mockImplementation(() => {
    });
    jest.spyOn(appStorageService, 'canQuizBeAnswered').mockReturnValue(true);

    await component.ngOnInit();

    expect(appStorageService.canQuizBeAnswered).toBeCalled();
    expect(component.quizCanBeAnswered).toBeTruthy();
    expect(startCountdownSpy).not.toBeCalled();
  });

  it('should disable new quiz button when quiz can\'t be answered, with now as lastQuizResponseDate', async () => {
    jest.spyOn(appStorageService, 'canQuizBeAnswered').mockReturnValue(false);
    jest.spyOn(appStorageService, 'retrieveAppStorage').mockReturnValue({
      lastQuizResponseDate: moment().toISOString(),
      weekScoreMap: new Map<number, WeekScore>()
    });

    await component.ngOnInit();

    expect(appStorageService.canQuizBeAnswered).toBeCalled();
    expect(component.quizCanBeAnswered).toBeFalsy();
    expect(appStorageService.retrieveAppStorage).toBeCalled();
  });

  it('should disable new quiz button when quiz can\'t be answered, with now - 3 hours as lastQuizResponseDate', async () => {
    jest.spyOn(appStorageService, 'canQuizBeAnswered').mockReturnValue(false);
    jest.spyOn(appStorageService, 'retrieveAppStorage').mockReturnValue({
      lastQuizResponseDate: moment().subtract(3, 'hours').toISOString(),
      weekScoreMap: new Map<number, WeekScore>()
    });
    jest.spyOn(appStorageService, 'clearLastAnsweredDate').mockImplementation(() => {
    });

    await component.ngOnInit();

    expect(appStorageService.canQuizBeAnswered).toBeCalled();
    expect(component.quizCanBeAnswered).toBeTruthy();
    expect(appStorageService.retrieveAppStorage).toBeCalled();
    expect(appStorageService.clearLastAnsweredDate).toBeCalled();
  });

  it('should redirect when clicking on any button with a route redirect', async () => {
    const route: PathsEnum = PathsEnum.HOME;
    const routerSpy: jest.SpyInstance = jest.spyOn(component['router'], "navigateByUrl");

    await component.redirectTo(route);

    expect(routerSpy).toBeCalledWith(route);
  });
});
