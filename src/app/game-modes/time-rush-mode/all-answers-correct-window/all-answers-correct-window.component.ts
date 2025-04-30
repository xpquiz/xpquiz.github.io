import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {addHours, isBefore} from "date-fns";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {HistoryRepository} from "@Shared/database/repository/history.repository";
import {TemplateService} from "@Shared/service/template.service";
import {QuestionResultTimeRushTemplateParams, TemplateEnum} from "@Shared/model/Template";
import {PathsEnum} from '@Shared/model/enums/PathsEnum';

@Component({
  selector: 'app-all-answers-correct-window',
  templateUrl: './all-answers-correct-window.component.html',
  styleUrls: ['./all-answers-correct-window.component.sass']
})
export class AllAnswersCorrectWindowComponent {

  public totalScore: number = 0;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;
  public hoursToPlayAgain: number = 3;

  protected readonly PathsEnum = PathsEnum;
  private readonly  correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

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
    await this.correctAnswerSound.play();
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
      correctAnswers: 5,
      wrongAnswers: 0,
      totalPoints: this.totalScore,
    };
    const base: BaseEntity | undefined = await this.baseRepository.findMainBase();

    base!.nextQuizResponseDate = addHours(currentDate, 3);

    await this.historyRepository.save(newQuestionHistory);
    await this.baseRepository.updateBase(base);
  }

  private async retrieveRouteParams(): Promise<void> {
    this.totalScore = parseInt(this.route.snapshot.paramMap.get('totalPoints')!);

    const answers: string = '\u{1F7E9}'.repeat(5);

    const templateParams: QuestionResultTimeRushTemplateParams = {
      correctAnswers: '👉 5/5 😀',
      answers: answers,
      message: `🍾 Got ${this.totalScore} points in total!!!`
    };

    this.clipboardText = await this.templateService.render(TemplateEnum.QUESTION_RESULT_TIME_RUSH, templateParams);
  }
}
