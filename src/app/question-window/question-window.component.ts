import {Component, OnDestroy, OnInit} from '@angular/core';
import {TriviaService} from "../../service/trivia.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";
import {QuestionResultTemplateParams} from "../../model/Template";
import {EncryptionService} from "../../service/encryption.service";
import {Subscription} from "rxjs";
import {Question} from "../../model/questions/Question";

@Component({
  selector: 'app-question-window',
  templateUrl: './question-window.component.html',
  styleUrls: ['./question-window.component.sass']
})
export class QuestionWindowComponent implements OnInit, OnDestroy {

  public question: Question | undefined;

  private questionLoaded: boolean = false;
  public showQuestion: boolean = false;
  public selectedAnswer: string = '';
  public confirmedAnswer: boolean = false;

  public progressBarMax: number = 100;
  public answerProgressBar: number = 0;
  public loadingProgressBar: number = 0;

  private questionReadySound: HTMLAudioElement = new Audio('assets/sounds/logon.wav');
  private confirmAnswerSound: HTMLAudioElement = new Audio('assets/sounds/exclamation.wav');
  private getQuizzesSubscription: Subscription | undefined;

  constructor(
    private readonly triviaService: TriviaService,
    private readonly router: Router,
    private readonly encryptionService: EncryptionService,
    private readonly appStorageService: AppStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    if (!this.appStorageService.canQuizBeAnswered()) {
      await this.router.navigateByUrl(PathsEnum.HOME);
      return;
    }

    this.startLoadingProgressBar();
    await this.loadQuestion();
  }

  public ngOnDestroy() {
    this.getQuizzesSubscription?.unsubscribe();
  }

  public async onClickAnswer(selectedAnswer: string) {
    this.selectedAnswer = selectedAnswer;
    await this.confirmAnswerSound.play();
  }

  public getAnswerLabel(answer: string): string {
    const selectedAnswer: boolean = this.selectedAnswer === answer;

    return selectedAnswer ? `> ${answer} <` : answer;
  }

  private async loadQuestion(): Promise<void> {
    const questions: Question[] = await this.triviaService.fetchQuestion(1);
    this.question = questions[0];
    this.questionLoaded = true;
  }

  public async confirmAnswer(): Promise<void> {
    this.confirmedAnswer = true;

    while (true) {
      await new Promise(f => setTimeout(f, 400));

      if (this.answerProgressBar === this.progressBarMax)
        break;

      this.answerProgressBar += 10;
    }

    await this.redirectFromAnswer();
  }

  public validateAnswer(): void {
    this.selectedAnswer = '';
  }

  private async redirectFromAnswer(): Promise<void> {
    const correctAnswer: boolean = this.selectedAnswer === this.question!.correctAnswer;
    const questionResult: QuestionResultTemplateParams = {
      question: this.question!.question,
      questionPoints: correctAnswer ? this.question!.points : null,
      selectedAnswer: `${correctAnswer ? '🟩' : '🟥'} ${this.selectedAnswer}`,
      rightAnswer: this.question!.correctAnswer,
      wrongAnswers: this.question!.answers.filter(value => value !== this.question!.correctAnswer)
    };
    const questionResultData: string = this.encryptionService.encrypt(JSON.stringify(questionResult));

    await this.router.navigate([correctAnswer ? PathsEnum.CORRECT_ANSWER : PathsEnum.WRONG_ANSWER, questionResultData]);
  }

  private async startLoadingProgressBar(): Promise<void> {
    let revertProgressBar: boolean = false;

    while (true) {
      if (this.loadingProgressBar === 100) {
        revertProgressBar = true;

        if (this.questionLoaded) {
          this.showQuestion = true;
          await this.questionReadySound.play();
          break;
        }
      } else if (this.loadingProgressBar === 0) {
        revertProgressBar = false;
      }

      this.loadingProgressBar += revertProgressBar ? -10 : 10;

      await new Promise(f => setTimeout(f, 300));
    }
  }
}
