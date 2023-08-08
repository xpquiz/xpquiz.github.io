import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AppStorage, WeekScore} from "../../model/AppStorage";
import * as moment from "moment";
import {TemplateService} from "../../service/template.service";
import {TemplateEnum, WeekScoreTemplateParams} from "../../model/enums/Template";

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
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly templateService: TemplateService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    const currentWeek: number = moment().isoWeek();
    const appStorage: AppStorage = this.storageService.get();
    const currentWeekScoreMap: Map<number, WeekScore> | undefined = appStorage.weekScoreMap;

    this.currentWeek = currentWeek;

    if (currentWeekScoreMap === undefined) return;

    const currentWeekScore: WeekScore = currentWeekScoreMap.get(currentWeek)!;

    this.currentScore = currentWeekScore.score;
    this.rightAnswers = currentWeekScore.rightAnswers;
    this.wrongAnswers = currentWeekScore.wrongAnswers;

    await this.assembleClipboardText();
  }

  public async returnHome(): Promise<void> {
    await this.router.navigateByUrl(PathsEnum.HOME);
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private async assembleClipboardText(): Promise<void> {
    const templateParams: WeekScoreTemplateParams = {
      week: this.currentWeek,
      rightAnswers: this.rightAnswers,
      wrongAnswers: this.wrongAnswers,
      totalScore: this.currentScore
    };

    this.clipboardText = await this.templateService.render(TemplateEnum.WEEK_SCORE, templateParams);
  }
}
