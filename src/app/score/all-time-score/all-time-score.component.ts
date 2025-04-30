import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AllTimeScoreInfo} from "@Shared/model/Score";
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {sortAscendingDate, sortDescendingDate, sumScores} from "@Shared/utils/functions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {Observable, Subscription} from "dexie";

@Component({
  selector: 'app-all-time-score',
  templateUrl: './all-time-score.component.html',
  styleUrls: ['./all-time-score.component.sass']
})
export class AllTimeScoreComponent implements OnInit, OnDestroy {

  public allTimeScoreInfo: AllTimeScoreInfo | undefined;
  public radioFormGroup: FormGroup = this.formBuilder.group({
    category: ['wins-losses']
  });
  public categoryRadioButtons: any[] = [
    {
      value: 'wins-losses',
      label: '🏆 Wins/Losses'
    },
    {
      value: 'points',
      label: '📊 Points'
    },
    {
      value: 'answers',
      label: '🤔 Answers'
    },
    {
      value: 'dates',
      label: '📅 Dates'
    }
  ];

  @Input()
  public gameHistory$: Observable<HistoryEntity[]> | undefined;
  private gameHistorySubscription: Subscription | undefined;
  protected readonly PathsEnum = PathsEnum;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.gameHistorySubscription = this.gameHistory$!.subscribe({
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
          totalPointsEarned: wonGames.map(h => h.totalPoints).reduce(sumScores, 0),
          totalPointsMissed: lostGames.map(h => h.totalPoints).reduce(sumScores, 0),
          correctAnswers: gamesCorrectAnswers.reduce(sumScores, 0),
          wrongAnswers: gamesWrongAnswers.reduce(sumScores, 0),
          firstGamePlayed: [...gameDates].sort(sortAscendingDate)[0],
          lastGamePlayed: [...gameDates].sort(sortDescendingDate)[0],
          firstVictory: [...wonGamesDates].sort(sortAscendingDate)[0],
          lastVictory: [...wonGamesDates].sort(sortDescendingDate)[0],
          firstDefeat: [...lostGamesDates].sort(sortAscendingDate)[0],
          lastDefeat: [...lostGamesDates].sort(sortDescendingDate)[0]
        };
      },
      error: error => {
        console.error(`Error while fetching score: `, error);
      }
    })
  }

  public ngOnDestroy(): void {
    this.gameHistorySubscription?.unsubscribe();
  }
}
