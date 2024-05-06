import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {TheTriviaApiResponse} from "../model/questions/TheTriviaApiResponse";
import {OpenTriviaDBResponse} from "../model/questions/OpenTriviaDBResponse";
import {Question} from "../model/questions/Question";
import {
  QuizAPIResponse,
  QuizAPIResponseAnswers,
  QuizAPIResponseCorrectAnswers
} from "../model/questions/QuizAPIResponse";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private readonly questionLimit: number = 1;
  private readonly questionMethods: Function[] = [
    this.getQuestionsTheTriviaApi,
    this.getQuestionsOpenTriviaDB,
    this.getQuestionsQuizAPI,
  ]

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public async fetchQuestion(): Promise<Question[]> {
    while(true) {
      const randomNumber: number = this.randomIntFromInterval(0, this.questionMethods.length - 1);
      const randomQuestionMethod: Function = this.questionMethods[randomNumber];
      const questions: Question[] = await randomQuestionMethod.call(this);

      if(questions.length !== 0) return questions;
    }
  }

  private randomIntFromInterval(min: number, max: number): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private async getQuestionsTheTriviaApi(): Promise<Question[]> {
    const url: string = `${environment.theTriviaApiUrl}?limit=${this.questionLimit}`;

    const response: TheTriviaApiResponse[] = await firstValueFrom(
      this.httpClient.get<TheTriviaApiResponse[]>(url)
    );

    return response.map(res => {
      return {
        question: res.question.text,
        correctAnswer: res.correctAnswer,
        incorrectAnswers: res.incorrectAnswers,
        difficulty: res.difficulty,
        isNiche: res.isNiche,
      }
    });
  }

  private async getQuestionsOpenTriviaDB(): Promise<Question[]> {
    const url: string = `${environment.openTriviaDBUrl}?amount=${this.questionLimit}`;

    const response: OpenTriviaDBResponse = await firstValueFrom(
      this.httpClient.get<OpenTriviaDBResponse>(url)
    );

    return response.results.map(res => {
      return {
        question: res.question,
        correctAnswer: res.correct_answer,
        incorrectAnswers: res.incorrect_answers,
        difficulty: res.difficulty as 'easy' | 'medium' | 'hard',
        isNiche: false,
      }
    });
  }

  private async getQuestionsQuizAPI(): Promise<Question[]> {
    const url: string = `${environment.quizAPIUrl}?limit=${this.questionLimit}`;
    const response: QuizAPIResponse[] = await firstValueFrom(
      this.httpClient.get<QuizAPIResponse[]>(url, {
        headers: {'X-Api-Key': environment.quizAPIKey}
      })
    );

    return response.map(res => {
      let incorrectAnswers: string[] = [];
      let correctAnswer: string | undefined = undefined;

      for (const key of Object.keys(res.answers)) {
        const answer: string | null = res.answers[key as keyof QuizAPIResponseAnswers];

        if (answer === null)
          continue;

        const answerKey: string = `${key}_correct`;
        const isAnswerCorrect: boolean = res.correct_answers[answerKey as keyof QuizAPIResponseCorrectAnswers];

        if (isAnswerCorrect && correctAnswer === undefined) {
          correctAnswer = answer;
          continue;
        }

        incorrectAnswers.push(answer);
      }

      return {
        question: res.question,
        correctAnswer: correctAnswer!,
        incorrectAnswers: incorrectAnswers,
        difficulty: res.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        isNiche: false
      }
    });

  }
}
