import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "@Shared/model/enums/PathsEnum";
import {GameMode} from "@Shared/model/enums/GameModesEnum";

@Component({
  selector: 'app-game-mode-window',
  templateUrl: './game-mode-window.component.html',
  styleUrls: ['./game-mode-window.component.sass']
})
export class GameModeWindowComponent {

  protected readonly PathsEnum = PathsEnum;

  protected readonly gameModes: GameMode[] = [
    GameMode.NORMAL,
    GameMode.TRIFECTA,
    GameMode.TIME_RUSH,
  ];

  constructor(
    protected readonly router: Router
  ) {
  }

}
