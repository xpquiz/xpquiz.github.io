import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {WeekScore} from "../../model/AppStorage";
import moment from "moment";
import {TemplateService} from "../../service/template.service";
import {TemplateEnum, WeekScoreTemplateParams} from "../../model/Template";
import {AppStorageService} from "../../service/app-storage.service";

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
  public previousScores: Map<number, WeekScore> | null = null;
  public clipboardText: string = '';
  public displayClipboardMessage: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly templateService: TemplateService,
    private readonly appStorageService: AppStorageService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.retrieveScore();
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

  private retrieveScore(): void {
    const currentWeek: number = moment().isoWeek();
    const currentWeekScore: WeekScore = this.appStorageService.retrieveScoreByWeek(currentWeek);
    const previousScoresMap: Map<number, WeekScore> = this.appStorageService.retrieveAppStorage().weekScoreMap!;

    previousScoresMap.delete(currentWeek);

    this.previousScores = previousScoresMap;
    this.currentScore = currentWeekScore.score;
    this.rightAnswers = currentWeekScore.rightAnswers;
    this.wrongAnswers = currentWeekScore.wrongAnswers;
    this.currentWeek = currentWeek;
  }
}
