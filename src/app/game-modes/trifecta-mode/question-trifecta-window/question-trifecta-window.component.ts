import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "@Shared/model/questions/Question";
import {TriviaService} from "@Shared/service/trivia.service";
import {EncryptionService} from "@Shared/service/encryption.service";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {isBefore} from "date-fns";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {QuestionResultTrifectaTemplateParams} from "@Shared/model/Template";

@Component({
  selector: 'app-question-trifecta-window',
  templateUrl: './question-trifecta-window.component.html',
  styleUrls: ['./question-trifecta-window.component.sass']
})
export class QuestionTrifectaWindowComponent implements OnInit {

  public questions: Question[] = [];
  public selectedAnswers: string[] | undefined[] = [undefined, undefined, undefined
  ];
  public showQuestions: boolean = false;
  public confirmedAnswers: boolean = false;
  public loadingProgressBar: number = 0;
  public answerProgressBar: number = 0;
  public progressBarMax: number = 100;
  private questionLoaded: boolean = false;
  private questionAmount: number = 3;
  private questionReadySound: HTMLAudioElement = new Audio('assets/sounds/logon.wav');
  private confirmAnswerSound: HTMLAudioElement = new Audio('assets/sounds/exclamation.wav');

  constructor(
    private readonly triviaService: TriviaService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly encryptionService: EncryptionService,
    private readonly baseRepository: BaseRepository
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const baseEntity: BaseEntity | undefined = await this.baseRepository.findMainBase();

    if (isBefore(new Date(), baseEntity!.nextQuizResponseDate)) {
      await this.router.navigateByUrl(PathsEnum.HOME);
      return;
    }

    this.startLoadingProgressBar();
    await this.loadQuestions();
  }

  public async onClickAnswer(index: number, answer: string): Promise<void> {
    this.selectedAnswers[index] = this.selectedAnswers[index] !== undefined ? undefined : answer;

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

  private async redirectFromAnswer(): Promise<void> {
    let totalPoints: number = 0;

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
          points: correctAnswer ? `(${question.points} * 3) = ${question.points * 3}` : '0',
          correct: correctAnswer
        }
      }),
      questionPoints: totalPoints,
    };

    const questionResultTrifectaData: string = this.encryptionService.encrypt(JSON.stringify(questionResultTrifecta));

    await this.router.navigate([PathsEnum.QUIZ_TRIFECTA_RESULT, questionResultTrifectaData], { relativeTo: this.route });
  }
}
