import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";
import {EncryptionService} from "../../service/encryption.service";
import {TemplateService} from "../../service/template.service";
import {QuestionResultTemplateParams, QuestionResultTrifectaTemplateParams} from "../../model/Template";
import {GameMode} from "../../model/enums/GameModesEnum";

@Component({
  selector: 'app-correct-answer-window',
  templateUrl: './correct-answer-window.component.html',
  styleUrls: ['./correct-answer-window.component.sass']
})
export class CorrectAnswerWindowComponent implements OnInit {

  public questionScore: number = 0;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly encryptionService: EncryptionService,
    private readonly templateService: TemplateService,
    private readonly appStorageService: AppStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    await this.retrieveRouteParams();

    if (!this.appStorageService.canQuizBeAnswered()) {
      await this.returnHome();
      return;
    }

    await this.correctAnswerSound.play();
    this.saveCurrentScore();
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private saveCurrentScore(): void {
    this.appStorageService.saveAnswer(true, this.questionScore, 3);
  }

  private async retrieveRouteParams(): Promise<void> {
    const routeGameModeTitle: string = this.route.snapshot.paramMap.get('mode')!;
    const encryptedQuestionResult: string = this.route.snapshot.paramMap.get('result')!;

    const decryptedQuestionResult: string = this.encryptionService.decrypt(encryptedQuestionResult);
    const questionResult: QuestionResultTemplateParams | QuestionResultTrifectaTemplateParams = JSON.parse(decryptedQuestionResult);
    const mode: GameMode = GameMode.getByTitle(routeGameModeTitle);
    const questionResultText: string = await this.templateService.render(mode.templateEnum, questionResult);

    this.questionScore = questionResult.questionPoints!;
    this.clipboardText = questionResultText;
  }
}
