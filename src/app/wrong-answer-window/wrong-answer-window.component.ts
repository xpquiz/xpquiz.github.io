import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {AppStorage, WeekScore} from "../../model/AppStorage";
import * as moment from "moment";
import {Moment} from "moment";

@Component({
  selector: 'app-wrong-answer-window',
  templateUrl: './wrong-answer-window.component.html',
  styleUrls: ['./wrong-answer-window.component.sass']
})
export class WrongAnswerWindowComponent implements OnInit {

  public correctAnswer: string | null = '';
  private wrongAnswerSound: HTMLAudioElement = new Audio('assets/sounds/critical_stop.wav');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService
  ) {
    this.correctAnswer = this.route.snapshot.paramMap.get('answer');
  }

  public async ngOnInit(): Promise<void> {
    const quizCanBeAnswered: boolean = this.checkIfQuizCanBeAnswered();

    if (!quizCanBeAnswered) {
      await this.returnHome();
      return;
    }

    await this.wrongAnswerSound.play();
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

  private saveCurrentScore() {
    const appStorage: AppStorage = this.storageService.get();
    const currentWeek: number = moment().isoWeek();
    const newCurrentScoreMap: Map<number, WeekScore> = new Map<number, WeekScore>([[currentWeek, {
      score: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
    }]]);
    const currentWeekScoreMap: Map<number, WeekScore> = appStorage.weekScoreMap ?? newCurrentScoreMap;
    const currentWeekScore: WeekScore = currentWeekScoreMap.get(currentWeek)!;

    currentWeekScore!.wrongAnswers += 1;
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
