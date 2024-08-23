import {booleanAttribute, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {TheTriviaApiResponse} from "../model/questions/TheTriviaApiResponse";
import {OpenTriviaDBResponse} from "../model/questions/OpenTriviaDBResponse";
import {DifficultyType, Question} from "../model/questions/Question";
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

  private readonly difficultyPointsMap: Map<DifficultyType, number> = new Map<DifficultyType, number>([
    ['easy', 1],
    ['medium', 3],
    ['hard', 5]
  ]);

  private readonly questionMethods: Function[] = [
    this.getQuestionsTheTriviaApi,
    this.getQuestionsOpenTriviaDB,
    this.getQuestionsQuizAPI,
  ]

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public async fetchQuestion(questionNumber: number): Promise<Question[]> {
    while (true) {
      const randomNumber: number = this.randomIntFromInterval(0, this.questionMethods.length - 1);
      const randomQuestionMethod: Function = this.questionMethods[randomNumber];
      const questions: Question[] = await randomQuestionMethod.call(this, questionNumber);

      if (questions.length !== 0) return questions;
    }
  }

  private randomIntFromInterval(min: number, max: number): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private async getQuestionsTheTriviaApi(questionNumber: number): Promise<Question[]> {
    const url: string = `${environment.theTriviaApiUrl}?limit=${questionNumber}`;
    const response: TheTriviaApiResponse[] = await firstValueFrom(
      this.httpClient.get<TheTriviaApiResponse[]>(url)
    );

    return response.map(res => {
      const answers = [res.correctAnswer, ...res.incorrectAnswers]
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);

      return {
        question: res.question.text,
        answers,
        correctAnswer: res.correctAnswer,
        points: this.difficultyPointsMap.get(res.difficulty)!,
        difficulty: res.difficulty,
        isNiche: res.isNiche,
      }
    });
  }

  private async getQuestionsOpenTriviaDB(questionNumber: number): Promise<Question[]> {
    const url: string = `${environment.openTriviaDBUrl}?amount=${questionNumber}&encode=base64`;

    const response: OpenTriviaDBResponse = await firstValueFrom(
      this.httpClient.get<OpenTriviaDBResponse>(url)
    );

    return response.results.map(res => {
      const correctAnswer: string = atob(res.correct_answer)

      const answers = [correctAnswer, ...res.incorrect_answers.map(r => atob(r))]
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
      const difficulty: DifficultyType = atob(res.difficulty) as DifficultyType;

      return {
        question: atob(res.question),
        correctAnswer,
        answers,
        points: this.difficultyPointsMap.get(difficulty)!,
        difficulty,
        isNiche: false,
      }
    });
  }

  private async getQuestionsQuizAPI(questionNumber: number): Promise<Question[]> {
    const url: string = `${environment.quizAPIUrl}?limit=${questionNumber}`;
    const response: QuizAPIResponse[] = await firstValueFrom(
      this.httpClient.get<QuizAPIResponse[]>(url, {
        headers: {'X-Api-Key': environment.quizAPIKey}
      })
    );

    return response.map(res => {
      const difficulty: DifficultyType = res.difficulty.toLowerCase() as DifficultyType;
      let incorrectAnswers: string[] = [];
      let correctAnswer: string | undefined = undefined;

      for (const key of Object.keys(res.answers)) {
        const answer: string | null = res.answers[key as keyof QuizAPIResponseAnswers];

        if (answer === null)
          continue;

        const answerKey: string = `${key}_correct`;
        const isAnswerCorrect: string = res.correct_answers[answerKey as keyof QuizAPIResponseCorrectAnswers];

        if (booleanAttribute(isAnswerCorrect) && correctAnswer === undefined) {
          correctAnswer = answer;
          continue;
        }

        incorrectAnswers.push(answer);
      }

      const answers = [correctAnswer!, ...incorrectAnswers]
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);

      return {
        question: res.question,
        correctAnswer: correctAnswer!,
        answers,
        points: this.difficultyPointsMap.get(difficulty)!,
        difficulty,
        isNiche: false
      }
    });

  }
}
