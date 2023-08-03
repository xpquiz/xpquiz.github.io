import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {StorageKeyEnum} from "../../model/StorageKeyEnum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.sass']
})
export class MainWindowComponent implements OnInit {

  public quizCanBeAnswered: boolean = true;
  public countdown: string = '';

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const lastQuizResponseDate: string | null = this.storageService.get(StorageKeyEnum.LAST_QUIZ_RESPONSE_DATE);

    this.quizCanBeAnswered = this.checkIfQuizCanBeAnswered(lastQuizResponseDate);

    if (!this.quizCanBeAnswered)
      this.startCountdown(lastQuizResponseDate);
  }

  private checkIfQuizCanBeAnswered(lastQuizResponseDate: string | null): boolean {
    if (lastQuizResponseDate === null || lastQuizResponseDate === '') return true;

    const lastAnsweredDate: Date = new Date();
    const nextAnswerDate: Date = new Date();
    const threeHoursInMs: number = 1000 * 60 * 60 * 3;

    lastAnsweredDate.setTime(parseInt(lastQuizResponseDate));
    nextAnswerDate.setTime(parseInt(lastQuizResponseDate) + threeHoursInMs);

    return lastAnsweredDate.getTime() >= nextAnswerDate.getTime();
  }

  private startCountdown(lastQuizResponseDate: string | null): void {
    if (lastQuizResponseDate === null || lastQuizResponseDate === '') return;

    const nextAnswerDate: Date = new Date();
    const threeHoursInMs: number = 1000 * 60 * 60 * 3;

    nextAnswerDate.setTime(parseInt(lastQuizResponseDate) + threeHoursInMs);

    new Promise<void>(async (resolve, reject): Promise<void> => {
      while (true) {
        const now: Date = new Date();

        const sameHour: boolean = now.getUTCHours() === nextAnswerDate.getUTCHours();
        const sameMinute: boolean = now.getUTCMinutes() === nextAnswerDate.getUTCMinutes();
        const sameSecond: boolean = now.getUTCSeconds() === nextAnswerDate.getUTCSeconds();

        if (sameHour && sameMinute && sameSecond) {
          this.quizCanBeAnswered = true;
          this.storageService.save(StorageKeyEnum.LAST_QUIZ_RESPONSE_DATE, '');
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

  public async redirectToScores(): Promise<void> {
    await this.router.navigateByUrl('scores');
  }

  public async redirectToQuiz(): Promise<void> {
    await this.router.navigateByUrl('quiz');
  }
}
