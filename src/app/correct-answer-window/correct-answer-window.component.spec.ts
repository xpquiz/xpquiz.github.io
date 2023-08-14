import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CorrectAnswerWindowComponent} from './correct-answer-window.component';
import {RouterTestingModule} from "@angular/router/testing";
import {WindowTitleBarComponent} from "../common/window-title-bar/window-title-bar.component";
import {IconButtonComponent} from "../common/icon-button/icon-button.component";
import {NgOptimizedImage} from "@angular/common";
import {AppStorageService} from "../../service/app-storage.service";
import spyOn = jest.spyOn;
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppRoutingModule} from "../app-routing.module";

describe('CorrectAnswerWindowComponent', () => {
  let component: CorrectAnswerWindowComponent;
  let fixture: ComponentFixture<CorrectAnswerWindowComponent>;
  let appStorageService: AppStorageService;
  let correctAnswerSoundSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectAnswerWindowComponent, WindowTitleBarComponent, IconButtonComponent],
      imports: [RouterTestingModule, NgOptimizedImage, AppRoutingModule]
    });
    fixture = TestBed.createComponent(CorrectAnswerWindowComponent);
    appStorageService = TestBed.inject(AppStorageService);
    component = fixture.componentInstance;

    correctAnswerSoundSpy = jest.spyOn(component['correctAnswerSound'], 'play').mockImplementation(async () => {
    });
    spyOn(appStorageService, 'canQuizBeAnswered').mockReturnValue(false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve score, check if quiz can be answered, play sound and save current score on ngOnInit', async () => {
    const quizCanBeAnsweredSpy: jest.SpyInstance = spyOn(appStorageService, 'canQuizBeAnswered').mockReturnValue(true);
    const saveAnswerSpy: jest.SpyInstance = spyOn(appStorageService, 'saveAnswer').mockImplementation(() => {
    });

    await component.ngOnInit();

    expect(quizCanBeAnsweredSpy).toBeCalled();
    expect(correctAnswerSoundSpy).toBeCalled();
    expect(saveAnswerSpy).toBeCalledWith(true, 0);
  });

  it('should return home on ngOnInit if quiz can\'t be answered', async () => {
    const quizCanBeAnsweredSpy: jest.SpyInstance = spyOn(appStorageService, 'canQuizBeAnswered').mockReturnValue(false);
    const routerSpy: jest.SpyInstance = spyOn(component['router'], "navigateByUrl");
    const saveAnswerSpy: jest.SpyInstance = spyOn(appStorageService, 'saveAnswer').mockImplementation(() => {
    });

    await component.ngOnInit();

    expect(quizCanBeAnsweredSpy).toBeCalled();
    expect(routerSpy).toBeCalledWith(PathsEnum.HOME);
    expect(correctAnswerSoundSpy).not.toBeCalled();
    expect(saveAnswerSpy).not.toBeCalledWith(true, 0);
  });
});
