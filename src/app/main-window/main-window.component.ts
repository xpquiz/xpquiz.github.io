import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {AppStorage} from "../../model/AppStorage";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.sass']
})
export class MainWindowComponent implements OnInit {

  public quizCanBeAnswered: boolean = true;
  public countdown: string = '';

  protected readonly PathsEnum = PathsEnum;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const appStorage: AppStorage = this.storageService.get();
    const lastQuizResponseDate: Date | null = appStorage.lastQuizResponseDate;

    this.quizCanBeAnswered = this.checkIfQuizCanBeAnswered(lastQuizResponseDate);

    if (!this.quizCanBeAnswered)
      this.startCountdown(lastQuizResponseDate);
  }

  public async redirectTo(route: PathsEnum): Promise<void> {
    await this.router.navigateByUrl(route);
  }

  private checkIfQuizCanBeAnswered(lastQuizResponseDate: Date | null): boolean {
    if (lastQuizResponseDate === null) return true;

    const now: Date = new Date();
    const lastAnsweredDate: Date = new Date();
    const threeHoursInMs: number = 1000 * 60 * 60 * 3;

    lastAnsweredDate.setTime(new Date(lastQuizResponseDate).getTime() + threeHoursInMs);

    return now.getTime() >= lastAnsweredDate.getTime();
  }

  private startCountdown(lastQuizResponseDate: Date | null): void {
    if (lastQuizResponseDate === null) return;

    const nextAnswerDate: Date = new Date();
    const threeHoursInMs: number = 1000 * 60 * 60 * 3;

    nextAnswerDate.setTime(new Date(lastQuizResponseDate).getTime() + threeHoursInMs);

    new Promise<void>(async (resolve, reject): Promise<void> => {
      while (true) {
        const now: Date = new Date();

        const sameHour: boolean = now.getUTCHours() === nextAnswerDate.getUTCHours();
        const sameMinute: boolean = now.getUTCMinutes() === nextAnswerDate.getUTCMinutes();
        const sameSecond: boolean = now.getUTCSeconds() === nextAnswerDate.getUTCSeconds();

        if (sameHour && sameMinute && sameSecond) {
          this.quizCanBeAnswered = true;
          this.clearLastAnsweredDate();
          resolve();
          break;
        }

        const newTime: Date = new Date();

        newTime.setTime(nextAnswerDate.getTime() - now.getTime());

        const hours: number = newTime.getUTCHours();
        const minutes: number = newTime.getUTCMinutes();
        const seconds: number = newTime.getUTCSeconds();

        this.countdown = `${hours} h, ${minutes} min, ${seconds} s`

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
