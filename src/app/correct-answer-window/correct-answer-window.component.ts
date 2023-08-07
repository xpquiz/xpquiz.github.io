import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {AppStorage, WeekScore} from "../../model/AppStorage";
import * as moment from "moment";

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
    await this.correctAnswerSound.play();
    this.saveCurrentScore();
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
