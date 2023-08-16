import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";
import {EncryptionService} from "../../service/encryption.service";
import {TemplateService} from "../../service/template.service";
import {QuestionResultTemplateParams, TemplateEnum} from "../../model/enums/Template";

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
    this.appStorageService.saveAnswer(true, this.questionScore);
  }

  private async retrieveRouteParams(): Promise<void> {
    const encryptedQuestionScore: string = this.route.snapshot.paramMap.get('points')!;
    const encryptedQuestionResult: string = this.route.snapshot.paramMap.get('result')!;

    const decryptedQuestionScore: string = this.encryptionService.decrypt(encryptedQuestionScore);
    const decryptedQuestionResult: string = this.encryptionService.decrypt(encryptedQuestionResult);
    const questionResult: QuestionResultTemplateParams = JSON.parse(decryptedQuestionResult);
    const questionResultText: string = await this.templateService.render(TemplateEnum.QUESTION_RESULT, questionResult);

    this.questionScore = parseInt(decryptedQuestionScore);
    this.clipboardText = questionResultText;
  }
}
