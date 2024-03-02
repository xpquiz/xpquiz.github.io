import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {AppStorage, WeekScore} from "../model/AppStorage";
import moment, {Moment} from "moment/moment";

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor(
    private readonly storageService: StorageService
  ) {
  }

  public canQuizBeAnswered(): boolean {
    const appStorage: AppStorage = this.retrieveAppStorage();
    const lastQuizResponseDate: string | null = appStorage.lastQuizResponseDate;

    if (lastQuizResponseDate === null) {
      return true;
    } else {
      const now: Moment = moment();
      const nextResponseMinimumDate: Moment = moment(lastQuizResponseDate).add(3, "hours");

      return now.isSame(nextResponseMinimumDate) || now.isAfter(nextResponseMinimumDate);
    }
  }

  public saveAnswer(correctAnswer: boolean, questionScore?: number | null): void {
    const currentYear: number = moment().year();
    const currentWeek: number = moment().isoWeek();

    const appStorage: AppStorage = this.retrieveAppStorage();
    const yearScoreMap: Map<number, Map<number, WeekScore>> = appStorage.yearScoreMap;
    const weekScoreMap: Map<number, WeekScore> = yearScoreMap.get(currentYear)!;

    let currentWeekScore: WeekScore;

    if (weekScoreMap.has(currentWeek)) {
      currentWeekScore = weekScoreMap.get(currentWeek)!;
    } else {
      currentWeekScore = {
        score: 0,
        rightAnswers: 0,
        wrongAnswers: 0
      }
    }

    if (correctAnswer) {
      currentWeekScore.rightAnswers += 1;
      currentWeekScore.score += questionScore!;
    } else {
      currentWeekScore.wrongAnswers += 1;
    }

    weekScoreMap.set(currentWeek, currentWeekScore);
    yearScoreMap.set(currentYear, weekScoreMap);

    this.storageService.save(
      {
        ...appStorage,
        lastQuizResponseDate: moment().toISOString(),
        yearScoreMap: yearScoreMap
      }
    )
  }

  public clearLastAnsweredDate(): void {
    const appStorage: AppStorage = this.retrieveAppStorage();

    this.storageService.save(
      {
        ...appStorage,
        lastQuizResponseDate: null
      }
    );
  }

  public retrieveAppStorage(): AppStorage {
    let appStorage: AppStorage | null = this.storageService.get();

    if (appStorage === null)
      appStorage = this.createNewAppStorage();

    return appStorage;
  }

  private createNewAppStorage(): AppStorage {
    const currentYear: number = moment().year();
    const currentWeek: number = moment().isoWeek();

    const newWeekScoreMap: Map<number, WeekScore> = new Map<number, WeekScore>([[currentWeek, {
      score: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
    }]]);
    const newYearScoreMap: Map<number, Map<number, WeekScore>> = new Map<number, Map<number, WeekScore>>([[currentYear, newWeekScoreMap]]);

    const newAppStorage: AppStorage = {
      lastQuizResponseDate: null,
      yearScoreMap: newYearScoreMap
    };

    this.storageService.save(newAppStorage);
    return newAppStorage;
  }
}
