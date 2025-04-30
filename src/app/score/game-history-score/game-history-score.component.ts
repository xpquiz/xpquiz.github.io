import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {Observable} from "dexie";
import {FormBuilder, FormGroup} from "@angular/forms";
import {format, isSameMonth, isSameWeek, isSameYear} from 'date-fns';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-history-score',
  templateUrl: './game-history-score.component.html',
  styleUrls: ['./game-history-score.component.sass']
})
export class GameHistoryScoreComponent implements OnInit, OnDestroy {

  @Input()
  public gameHistory$: Observable<HistoryEntity[]> | undefined;

  public radioFormGroup: FormGroup = this.formBuilder.group({
    category: ['']
  });
  public periodRadioButtons: any[] = [
    {
      value: 'week',
      label: 'This week'
    },
    {
      value: 'month',
      label: 'This month'
    },
    {
      value: 'year',
      label: 'This year'
    },
    {
      value: 'all-time',
      label: 'All-time'
    }
  ];
  public filteredList: HistoryEntity[] = [];
  private formSubscription: Subscription | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.formSubscription = this.radioFormGroup.valueChanges.subscribe(value => {
      this.filterListAccordingToPeriod(value.category);
    });
  }

  public ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  public filterListAccordingToPeriod(
    period: 'week' | 'month' | 'year' | 'all-time'
  ): void {
    const history: HistoryEntity[] = this.gameHistory$!.getValue!();
    const currentDate: Date = new Date();

    this.filteredList = this.getFilteredList(history, period, currentDate).reverse();
  }

  public getFilteredList(
    history: HistoryEntity[],
    period: 'week' | 'month' | 'year' | 'all-time',
    currentDate: Date
  ): HistoryEntity[] {
    switch (period) {
      case 'week':
        return history.filter(h => isSameWeek(h.date, currentDate));
      case 'month':
        return history.filter(h => isSameMonth(h.date, currentDate));
      case 'year':
        return history.filter(h => isSameYear(h.date, currentDate));
      case 'all-time':
        return history;
    }
  }

  public getDetailText(history: HistoryEntity, section: number): string {
    switch (section) {
      case 0:
        return `${history.won ? '🟩' : '🟥'} ${history.gameMode.toUpperCase()}`;
      case 1: {
        const camelCaseMode: string = history.gameMode[0].toUpperCase() + history.gameMode.slice(1, history.gameMode.length);
        const victoryDefeatText: string = history.won ? 'and won!' : 'but lost...';

        return `🎲 Played ${camelCaseMode}, ${victoryDefeatText}`;
      }
      case 2: {
        const firstSection: string = '🤔 Correct/Wrong answers';

        return `${firstSection}: ${history.correctAnswers}/${history.wrongAnswers}`;
      }
      case 3:
        return history.won ? `📈 Scored ${history.totalPoints} points!` : `📉 Missed ${history.totalPoints} points...`;
      case 4:
        return `📅 Played on ${format(history.date, 'dd/MM/yyyy - HH:mm')}`;
      default:
        return ''
    }
  }

}
