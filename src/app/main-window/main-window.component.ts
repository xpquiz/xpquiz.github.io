import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../shared/model/enums/PathsEnum";
import {AppStorage} from "../../shared/model/AppStorage";
import moment, {Duration, Moment} from "moment";
import {AppStorageService} from "../../shared/service/app-storage.service";
import {BaseRepository} from "../../shared/database/repository/base.repository";
import {BaseEntity} from "../../shared/database/entity/base.entity";
import {differenceInHours, differenceInMinutes, differenceInSeconds, isAfter, isEqual, sub} from "date-fns";
import {liveQuery} from "dexie";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.sass']
})
export class MainWindowComponent implements OnInit {

  public quizCanBeAnswered: boolean = true;
  public remainingTime: string = '';

  protected readonly PathsEnum = PathsEnum;

  constructor(
    protected readonly router: Router,
    private readonly baseRepository: BaseRepository,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.baseRepository.findMainBase().subscribe({
      next: (value: BaseEntity | undefined) => {
        this.quizCanBeAnswered = isEqual(new Date(), value!.nextQuizResponseDate) || isAfter(new Date(), value!.nextQuizResponseDate);

        if (!this.quizCanBeAnswered)
          this.startCountdown(value!);
      },
      error: error => {}
    })
  }

  private async startCountdown(base: BaseEntity): Promise<void> {
    while (true) {
      const currentDate: Date = new Date();

      if (isEqual(new Date(), base.nextQuizResponseDate)) {
        this.quizCanBeAnswered = true;
        break;
      }

      const hours: number = differenceInHours(base.nextQuizResponseDate, currentDate);
      const minutes: number = differenceInMinutes(base.nextQuizResponseDate, currentDate);
      const seconds: number = differenceInSeconds(base.nextQuizResponseDate, currentDate);

      this.remainingTime = `${hours} hours, ${minutes} minutes, ${seconds} seconds`

      await new Promise(f => setTimeout(f, 1000));
    }
  }
}
