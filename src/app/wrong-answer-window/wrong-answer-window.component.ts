import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";
import {QuestionResultTemplateParams, TemplateEnum} from "../../model/enums/Template";
import {EncryptionService} from "../../service/encryption.service";
import {TemplateService} from "../../service/template.service";

@Component({
  selector: 'app-wrong-answer-window',
  templateUrl: './wrong-answer-window.component.html',
  styleUrls: ['./wrong-answer-window.component.sass']
})
export class WrongAnswerWindowComponent implements OnInit {

  public correctAnswer: string | null = '';
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;

  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');

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

    await this.wrongAnswerSound.play();
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

  private saveCurrentScore() {
    this.appStorageService.saveAnswer(false);
  }

  private async retrieveRouteParams(): Promise<void> {
    const encryptedQuestionResult: string = this.route.snapshot.paramMap.get('result')!;

    const decryptedQuestionResult: string = this.encryptionService.decrypt(encryptedQuestionResult);
    const questionResult: QuestionResultTemplateParams = JSON.parse(decryptedQuestionResult);

    this.correctAnswer = questionResult.rightAnswer;
    this.clipboardText = await this.templateService.render(TemplateEnum.QUESTION_RESULT, questionResult);
  }
}
