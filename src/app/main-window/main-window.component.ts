import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {Duration, formatDuration, intervalToDuration, isAfter, isEqual} from "date-fns";
import {liveQuery, Subscription} from "dexie";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.sass']
})
export class MainWindowComponent implements OnInit, OnDestroy {

  public quizCanBeAnswered: boolean = true;
  public remainingTime: string = '';
  public screenLoaded: boolean = false;

  protected readonly PathsEnum = PathsEnum;
  private quizCanBeAnsweredSubscription: Subscription | undefined;

  constructor(
    protected readonly router: Router,
    private readonly baseRepository: BaseRepository,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    await new Promise(f => setTimeout(f, 500));

    this.quizCanBeAnsweredSubscription = liveQuery(() => this.baseRepository.findMainBase()).subscribe({
      next: (value: BaseEntity | undefined) => {
        const currentDate: Date = new Date();
        this.quizCanBeAnswered = isEqual(currentDate, value!.nextQuizResponseDate) || isAfter(currentDate, value!.nextQuizResponseDate);

        if (!this.quizCanBeAnswered)
          this.startCountdown(value!);

        this.screenLoaded = true;
      },
      error: error => {
        console.error(`Error happened while trying to find game base entity.`, error);
      }
    })
  }

  public ngOnDestroy(): void {
    this.quizCanBeAnsweredSubscription?.unsubscribe();
  }

  private async startCountdown(base: BaseEntity): Promise<void> {
    while (true) {
      const currentDate: Date = new Date();

      const timeToNextQuestion: Duration = intervalToDuration({
        start: currentDate,
        end: base.nextQuizResponseDate
      });

      // When there's no duration between the 2 dates, intervalToDuration() returns an empty object
      if (Object.keys(timeToNextQuestion).length === 0) {
        this.quizCanBeAnswered = true;
        break;
      }

      this.remainingTime = formatDuration(timeToNextQuestion,
        {
          format: ['days', 'hours', 'minutes', 'seconds'],
          delimiter: ', ',
        },
      );

      await new Promise(f => setTimeout(f, 1000));
    }
  }
}
