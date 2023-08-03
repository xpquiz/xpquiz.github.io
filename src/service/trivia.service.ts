import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, take} from "rxjs";
import {TriviaResponse} from "../model/TriviaResponse";

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private readonly triviaAPIRequestURL: string = 'https://the-trivia-api.com/v2/questions';
  private readonly questionLimit: number = 1;
  private readonly requestURL: string = `${this.triviaAPIRequestURL}?limit=${this.questionLimit}`;

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public getQuizzes(): Observable<TriviaResponse[]> {
    return this.httpClient.get<TriviaResponse[]>(this.requestURL);
  }
}
