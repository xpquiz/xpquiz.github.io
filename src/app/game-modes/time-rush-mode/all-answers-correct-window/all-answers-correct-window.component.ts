import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../shared/service/template.service";
import {AppStorageService} from "../../../shared/service/app-storage.service";
import {QuestionResultTimeRushTemplateParams, TemplateEnum} from "../../../shared/model/Template";
import {PathsEnum} from 'src/shared/model/enums/PathsEnum';
import {parse} from "mustache";

@Component({
  selector: 'app-all-answers-correct-window',
  templateUrl: './all-answers-correct-window.component.html',
  styleUrls: ['./all-answers-correct-window.component.sass']
})
export class AllAnswersCorrectWindowComponent {

  protected readonly PathsEnum = PathsEnum;

  public totalScore: number = 0;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

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

    await this.correctAnswerSound.play();
    this.saveCurrentScore();
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private saveCurrentScore(): void {
    this.appStorageService.saveAnswer(true, this.totalScore, 3);
  }

  private async retrieveRouteParams(): Promise<void> {
    this.totalScore = parseInt(this.route.snapshot.paramMap.get('score')!);

    const answers: string = '\u{1F7E9}'.repeat(5);

    const templateParams: QuestionResultTimeRushTemplateParams = {
      correctAnswers: '👉 5/5 😀',
      answers: answers,
      message: `🍾 Got ${this.totalScore} points in total!!!`
    };

    this.clipboardText = await this.templateService.render(TemplateEnum.QUESTION_RESULT_TIME_RUSH, templateParams);
  }
}
