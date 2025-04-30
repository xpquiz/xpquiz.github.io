import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {Observable} from "dexie";
import {FormBuilder, FormGroup} from "@angular/forms";
import {format} from "date-fns";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mode-score',
  templateUrl: './mode-score.component.html',
  styleUrls: ['./mode-score.component.sass']
})
export class ModeScoreComponent implements OnInit, OnDestroy {

  @Input()
  public gameHistory$: Observable<HistoryEntity[]> | undefined;

  public radioFormGroup: FormGroup = this.formBuilder.group({
    mode: ['']
  });

  public gameModeRadioButtons: any[] = [
    {
      value: 'normal',
      label: 'Normal'
    },
    {
      value: 'trifecta',
      label: 'Trifecta'
    },
    {
      value: 'time-rush',
      label: 'Time-Rush'
    },
  ];
  public filteredList: HistoryEntity[] = []
  private formSubscription: Subscription | undefined;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    this.formSubscription = this.radioFormGroup.valueChanges.subscribe(value => {
      const history: HistoryEntity[] = this.gameHistory$!.getValue!();

      this.filteredList = history.filter(h => h.gameMode === value.mode);
    });
  }

  public ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  private filterListAccordingToGameMode(mode: 'normal' | 'trifecta' | 'time-rush') {
    switch(mode) {
      case "normal":
        break;
      case "trifecta":
        break;
      case "time-rush":
        break;
      default:

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
