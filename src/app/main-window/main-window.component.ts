import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../shared/model/enums/PathsEnum";
import {AppStorage} from "../../shared/model/AppStorage";
import moment, {Duration, Moment} from "moment";
import {AppStorageService} from "../../shared/service/app-storage.service";
import {BaseRepository} from "../../shared/database/repository/base.repository";
import {BaseEntity} from "../../shared/database/entity/base.entity";
import {isAfter, isEqual} from "date-fns";

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


    private readonly appStorageService: AppStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const base: BaseEntity | undefined = await this.baseRepository.findMainBase();

    this.quizCanBeAnswered = isEqual(new Date(), base!.nextQuizResponseDate) || isAfter(new Date(), base!.nextQuizResponseDate);

    if (!this.quizCanBeAnswered)
      this.startCountdown();
  }

  private async startCountdown(): Promise<void> {
    const appStorage: AppStorage = this.appStorageService.retrieveAppStorage();

    if (appStorage.lastQuizResponseDate === null) return;

    const nextResponseMinimumDate: Moment = moment(appStorage.lastQuizResponseDate).add(3, "hours");

    while (true) {
      const now: Moment = moment();

      if (now.isSame(nextResponseMinimumDate) || now.isAfter(nextResponseMinimumDate)) {
        this.quizCanBeAnswered = true;
        this.appStorageService.clearLastAnsweredDate();
        break;
      }

      const timeLeft: Duration = moment.duration(nextResponseMinimumDate.valueOf() - now.valueOf());

      this.remainingTime = `${timeLeft.hours()} hours, ${timeLeft.minutes()} minutes, ${timeLeft.seconds()} seconds`

      await new Promise(f => setTimeout(f, 1000));
    }
  }
}
