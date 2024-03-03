import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorage} from "../../model/AppStorage";
import moment, {Duration, Moment} from "moment";
import {AppStorageService} from "../../service/app-storage.service";

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
    private readonly router: Router,
    private readonly appStorageService: AppStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.quizCanBeAnswered = this.appStorageService.canQuizBeAnswered();

    if (!this.quizCanBeAnswered)
      this.startCountdown();
  }

  public async redirectTo(route: PathsEnum): Promise<void> {
    await this.router.navigateByUrl(route);
  }

  private startCountdown(): void {
    const appStorage: AppStorage = this.appStorageService.retrieveAppStorage();

    if (appStorage.lastQuizResponseDate === null) return;

    const nextResponseMinimumDate: Moment = moment(appStorage.lastQuizResponseDate).add(3, "hours");

    new Promise<void>(async (resolve): Promise<void> => {
      while (true) {
        const now: Moment = moment();

        if (now.isSame(nextResponseMinimumDate) || now.isAfter(nextResponseMinimumDate)) {
          this.quizCanBeAnswered = true;
          this.appStorageService.clearLastAnsweredDate();
          resolve();
          break;
        }

        const timeLeft: Duration = moment.duration(nextResponseMinimumDate.valueOf() - now.valueOf());

        this.remainingTime = `${timeLeft.hours()} hours, ${timeLeft.minutes()} minutes, ${timeLeft.seconds()} seconds`

        await new Promise(f => setTimeout(f, 1000));
      }
    });
  }
}
