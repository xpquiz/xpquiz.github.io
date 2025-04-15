import {Component, OnInit} from '@angular/core';
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "@Shared/service/template.service";
import {QuestionResultTimeRushTemplateParams, TemplateEnum} from "@Shared/model/Template";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {addHours, isBefore} from "date-fns";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {HistoryRepository} from "@Shared/database/repository/history.repository";

@Component({
  selector: 'app-wrong-question-timeout-window',
  templateUrl: './wrong-question-timeout-window.component.html',
  styleUrls: ['./wrong-question-timeout-window.component.sass']
})
export class WrongQuestionTimeoutWindowComponent implements OnInit {
  public answers: string = '';
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 72;
  public correctAnswers: number = 0;
  public type: string = '';
  protected readonly PathsEnum = PathsEnum;
  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');

  constructor(
    protected readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly templateService: TemplateService,
    private readonly baseRepository: BaseRepository,
    private readonly historyRepository: HistoryRepository
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const baseEntity: BaseEntity | undefined = await this.baseRepository.findMainBase();

    if (isBefore(new Date(), baseEntity!.nextQuizResponseDate)) {
      await this.router.navigateByUrl(PathsEnum.HOME);
      return;
    }

    await this.retrieveRouteParams();
    await this.saveCurrentScore();
    await this.wrongAnswerSound.play();
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private async saveCurrentScore(): Promise<void> {
    const currentDate: Date = new Date();
    const newQuestionHistory: HistoryEntity = {
      date: currentDate,
      gameMode: 'time-rush',
      won: true,
      correctAnswers: this.correctAnswers,
      wrongAnswers: 5 - this.correctAnswers,
      totalScore: null,
    };
    const base: BaseEntity | undefined = await this.baseRepository.findMainBase();

    base!.nextQuizResponseDate = addHours(currentDate, this.hoursToPlayAgain);

    await this.historyRepository.save(newQuestionHistory);
    await this.baseRepository.updateBase(base);
  }

  private async retrieveRouteParams(): Promise<void> {
    this.correctAnswers = parseInt(this.route.snapshot.paramMap.get('questions')!);
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.answers = '\u{1F7E9}'.repeat(this.correctAnswers) + '\u{1F7E5}'.repeat(5 - this.correctAnswers);

    const templateParams: QuestionResultTimeRushTemplateParams = {
      correctAnswers: `👉 ${this.correctAnswers}/5 😠`,
      answers: this.answers,
      message: `❌ Missed ${5 - this.correctAnswers} questions... maybe next time`
    };

    this.clipboardText = await this.templateService.render(TemplateEnum.QUESTION_RESULT_TIME_RUSH, templateParams);
  }
}
