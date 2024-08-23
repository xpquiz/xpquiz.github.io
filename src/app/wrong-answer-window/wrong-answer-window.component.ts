import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";
import {QuestionResultTemplateParams, QuestionResultTrifectaTemplateParams} from "../../model/Template";
import {EncryptionService} from "../../service/encryption.service";
import {TemplateService} from "../../service/template.service";
import {GameMode} from "../../model/enums/GameModesEnum";

@Component({
  selector: 'app-wrong-answer-window',
  templateUrl: './wrong-answer-window.component.html',
  styleUrls: ['./wrong-answer-window.component.sass']
})
export class WrongAnswerWindowComponent implements OnInit {

  public correctAnswers: string[] = [];
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 0;

  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');

  constructor(
    protected readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly encryptionService: EncryptionService,
    private readonly templateService: TemplateService,
    private readonly appStorageService: AppStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    await this.retrieveRouteParams();

    if (!this.appStorageService.canQuizBeAnswered()) {
      await this.router.navigateByUrl(PathsEnum.HOME);
      return;
    }

    await this.wrongAnswerSound.play();
    this.saveCurrentScore();
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private saveCurrentScore() {
    this.appStorageService.saveAnswer(false, undefined, this.hoursToPlayAgain);
  }

  private async retrieveRouteParams(): Promise<void> {
    const routeGameModeTitle: string = this.route.snapshot.paramMap.get('mode')!;
    const encryptedQuestionResult: string = this.route.snapshot.paramMap.get('result')!;

    const decryptedQuestionResult: string = this.encryptionService.decrypt(encryptedQuestionResult);
    const questionResult: QuestionResultTemplateParams | QuestionResultTrifectaTemplateParams = JSON.parse(decryptedQuestionResult);
    const gameMode: GameMode = GameMode.getByTitle(routeGameModeTitle);

    this.hoursToPlayAgain = gameMode === GameMode.TRIFECTA ? 24 : 3;

    this.correctAnswers = 'questions' in questionResult ? questionResult.correctAnswers : [questionResult.rightAnswer];
    this.clipboardText = await this.templateService.render(gameMode.templateEnum, questionResult);
  }

  protected readonly PathsEnum = PathsEnum;
}
