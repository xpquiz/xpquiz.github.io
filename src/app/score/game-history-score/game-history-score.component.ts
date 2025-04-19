import {Component, Input} from '@angular/core';
import {HistoryEntity} from "@Shared/database/entity/history.entity";
import {Observable} from "dexie";

@Component({
  selector: 'app-game-history-score',
  templateUrl: './game-history-score.component.html',
  styleUrls: ['./game-history-score.component.sass']
})
export class GameHistoryScoreComponent {

  @Input()
  public gameHistory$: Observable<HistoryEntity[]> | undefined;
}
