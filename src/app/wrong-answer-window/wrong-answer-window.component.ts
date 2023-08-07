import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PathsEnum} from "../../model/PathsEnum";
import {StorageService} from "../../service/storage.service";
import {AppStorage, WeekScore} from "../../model/AppStorage";
import * as moment from "moment";

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
    await this.wrongAnswerSound.play();
    this.saveCurrentScore();
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
