import {Component} from '@angular/core';
import {Question} from "../../model/questions/Question";
import {TriviaService} from "../../service/trivia.service";
import {Router} from "@angular/router";
import {EncryptionService} from "../../service/encryption.service";
import {AppStorageService} from "../../service/app-storage.service";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {QuestionResultTrifectaTemplateParams} from "../../model/Template";
import {GameMode} from "../../model/enums/GameModesEnum";

@Component({
  selector: 'app-question-trifecta-window',
  templateUrl: './question-trifecta-window.component.html',
  styleUrls: ['./question-trifecta-window.component.sass']
})
export class QuestionTrifectaWindowComponent {

  public questions: Question[] = [];
  public selectedAnswers: string[] | undefined[] = [undefined, undefined, undefined
  ];
  public showQuestions: boolean = false;
  public confirmedAnswers: boolean = false;

  private questionLoaded: boolean = false;
  private questionAmount: number = 3;

  public loadingProgressBar: number = 0;
  public answerProgressBar: number = 0;
  public progressBarMax: number = 100;

  private questionReadySound: HTMLAudioElement = new Audio('assets/sounds/logon.wav');
  private confirmAnswerSound: HTMLAudioElement = new Audio('assets/sounds/exclamation.wav');

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
    await this.loadQuestions();
  }

  private async loadQuestions(): Promise<void> {
    this.questions = await this.triviaService.fetchQuestion(this.questionAmount);
    this.questionLoaded = true;
  }

  private async startLoadingProgressBar(): Promise<void> {
    let revertProgressBar: boolean = false;

    while (true) {
      if (this.loadingProgressBar === 100) {
        revertProgressBar = true;

        if (this.questionLoaded) {
          this.showQuestions = true;
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

  public async onClickAnswer(index: number, answer: string): Promise<void> {
    if (this.selectedAnswers[index] !== undefined)
      this.selectedAnswers[index] = undefined;
    else
      this.selectedAnswers[index] = answer;

    if (this.selectedAllAnswers())
      await this.confirmAnswerSound.play();
  }

  public shouldDisableAnswer(index: number, answer: string): boolean {
    const selectedAnswer = this.selectedAnswers[index];

    return (selectedAnswer !== undefined && selectedAnswer !== answer) || this.confirmedAnswers;
  }

  public getTotalPointsLabel(): string {
    return `This trifecta is worth ${(this.questions[0].points + this.questions[1].points + this.questions[2].points) * 3} points!`;
  }

  public getSumPointsLabel(): string {
    const firstQuestionPoints: number = this.questions[0].points;
    const secondQuestionPoints: number = this.questions[1].points;
    const thirdQuestionPoints: number = this.questions[2].points;
    const totalPoints: number = firstQuestionPoints + secondQuestionPoints + thirdQuestionPoints;

    return `(${firstQuestionPoints} + ${secondQuestionPoints} + ${thirdQuestionPoints}) = ${totalPoints} * 3 = ${totalPoints * 3}`;
  }

  public getAnswerLabel(index: number, answer: string): string {
    return this.selectedAnswers[index] === answer ? `> ${answer} <` : answer;
  }

  public async confirmAnswers(): Promise<void> {
    this.confirmedAnswers = true;

    while (true) {
      await new Promise(f => setTimeout(f, 400));

      if (this.answerProgressBar === this.progressBarMax)
        break;

      this.answerProgressBar += 10;
    }

    await this.redirectFromAnswer();
  }

  private async redirectFromAnswer(): Promise<void> {
    let correctAnswers: boolean = true;
    let totalPoints: number = 0;

    for (let i = 0; i <= 2; i++) {
      if (this.selectedAnswers[i] !== this.questions[i].correctAnswer) {
        correctAnswers = false;
        break;
      }
    }

    const questionResultTrifecta: QuestionResultTrifectaTemplateParams = {
      questions: this.questions.map(question => question.question),
      correctAnswers: this.questions.map(question => question.correctAnswer),
      selectedAnswers: this.selectedAnswers.map((answer, index) => {
        const question = this.questions[index];
        const correctAnswer: boolean = answer === question.correctAnswer

        totalPoints += question.points * 3;

        return {
          icon: correctAnswer ? '🟩' : '🟥',
          answer: answer!,
          points: correctAnswer ? `(${question.points} * 3) = ${question.points * 3} points` : '0'
        }
      }),
      questionPoints: correctAnswers ? totalPoints : 0,
    };

    const questionResultTrifectaData: string = this.encryptionService.encrypt(JSON.stringify(questionResultTrifecta));

    await this.router.navigate([(correctAnswers ? PathsEnum.CORRECT_ANSWER : PathsEnum.WRONG_ANSWER), GameMode.TRIFECTA.title, questionResultTrifectaData]);
  }

  public validateAnswers(): void {
    this.selectedAnswers = [];
  }

  public isSelectingAnswers(): boolean {
    return this.selectedAnswers[0] === undefined ||
      this.selectedAnswers[1] === undefined ||
      this.selectedAnswers[2] === undefined;
  }

  public selectedAllAnswers(): boolean {
    return this.selectedAnswers[0] !== undefined &&
      this.selectedAnswers[1] !== undefined &&
      this.selectedAnswers[2] !== undefined;
  }
}
