import {Component, OnInit} from '@angular/core';
import {Question} from "../../../model/questions/Question";
import {AppStorageService} from "../../../service/app-storage.service";
import {TriviaService} from "../../../service/trivia.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../../model/enums/PathsEnum";

@Component({
  selector: 'app-question-window',
  templateUrl: './time-rush-question-window.component.html',
  styleUrls: ['./time-rush-question-window.component.sass']
})
export class TimeRushQuestionWindowComponent implements OnInit {

  protected readonly loadingProgressBarMax: number = 10;
  protected readonly timeRemainingProgressBarMax: number = 30;
  protected readonly questionsAmount: number = 5;

  protected loadingProgressBar: number = 0;
  protected timeRemainingProgressBar: number = this.timeRemainingProgressBarMax + 1;
  protected currentQuestion: Question | undefined;
  protected showQuestion: boolean = false;

  private questions: Question[] = []
  private firstInteractionOnScreen: boolean = true;
  private resetTimeRemaining: boolean = false;
  private totalScore: number = 0;

  private readonly questionReadySound: HTMLAudioElement = new Audio('assets/sounds/logon.wav');
  private readonly correctQuestionSound: HTMLAudioElement = new Audio('assets/sounds/logoff.wav');

  constructor(
    private readonly appStorageService: AppStorageService,
    private readonly triviaService: TriviaService,
    protected readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  public async ngOnInit(): Promise<void> {
    if (!this.appStorageService.canQuizBeAnswered())
      await this.router.navigateByUrl(PathsEnum.HOME);

    this.loadProgressBar()

    this.questions = await this.triviaService.fetchQuestion(this.questionsAmount);
    this.currentQuestion = this.questions.pop();
  }

  public async onClickAnswer(answer: string): Promise<void> {
    this.showQuestion = false;
    this.loadingProgressBar = 0;
    this.resetTimeRemaining = true;
    this.timeRemainingProgressBar = this.timeRemainingProgressBarMax + 1;

    if (answer === this.currentQuestion!.correctAnswer) {
      this.totalScore += this.currentQuestion!.points * 5;

      if(this.questions.length === 0) {
        await this.router.navigate([`../${PathsEnum.QUIZ_TIME_RUSH_ALL_ANSWERS_CORRECT}`, this.totalScore], {relativeTo: this.route});
      } else {
        await this.correctQuestionSound.play();
        this.currentQuestion = this.questions.pop();
        this.loadProgressBar();
      }
    } else {
      await this.wrongQuestionOrTimeExpired('wrong');
    }
  }

  public async wrongQuestionOrTimeExpired(type: string): Promise<void> {
    await this.router.navigate([`../${PathsEnum.QUIZ_TIME_RUSH_WRONG_ANSWER_OR_TIMEOUT}`, type, this.questionsAmount - this.questions.length - 1], {relativeTo: this.route});
  }

  // Loading bars methods

  public getLoadingWindowBarTitle(): string {
    const questionLoading: number = this.questionsAmount - this.questions.length;

    return `Loading question Nº${questionLoading}...`;
  }

  public getQuestionWindowBarTitle(): string {
    const questionIndex: number = this.questionsAmount - (this.questions.length);

    switch (questionIndex) {
      case 1:
        return 'Let\'s begin! First question...';
      case 2:
      case 3:
        return `Question number ${questionIndex}...`;
      case 4:
        return `Getting closer... question number ${questionIndex}...`;
      case 5:
        return `Almost there! Last question!!!`
    }

    return `ERROR`;
  }

  // Titles and strings

  public getLoadingWindowDescription(): string {
    const questionIndex: number = this.questionsAmount - (this.questions.length);

    switch (questionIndex) {
      case 1:
        return 'Get yourself ready! We\'re loading your questions...';
      case 2:
        return 'Nice one! Proceeding to the next question...';
      case 3:
        return 'Well done, Halfway there! Let\'s move on...';
      case 4:
        return 'Excellent! Getting closer... be ready for the next question!';
      case 5:
        return 'You are almost there! Proceeding for the last question!';
    }

    return `ERROR`;
  }

  public getCurrentQuestionPoints(): string {
    return `[${this.currentQuestion!.points} * 5: ${this.currentQuestion!.points * 5} points for this question]`;
  }

  public getLoadingWindowIcon(): string {
    const iconPath: string = this.firstInteractionOnScreen ? 'question-loading.png' : 'next-question.png';

    return `assets/icons/${iconPath}`;
  }

  private async loadProgressBar() {
    let revertProgressBar: boolean = false;

    // 0 means it hasn't loaded questions yet, wait 5 seconds only
    // other questions, step is 1 to last 10 seconds
    const step: number = this.firstInteractionOnScreen ? 2 : 1

    while (true) {
      if (this.loadingProgressBar === this.loadingProgressBarMax) {
        revertProgressBar = true;

        // On first interaction it should check for questions. Otherwise, it just checks for the popped question
        const containsQuestions: boolean = this.firstInteractionOnScreen ? (this.questions !== undefined && this.questions.length > 0) : true;
        const poppedQuestion: boolean = this.currentQuestion !== undefined;

        if (containsQuestions && poppedQuestion) {
          this.showQuestion = true;
          this.resetTimeRemaining = false;
          this.firstInteractionOnScreen = false;
          this.loadTimeRemainingProgressBar();
          await this.questionReadySound.play();
          break;
        }
      } else if (this.loadingProgressBar === 0) {
        revertProgressBar = false;
      }

      this.loadingProgressBar += revertProgressBar ? -step : step;

      await new Promise(f => setTimeout(f, 1000));
    }
  }

  private async loadTimeRemainingProgressBar(): Promise<void> {
    while (true) {
      if (this.resetTimeRemaining) {
        break;
      }

      if (this.timeRemainingProgressBar === 0) {
        await this.wrongQuestionOrTimeExpired('timeout');
        break;
      }

      this.timeRemainingProgressBar -= 1;

      await new Promise(f => setTimeout(f, 1000));
    }
  }
}
