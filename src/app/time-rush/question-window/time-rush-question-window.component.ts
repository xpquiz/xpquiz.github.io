import {Component, OnInit} from '@angular/core';
import {Question} from "../../../model/questions/Question";
import {AppStorageService} from "../../../service/app-storage.service";
import {TriviaService} from "../../../service/trivia.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../../model/enums/PathsEnum";

@Component({
  selector: 'app-question-window',
  templateUrl: './time-rush-question-window.component.html',
  styleUrls: ['./time-rush-question-window.component.sass']
})
export class TimeRushQuestionWindowComponent implements OnInit {

  public loadingProgressBar: number = 0;

  private questions: Question[] = []
  private currentQuestion: Question | undefined;

  constructor(
    private readonly appStorageService: AppStorageService,
    private readonly triviaService: TriviaService,
    protected readonly router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
    if (!this.appStorageService.canQuizBeAnswered())
      await this.router.navigateByUrl(PathsEnum.HOME);

    this.questions = await this.triviaService.fetchQuestion(5);
    this.currentQuestion = this.questions.pop();
  }

  // Titles and strings

  public getQuestionBarTitle(): string {
    const questionIndex: number = 5 - (this.questions.length);

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

  public getLoadingWindowDescription(): string {
    const questionIndex: number = 5 - (this.questions.length);

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
}
