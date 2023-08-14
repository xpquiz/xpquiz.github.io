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
    const currentWeek: number = moment().isoWeek();
    const appStorage: AppStorage = this.retrieveAppStorage();
    const currentWeekScoreMap: Map<number, WeekScore> = appStorage.weekScoreMap!;
    const currentWeekScore: WeekScore = currentWeekScoreMap.get(currentWeek)!;

    if (correctAnswer) {
      currentWeekScore.rightAnswers += 1;
      currentWeekScore.score += questionScore!;
    } else {
      currentWeekScore.wrongAnswers += 1;
    }

    currentWeekScoreMap.set(currentWeek, currentWeekScore!);

    this.storageService.save(
      {
        ...appStorage,
        weekScoreMap: currentWeekScoreMap,
        lastQuizResponseDate: moment().toISOString()
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

  public retrieveScoreByWeek(currentWeek: number): WeekScore {
    const appStorage: AppStorage = this.retrieveAppStorage();
    const currentWeekScoreMap: Map<number, WeekScore> = appStorage.weekScoreMap!;

    if (currentWeekScoreMap.has(currentWeek)) {
      return currentWeekScoreMap.get(currentWeek)!;
    } else {
      const newCurrentWeekScore: WeekScore = {
        score: 0,
        rightAnswers: 0,
        wrongAnswers: 0
      }

      appStorage.weekScoreMap!.set(currentWeek, newCurrentWeekScore);
      this.storageService.save(appStorage);

      return newCurrentWeekScore;
    }
  }

  public retrieveAppStorage(): AppStorage {
    let appStorage: AppStorage | null = this.storageService.get();

    if (appStorage === null)
      appStorage = this.createNewAppStorage();

    return appStorage;
  }

  private createNewAppStorage(): AppStorage {
    const currentWeek: number = moment().isoWeek();
    const appStorage = {
      lastQuizResponseDate: null,
      weekScoreMap: new Map<number, WeekScore>([[currentWeek, {
        score: 0,
        rightAnswers: 0,
        wrongAnswers: 0,
      }]])
    }

    this.storageService.save(appStorage);
    return appStorage;
  }

}
