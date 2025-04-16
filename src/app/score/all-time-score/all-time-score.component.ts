import {Component, OnDestroy, OnInit} from '@angular/core';
import {HistoryRepository} from "@Shared/database/repository/history.repository";
import {liveQuery, Subscription} from "dexie";
import {AllTimeScoreInfo} from "@Shared/model/Score";
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {sortAscendingDate, sortDescendingDate, sumScores} from "@Shared/utils/Functions";

@Component({
  selector: 'app-all-time-score',
  templateUrl: './all-time-score.component.html',
  styleUrls: ['./all-time-score.component.sass']
})
export class AllTimeScoreComponent implements OnInit, OnDestroy {

  public allTimeScoreInfo: AllTimeScoreInfo | undefined;
  private allScoreSubscription: Subscription | undefined;

  constructor(
    private readonly historyRepository: HistoryRepository
  ) {
  }

  public ngOnInit(): void {
    this.allScoreSubscription = liveQuery(
      () => this.historyRepository.findAll()
    ).subscribe({
      next: (value: HistoryEntity[]) => {
        const wonGames: HistoryEntity[] = value.filter((h: HistoryEntity) => h.won);
        const lostGames: HistoryEntity[] = value.filter((h: HistoryEntity) => !h.won);
        const gameDates: Date[] = value.map((h: HistoryEntity) => h.date);
        const wonGamesDates: Date[] = wonGames.map((h: HistoryEntity) => h.date);
        const lostGamesDates: Date[] = lostGames.map((h: HistoryEntity) => h.date);
        const gamesCorrectAnswers: number[] = value.map((h: HistoryEntity) => h.correctAnswers);
        const gamesWrongAnswers: number[] = value.map((h: HistoryEntity) => h.wrongAnswers);

        this.allTimeScoreInfo = {
          totalGamesPlayed: value.length,
          totalWins: wonGames.length,
          totalLosses: lostGames.length,
          correctAnswers: gamesCorrectAnswers.reduce(sumScores, 0),
          wrongAnswers: gamesWrongAnswers.reduce(sumScores, 0),
          firstGamePlayed: gameDates.sort(sortAscendingDate)[0],
          lastGamePlayed: gameDates.sort(sortDescendingDate)[0],
          firstVictory: wonGamesDates.sort(sortAscendingDate)[0],
          lastVictory: wonGamesDates.sort(sortDescendingDate)[0],
          firstDefeat: lostGamesDates.sort(sortAscendingDate)[0],
          lastDefeat: lostGamesDates.sort(sortDescendingDate)[0]
        };
      },
      error: error => {
      }
    })
  }


  public ngOnDestroy(): void {
    this.allScoreSubscription?.unsubscribe();
  }
}
