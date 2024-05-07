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

  public questionLoaded: boolean = false;
  public showQuestion: boolean = false;
  public question: string = '';
  public questionPoints: number = 0;
  public answers: string[] = [];
  public selectedAnswer: string = '';
  public confirmedAnswer: boolean = false;
  public progressBarMax: number = 100;
  public answerProgressBar: number = 0;
  public loadingProgressBar: number = 0;

  private questionReadySound: HTMLAudioElement = new Audio('assets/sounds/logon.wav');
  private confirmAnswerSound: HTMLAudioElement = new Audio('assets/sounds/exclamation.wav');
  private correctAnswer: string = '';
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
      await this.returnHome();
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
    const questions: Question[] = await this.triviaService.fetchQuestion();
    const singleQuiz: Question = questions[0];

    this.question = singleQuiz.question;
    this.correctAnswer = singleQuiz.correctAnswer;
    this.answers = [singleQuiz.correctAnswer, ...singleQuiz.incorrectAnswers]
      .map((value) => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);

    this.questionPoints = this.sumQuestionPoints(singleQuiz.difficulty, singleQuiz.isNiche);
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
    const correctAnswer: boolean = this.selectedAnswer === this.correctAnswer;
    const questionResult: QuestionResultTemplateParams = {
      question: this.question,
      questionPoints: correctAnswer ? this.questionPoints : null,
      selectedAnswer: `${correctAnswer ? '🟩' : '🟥'} ${this.selectedAnswer}`,
      rightAnswer: this.correctAnswer,
      wrongAnswers: this.answers.filter(value => value !== this.correctAnswer)
    };
    const questionResultData: string = this.encryptionService.encrypt(JSON.stringify(questionResult));

    await this.router.navigate([correctAnswer ? PathsEnum.CORRECT_ANSWER : PathsEnum.WRONG_ANSWER, questionResultData]);
  }

  private sumQuestionPoints(questionDifficulty: string, isNiche: boolean): number {
    const difficultyPointsMap: Map<string, number> = new Map<string, number>([
      ['easy', 1],
      ['medium', 3],
      ['hard', 5]
    ]);

    const questionPoints: number = difficultyPointsMap.get(questionDifficulty)!;
    const nichePoints: number = isNiche ? 10 : 0;

    return questionPoints + nichePoints;
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

  private async returnHome() {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }
}
