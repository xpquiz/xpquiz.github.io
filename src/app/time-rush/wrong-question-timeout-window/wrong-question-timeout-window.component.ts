import {Component, OnInit} from '@angular/core';
import {PathsEnum} from "../../../model/enums/PathsEnum";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../service/template.service";
import {AppStorageService} from "../../../service/app-storage.service";
import {QuestionResultTimeRushTemplateParams, TemplateEnum} from "../../../model/Template";

@Component({
  selector: 'app-wrong-question-timeout-window',
  templateUrl: './wrong-question-timeout-window.component.html',
  styleUrls: ['./wrong-question-timeout-window.component.sass']
})
export class WrongQuestionTimeoutWindowComponent implements OnInit {
  public answers: string = '';
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 72;
  public correctAnswers: number = 0;

  protected readonly PathsEnum = PathsEnum;
  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');
  public type: string = '';

  constructor(
    protected readonly router: Router,
    private readonly route: ActivatedRoute,
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

  private saveCurrentScore(): void {
    this.appStorageService.saveAnswer(false, undefined, this.hoursToPlayAgain);
  }

  private async retrieveRouteParams(): Promise<void> {
    this.correctAnswers = parseInt(this.route.snapshot.paramMap.get('questions')!);
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.answers = '\u{1F7E9}'.repeat(this.correctAnswers) + '\u{1F7E5}'.repeat(5 - this.correctAnswers);

    const templateParams: QuestionResultTimeRushTemplateParams = {
      correctAnswers: `👉 ${this.correctAnswers}/5 😠`,
      answers: this.answers,
      message: `❌ Missed ${5 - this.correctAnswers} questions... maybe next time`
    };

    this.clipboardText = await this.templateService.render(TemplateEnum.QUESTION_RESULT_TIME_RUSH, templateParams);
  }
}
