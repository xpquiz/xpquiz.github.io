import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {AppStorage, WeekScore} from "../../model/AppStorage";
import * as moment from "moment";
import {Moment} from "moment/moment";

@Component({
  selector: 'app-correct-answer-window',
  templateUrl: './correct-answer-window.component.html',
  styleUrls: ['./correct-answer-window.component.sass']
})
export class CorrectAnswerWindowComponent implements OnInit {

  public questionScore: number = 0;

  private correctAnswerSound: HTMLAudioElement = new Audio('assets/sounds/tada.wav');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService
  ) {
    this.questionScore = parseInt(this.route.snapshot.paramMap.get('points') ?? '0');
  }

  public async ngOnInit(): Promise<void> {
    const quizCanBeAnswered: boolean = this.checkIfQuizCanBeAnswered();

    if (!quizCanBeAnswered) {
      await this.returnHome();
      return;
    }

    await this.correctAnswerSound.play();
    this.saveCurrentScore();
  }

  private checkIfQuizCanBeAnswered(): boolean {
    const appStorage: AppStorage = this.storageService.get();
    const lastQuizResponseDate: string | null = appStorage.lastQuizResponseDate;

    if (lastQuizResponseDate === null) return true;

    const now: Moment = moment();
    const nextResponseMinimumDate: Moment = moment(lastQuizResponseDate).add(3, "hours");

    return now.isSame(nextResponseMinimumDate) || now.isAfter(nextResponseMinimumDate);
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  private saveCurrentScore(): void {
    const appStorage: AppStorage = this.storageService.get();
    const currentWeek: number = moment().isoWeek();
    const newCurrentScoreMap: Map<number, WeekScore> = new Map<number, WeekScore>([[currentWeek, {
      score: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
    }]]);
    const currentWeekScoreMap: Map<number, WeekScore> = appStorage.weekScoreMap ?? newCurrentScoreMap;
    const currentWeekScore: WeekScore = currentWeekScoreMap.get(currentWeek)!;

    currentWeekScore.rightAnswers += 1;
    currentWeekScore.score += this.questionScore;
    currentWeekScoreMap.set(currentWeek, currentWeekScore!);

    this.storageService.save(
      {
        ...appStorage,
        weekScoreMap: currentWeekScoreMap,
        lastQuizResponseDate: moment().toISOString()
      }
    )
  }
}
