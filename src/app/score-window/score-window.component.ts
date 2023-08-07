import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {AppStorage, WeekScore} from "../../model/AppStorage";
import * as moment from "moment";

@Component({
  selector: 'app-score-window',
  templateUrl: './score-window.component.html',
  styleUrls: ['./score-window.component.sass']
})
export class ScoreWindowComponent implements OnInit {
  public currentScore: number = 0;
  public currentWeek: number = 0;
  public rightAnswers: number = 0;
  public wrongAnswers: number = 0;

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {
  }

  public ngOnInit(): void {
    const currentWeek: number = moment().isoWeek();
    const appStorage: AppStorage = this.storageService.get();
    const currentWeekScoreMap: Map<number, WeekScore> | undefined = appStorage.weekScoreMap;

    this.currentWeek = currentWeek;

    if(currentWeekScoreMap === undefined) return;

    const currentWeekScore: WeekScore = currentWeekScoreMap.get(currentWeek)!;

    this.currentScore = currentWeekScore.score;
    this.rightAnswers = currentWeekScore.rightAnswers;
    this.wrongAnswers = currentWeekScore.wrongAnswers;
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

}
