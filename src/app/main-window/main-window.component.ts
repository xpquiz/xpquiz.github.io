import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {BaseRepository} from "@Shared/database/repository/base.repository";
import {BaseEntity} from "@Shared/database/entity/base.entity";
import {Duration, formatDuration, intervalToDuration, isAfter, isEqual} from "date-fns";
import {liveQuery} from "dexie";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.sass']
})
export class MainWindowComponent implements OnInit {

  public quizCanBeAnswered: boolean = true;
  public remainingTime: string = '';
  public screenLoaded: boolean = false;

  protected readonly PathsEnum = PathsEnum;

  constructor(
    protected readonly router: Router,
    private readonly baseRepository: BaseRepository,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));

    liveQuery(() => this.baseRepository.findMainBase()).subscribe({
      next: (value: BaseEntity | undefined) => {
        this.quizCanBeAnswered = isEqual(new Date(), value!.nextQuizResponseDate) || isAfter(new Date(), value!.nextQuizResponseDate);

        if (!this.quizCanBeAnswered)
          this.startCountdown(value!);

        this.screenLoaded = true;
      },
      error: error => {
        console.error(`Error happened while trying to find game base entity.`, error);
      }
    })
  }

  private async startCountdown(base: BaseEntity): Promise<void> {
    while (true) {
      const currentDate: Date = new Date();

      if (isEqual(currentDate, base.nextQuizResponseDate)) {
        this.quizCanBeAnswered = true;
        break;
      }

      const timeToNextQuestion: Duration = intervalToDuration({
        start: currentDate,
        end: base.nextQuizResponseDate
      });

      this.remainingTime = formatDuration(timeToNextQuestion,
        {
          format: ['hours', 'minutes', 'seconds'],
          delimiter: ', '
        },
      );

      await new Promise(f => setTimeout(f, 1000));
    }
  }
}
