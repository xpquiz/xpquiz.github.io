import {Component, OnInit} from '@angular/core';
import {TriviaService} from "../../service/trivia.service";
import {TriviaResponse} from "../../model/TriviaResponse";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";

@Component({
  selector: 'app-question-window',
  templateUrl: './question-window.component.html',
  styleUrls: ['./question-window.component.sass']
})
export class QuestionWindowComponent implements OnInit {

  public questionLoaded: boolean = false;
  public question: string = '';
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
    private readonly router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
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
    const routeToNavigate: string = correctAnswer ? PathsEnum.CORRECT_ANSWER : PathsEnum.WRONG_ANSWER_NO_PARAM;
    const answer: string | null = correctAnswer ? null : this.correctAnswer;

    await this.router.navigate(answer === null ? [routeToNavigate] : [routeToNavigate, answer]);
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
}
