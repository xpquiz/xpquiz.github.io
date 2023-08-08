import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorage} from "../../model/AppStorage";
import * as moment from "moment";
import {Duration, Moment} from "moment";

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
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const appStorage: AppStorage = this.storageService.get();
    const lastQuizResponseDate: string | null = appStorage.lastQuizResponseDate;

    this.quizCanBeAnswered = this.checkIfQuizCanBeAnswered(lastQuizResponseDate);

    if (!this.quizCanBeAnswered)
      this.startCountdown(lastQuizResponseDate);
  }

  public async redirectTo(route: PathsEnum): Promise<void> {
    await this.router.navigateByUrl(route);
  }

  private checkIfQuizCanBeAnswered(lastQuizResponseDate: string | null): boolean {
    if (lastQuizResponseDate === null) return true;

    const now: Moment = moment();
    const nextResponseMinimumDate: Moment = moment(lastQuizResponseDate).add(3, "hours");

    return now.isSame(nextResponseMinimumDate) || now.isAfter(nextResponseMinimumDate);
  }

  private startCountdown(lastQuizResponseDate: string | null): void {
    if (lastQuizResponseDate === null) return;

    const nextResponseMinimumDate: Moment = moment(lastQuizResponseDate).add(3, "hours");

    new Promise<void>(async (resolve): Promise<void> => {
      while (true) {
        const now: Moment = moment();

        if (now.isSame(nextResponseMinimumDate) || now.isAfter(nextResponseMinimumDate)) {
          this.quizCanBeAnswered = true;
          this.clearLastAnsweredDate();
          resolve();
          break;
        }

        const timeLeft: Duration = moment.duration(nextResponseMinimumDate.valueOf() - now.valueOf());

        this.remainingTime = `${timeLeft.hours()} hours, ${timeLeft.minutes()} minutes, ${timeLeft.seconds()} seconds`

        await new Promise(f => setTimeout(f, 1000));
      }
    });
  }

  private clearLastAnsweredDate(): void {
    const appStorage: AppStorage = this.storageService.get();

    this.storageService.save(
      {
        ...appStorage,
        lastQuizResponseDate: null
      }
    );
  }
}
