import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {AppStorage, WeekScore} from "@Shared/model/AppStorage";
import moment from "moment";
import {TemplateService} from "@Shared/service/template.service";
import {TemplateEnum, WeekScoreTemplateParams} from "@Shared/model/Template";

@Component({
  selector: 'app-score-window',
  templateUrl: './score-window.component.html',
  styleUrls: ['./score-window.component.sass']
})
export class ScoreWindowComponent implements OnInit {
  public currentYear: number = 0;
  public currentWeek: number = 0;
  public yearScoreMap: Map<number, Map<number, WeekScore>> | null = null;
  public currentWeekScore: WeekScore | null = null;
  public previousScores: Map<number, WeekScore> | null = null;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;

  constructor(
    protected readonly router: Router,
    private readonly templateService: TemplateService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.retrieveScore();
    await this.assembleClipboardText();
  }

  public async showClipboardMessage(): Promise<void> {
    this.displayClipboardMessage = true;

    await new Promise(f => setTimeout(f, 5000));

    this.displayClipboardMessage = false;
  }

  private async assembleClipboardText(): Promise<void> {
    const templateParams: WeekScoreTemplateParams = {
      year: this.currentYear,
      week: this.currentWeek,
      rightAnswers: this.currentWeekScore!.rightAnswers,
      wrongAnswers: this.currentWeekScore!.wrongAnswers,
      totalScore: this.currentWeekScore!.score
    };

    this.clipboardText = await this.templateService.render(TemplateEnum.WEEK_SCORE, templateParams);
  }

  private retrieveScore(): void {
    // const currentYear: number = moment().year();
    // const currentWeek: number = moment().isoWeek();
    //
    // const appStorage: AppStorage = this.appStorageService.retrieveAppStorage();
    // const currentYearScore: Map<number, WeekScore> = this.appStorageService.retrieveScoreForYear(currentYear);
    // const currentWeekScore: WeekScore = this.appStorageService.retrieveScoreForYearAndWeek(currentYear, currentWeek);
    //
    // const previousScoresMap: Map<number, WeekScore> = structuredClone(currentYearScore);
    //
    // previousScoresMap.delete(currentWeek);
    //
    // this.yearScoreMap = appStorage.yearScoreMap;
    // this.currentWeekScore = currentWeekScore;
    // this.previousScores = previousScoresMap;
    // this.currentYear = currentYear;
    // this.currentWeek = currentWeek;
  }

  protected readonly PathsEnum = PathsEnum;
}
