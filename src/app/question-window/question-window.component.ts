import {Component, OnInit} from '@angular/core';
import {TriviaService} from "../../service/trivia.service";
import {TriviaResponse} from "../../model/TriviaResponse";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorageService} from "../../service/app-storage.service";
import {QuestionResultTemplateParams} from "../../model/Template";
import {EncryptionService} from "../../service/encryption.service";

@Component({
  selector: 'app-question-window',
  templateUrl: './question-window.component.html',
  styleUrls: ['./question-window.component.sass']
})
export class QuestionWindowComponent implements OnInit {

  public questionLoaded: boolean = false;
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

  public async onClickAnswer(selectedAnswer: string) {
    this.selectedAnswer = selectedAnswer;
    await this.confirmAnswerSound.play();
  }

  public getAnswerLabel(answer: string): string {
    const selectedAnswer: boolean = this.selectedAnswer === answer;

    return selectedAnswer ? `> ${answer} <` : answer;
  }

  private async loadQuestion() {
    this.triviaService.getQuizzes().subscribe(async (response: TriviaResponse[]): Promise<void> => {
      const singleQuiz: TriviaResponse = response[0];

      this.question = singleQuiz.question.text;
      this.correctAnswer = singleQuiz.correctAnswer;
      this.answers = [singleQuiz.correctAnswer, ...singleQuiz.incorrectAnswers]
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);

      await new Promise(f => setTimeout(f, 3000));

      this.questionLoaded = true;

      await this.questionReadySound.play();

      this.questionPoints = this.sumQuestionPoints(singleQuiz.difficulty, singleQuiz.isNiche);
    });
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

  private startLoadingProgressBar(): void {
    new Promise<void>(async (resolve, reject): Promise<void> => {
      while (true) {
        this.loadingProgressBar += 10;

        if (this.loadingProgressBar === this.progressBarMax) {
          resolve();
          break;
        }

        await new Promise(f => setTimeout(f, 300));
      }
    });
  }

  private async returnHome() {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }
}
